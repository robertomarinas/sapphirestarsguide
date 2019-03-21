import React, { Component } from 'react';
// import components
import SlotSearch from './component_slot_search';

class ArmorPartSearch extends Component {

	constructor(props) {
		super(props);

		this.state = {
			inputString: '',
			decoInputString: '',
			armorSearchResults: [],
		}
	}

	onSelectedArmorPart = (e) => {
		this.setState({
			armorSearchResults: []
		}, this.props.onSelectedArmor(e));
	}

	onInputPartSearch = (e) => {
		const inputString = e.target.value;
		const armorType = e.target.getAttribute('data-equipment-type');
	    const armorPieces = this.props.selectedArmorSet[armorType]['pieces'];

	    let armorSearchResults = [];
	    let pattern = new RegExp(`^${e.target.value}`,'i');

	    // // Sort Armor Pieces..
	    armorPieces.sort((a,b) => a.name < b.name ? 1 : -1);

	    armorPieces.forEach((armor, index) => {
	      if(pattern.test(armor.name) && e.target.value !== '') {
	        
	        armorSearchResults = [<li key={index}><button data-equipment-type={armor.type} data-selected-armor={armor.name} data-selected-index={index} onClick={this.onSelectedArmorPart}>{armor.name}</button></li>, ...armorSearchResults ];
	      }
	    });
	    this.setState({ inputString, armorSearchResults });
	}

	onClearInput = (e) => {
		this.setState({ inputString: '', armorSearchResults: [] });
	}

	onRemovePart = (e) => {
		this.setState({
			inputString: '',
			armorSearchResults: []
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
		let placeHolder = '';

		switch (props.armorPart) {

			case 'head':
				placeHolder = 'Kulve Taroth\'s Fury Beta';
				break;
			case 'chest':
				placeHolder = 'Kulve Taroth\'s Ire Beta';
				break;
			case 'gloves':
				placeHolder = 'Kulve Taroth\'s Rage Beta';
				break;
			case 'waist':
				placeHolder = 'Kulve Taroth\'s Malice Beta';
				break;
			case 'legs':
				placeHolder = 'Kulve Taroth\'s Wrath Beta';
				break;
			default:
				break;
		}

		if(props.selectedArmorSet[props.armorPart]['selected'] !== null) {
			const { partDecos } = props.selectedArmorSet[props.armorPart];
			const { type, slots } = props.selectedArmorSet[props.armorPart]['selected'];

			const updateClass = `input-container selected ${type}`;

			if(slots.length > 0) {

				mapSlots = partDecos.map((slot, index) => {
					return <SlotSearch key={index} slotIndex={index} slotRank={slot.rank} active={slot.active} selectedArmorSet={props.selectedArmorSet} part={props.armorPart} decorationList={props.decorationList} selected={partDecos[index]} activeDecoInputPart={props.activeDecoInputPart} onSelectDecoInput={props.onSelectDecoInput} onSelectedDeco={props.onSelectedDeco} onClearDecoResults={props.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} />
				});
			}
			
			armorPartContent = <div className={updateClass}>
			<label>{props.selectedArmorSet[props.armorPart]['selected']['name']}</label>
			<button className="clear-button selected" data-equipment-type={props.armorPart} onClick={this.onRemovePart} /></div>

			// check if there's an active slot
			if(props.activeDecoInputPart && props.activeDecoInputPart.equipmentPart === props.armorPart) {
				partDecos.forEach((slot, slotIndex) => {
					if(slotIndex === props.activeDecoInputPart.slotIndex) {
						decoSearchResults = props.activeDecoInputPart.decoResults.map((res,index) => {
							return (
								<li key={index}>
									<button data-deco-name={res.skillName} data-part={props.armorPart} data-deco-index={index} data-deco-id={res.id} data-deco-level={res.level} data-slot-rank={res.slot} data-slot-index={slotIndex} onClick={this.onSelectDeco} >
										{res.skillName}
									</button>
								</li>
							)
						});

						decoSearchResultsContainer = <ul className="slots-search-results">{decoSearchResults}</ul>;
					}

					// if(slot.active && decoResults.length > 0) {
					// 	decoSearchResults = decoResults.map((res,index) => {
					// 		return (
					// 			<li key={index}>
					// 				<button data-deco-name={res.skillName} data-part={props.armorPart} data-deco-index={index} data-deco-id={res.id} data-deco-level={res.level} data-slot-rank={res.slot} data-slot-index={slotIndex} onClick={props.onSelectedDeco} >
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
					<input className={props.armorPart} type="text" data-equipment-type={props.armorPart} onClick={props.onSelectInput} onChange={this.onInputPartSearch} placeholder={placeHolder} value={this.state.inputString} />
					<button className="clear-button" data-equipment-type={props.armorPart} onClick={this.onClearInput} >clear</button>
				</div>;
		}

		const armorSearchResults = props.activeInputPart === props.armorPart ? <ul className="armor-part-search-result">{this.state.armorSearchResults}</ul> : '';

		return (
			<div className="armor-part-container">
				{armorPartContent}
				<div className="slots-container">
					{mapSlots}
					{decoSearchResultsContainer}
				</div>
				{armorSearchResults}
			</div>
		)
	}	
}

export default ArmorPartSearch;