import React, { Component } from 'react';
// import components
import SlotSearch from './component_slot_search';

class WeaponSearch extends Component {

	constructor(props) {
		super(props);

		this.state = {
			inputString: '',
			decoInputString: '',
			weaponSearchResults: []
		}
	}

	onSelectedWeapon = (e) => {
		this.setState({
			weaponSearchResults: []
		}, this.props.onSelectedWeapon(e));
	}

	onWeaponInputSearch = (e) => {
		// add RegEx input checker here..
		const inputString = e.target.value;
		const pattern = new RegExp(`^${e.target.value}`,'i');
		let weaponSearchResults = [];
		const weaponPieces = this.props.weaponList;

		// // Sort Weapon Pieces..
		weaponPieces.sort((a,b) => a.name < b.name ? 1 : -1);

		weaponPieces.forEach((weapon, index) => {
		  if(pattern.test(weapon.name) && e.target.value !== '') {
		    weaponSearchResults = [<li key={index}><button data-selected-weapon={weapon.name} data-selected-index={index} onClick={this.onSelectedWeapon}>{weapon.name}</button></li>, ...weaponSearchResults ];
		  }
		});

		this.setState({ inputString, weaponSearchResults });
	}

	onClearInput = (e) => {
		this.setState({ inputString: '', weaponSearchResults: [] });
	}

	onRemovePart = (e) => {
		this.setState({
			inputString: '',
			weaponSearchResults: []
		}, this.props.onRemoveEquipmentPart(e))
	}

	onSelectDeco = (e) => {
		this.setState({ decoInputString: '' }, this.props.onSelectedDeco(e));
	}

	render() {

		const { props } = this;

		let armorPartContent = '';
		let mapSlots = '';
		let decoSearchResults = '';
		let decoSearchResultsContainer = '';

		if(props.selectedArmorSet['weapon']['selected'] !== null) {
			const { partDecos } = props.selectedArmorSet['weapon'];
			const { type, slots } = props.selectedArmorSet['weapon']['selected'];

			const updateClass = `input-container selected ${type}`;

			if(slots.length > 0) {

				mapSlots = partDecos.map((slot, index) => {
					return <SlotSearch key={index} slotIndex={index} slotRank={slot.rank} active={slot.active} part="weapon" decorationList={props.decorationList} selected={partDecos[index]} activeDecoInputPart={props.activeDecoInputPart} onSelectDecoInput={props.onSelectDecoInput} onSelectedDeco={props.onSelectedDeco} onClearDecoResults={props.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} />
				});
			}
			
			armorPartContent = <div className={updateClass}>
			<label>{props.selectedArmorSet['weapon']['selected']['name']}</label>
			<button className="clear-button selected" data-equipment-type="weapon" onClick={this.onRemovePart} /></div>

			// check if there's an active slot
			if(props.activeDecoInputPart && props.activeDecoInputPart.equipmentPart === "weapon") {
				partDecos.forEach((slot, slotIndex) => {
					if(slotIndex === props.activeDecoInputPart.slotIndex) {
						decoSearchResults = props.activeDecoInputPart.decoResults.map((res,index) => {
							return (
								<li key={index}>
									<button data-deco-name={res.skillName} data-part='weapon' data-deco-index={index} data-deco-id={res.id} data-slot-rank={res.slot} data-slot-index={slotIndex} onClick={this.onSelectDeco} >
										{res.skillName}
									</button>
								</li>
							)
						});

						decoSearchResultsContainer = <ul className="slots-search-results">{decoSearchResults}</ul>;
					}

					// if(slot.active) {
					// 	decoSearchResults = decoResults.map((res,index) => {
					// 		return (
					// 			<li key={index}>
					// 				<button data-deco-name={res.skillName} data-part='weapon' data-deco-index={index} data-deco-id={res.id} data-slot-rank={res.slot} data-slot-index={slotIndex} onClick={props.onSelectedDeco} >
					// 					{res.skillName}
					// 				</button>
					// 			</li>
					// 		)
					// 	});

					// 	decoSearchResultsContainer = <ul className="slots-search-results">{decoSearchResults}</ul>;
					// }
				});
			}

		} else {

			armorPartContent = <div className="input-container">
					<input className="weapon-default" type="text" placeholder='Wyvern Ignition "Impact"' data-equipment-type="weapon" onClick={props.onSelectInput} onChange={this.onWeaponInputSearch} value={this.state.inputString} />
					<button className="clear-button" data-equipment-type="weapon" onClick={this.onClearInput} >clear</button>
				</div>;
		}

		const weaponSearchResults = props.activeInputPart === 'weapon' ? <ul className="armor-part-search-result">{this.state.weaponSearchResults}</ul> : '';

		return (
			<div className="armor-part-container">
				{armorPartContent}
				<div className="slots-container">
					{mapSlots}
					{decoSearchResultsContainer}
				</div>
				{weaponSearchResults}
			</div>
		)
	}

	
}

export default WeaponSearch;