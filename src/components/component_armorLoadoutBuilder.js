import React, { Component } from 'react';
// import components
import WeaponSearch from './component_weapon_search';
import ArmorPart from './component_armor_part';
import CharmSearch from './component_charm_search';

class ArmorLoadoutBuilder extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeInputPart: '',
			activeDecoInputPart: null
		}
	}
	
	onSelectInput = (e) => {
		const equipmentPart = e.target.getAttribute('data-equipment-type');
		this.setState({ activeInputPart: equipmentPart, activeDecoInputPart: null });
	}

	onSelectDecoInput = (slotIndex, slotRank, equipmentPart, decoResults) => {
		this.setState({
			activeDecoInputPart: {
				slotIndex,
				slotRank,
				equipmentPart,
				decoResults
			}
		})
	}

	onSelectedDeco = (e) => {
		const decoResults = this.state.activeDecoInputPart.decoResults;

		this.setState({
			activeDecoInputPart: null
		}, this.props.onSelectedDeco(e, decoResults));
	}

	onClearDecoResults = (slotIndex, slotRank, equipmentPart) => {
		if(this.state.activeDecoInputPart) {
			const selectedSlotIndex = this.state.activeDecoInputPart.slotIndex;
			const selectedSlotRank = this.state.activeDecoInputPart.slotRank;
			const selectedSlotPart = this.state.activeDecoInputPart.equipmentPart;

			if(slotIndex === selectedSlotIndex && slotRank === selectedSlotRank && equipmentPart === selectedSlotPart) {
				this.setState({ activeDecoInputPart: null });
			}
		}
	}

	render() {
		const { props } = this;

		return (
			<div className="main hunter-ui-card">
				<h2>Equipment</h2>

				<div className="equipment-list">
					<ul>
						<li>
							<span className="selected-armor"><WeaponSearch weaponList={props.weaponList} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedWeapon={props.onSelectedWeapon} activeInputPart={this.state.activeInputPart} onSelectInput={this.onSelectInput} activeDecoInputPart={this.state.activeDecoInputPart} onSelectDecoInput={this.onSelectDecoInput} onSelectedDeco={this.onSelectedDeco} onClearDecoResults={this.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} /></span>
						</li>
						<li>
							<span className="selected-armor"><ArmorPart armorPiece="head" armorList={props.armorList} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} activeInputPart={this.state.activeInputPart} onSelectInput={this.onSelectInput} activeDecoInputPart={this.state.activeDecoInputPart} onSelectDecoInput={this.onSelectDecoInput} onSelectedDeco={this.onSelectedDeco} onClearDecoResults={this.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} /></span>
						</li>
						<li>
							<span className="selected-armor"><ArmorPart armorPiece="chest" armorList={props.armorList} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} activeInputPart={this.state.activeInputPart} onSelectInput={this.onSelectInput} activeDecoInputPart={this.state.activeDecoInputPart} onSelectDecoInput={this.onSelectDecoInput} onSelectedDeco={this.onSelectedDeco} onClearDecoResults={this.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} /></span>
						</li>
						<li>
							<span className="selected-armor"><ArmorPart armorPiece="gloves" armorList={props.armorList} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} activeInputPart={this.state.activeInputPart} onSelectInput={this.onSelectInput} activeDecoInputPart={this.state.activeDecoInputPart} onSelectDecoInput={this.onSelectDecoInput} onSelectedDeco={this.onSelectedDeco} onClearDecoResults={this.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} /></span>
						</li>
						<li>
							<span className="selected-armor"><ArmorPart armorPiece="waist" armorList={props.armorList} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} activeInputPart={this.state.activeInputPart} onSelectInput={this.onSelectInput} activeDecoInputPart={this.state.activeDecoInputPart} onSelectDecoInput={this.onSelectDecoInput} onSelectedDeco={this.onSelectedDeco} onClearDecoResults={this.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} /></span>
						</li>
						<li>
							<span className="selected-armor"><ArmorPart armorPiece="legs" armorList={props.armorList} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} activeInputPart={this.state.activeInputPart} onSelectInput={this.onSelectInput} activeDecoInputPart={this.state.activeDecoInputPart} onSelectDecoInput={this.onSelectDecoInput} onSelectedDeco={this.onSelectedDeco} onClearDecoResults={this.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} /></span>
						</li>
						<li>
							<span className="selected-armor"><CharmSearch selectedArmorSet={props.selectedArmorSet} onSelectedCharm={props.onSelectedCharm} charmList={props.charmList} onCharmInputSearch={props.onCharmInputSearch} activeInputPart={this.state.activeInputPart} onSelectInput={this.onSelectInput} onRemoveEquipmentPart={props.onRemoveEquipmentPart} /></span>
						</li>
					</ul>
				</div>
			</div>		
		)
	}
}

export default ArmorLoadoutBuilder;
