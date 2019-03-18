import React from 'react';
// import components
import WeaponSearch from './component_weapon_search';
import ArmorPart from './component_armor_part';
import CharmSearch from './component_charm_search';

const ArmorLoadoutBuilder = (props) => {

	return (
		<div className="main hunter-ui-card">
			<h2>Equipment</h2>

			<div className="equipment-list">
				<ul>
					<li>
						<span className="selected-armor"><WeaponSearch weaponList={props.weaponList} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} onSelectedDeco={props.onSelectedDeco} onWeaponInputSearch={props.onWeaponInputSearch} onDecoInputSearch={props.onDecoInputSearch} onFocusPartSearch={props.onFocusPartSearch} onFocusSlotSearch={props.onFocusSlotSearch} onBlurSearch={props.onBlurSearch} onBlurContainer={props.onBlurContainer} onFocusContainer={props.onFocusContainer} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveArmorPiece={props.onRemoveArmorPiece} /></span>
					</li>
					<li>
						<span className="selected-armor"><ArmorPart armorPiece="head" armorList={props.armorList} selectedArmorSet={props.selectedArmorSet}  onSelectedArmor={props.onSelectedArmor} onFocusPartSearch={props.onFocusPartSearch} onInputPartSearch={props.onInputPartSearch} onSelectedDeco={props.onSelectedDeco} onFocusSlotSearch={props.onFocusSlotSearch} onBlurSearch={props.onBlurSearch} onBlurContainer={props.onBlurContainer} onFocusContainer={props.onFocusContainer} onDecoInputSearch={props.onDecoInputSearch} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveArmorPiece={props.onRemoveArmorPiece} /></span>
					</li>
					<li>
						<span className="selected-armor"><ArmorPart armorPiece="chest" armorList={props.armorList} selectedArmorSet={props.selectedArmorSet}  onSelectedArmor={props.onSelectedArmor} onFocusPartSearch={props.onFocusPartSearch} onInputPartSearch={props.onInputPartSearch} onSelectedDeco={props.onSelectedDeco} onFocusSlotSearch={props.onFocusSlotSearch} onBlurSearch={props.onBlurSearch} onBlurContainer={props.onBlurContainer} onFocusContainer={props.onFocusContainer} onDecoInputSearch={props.onDecoInputSearch} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveArmorPiece={props.onRemoveArmorPiece} /></span>
					</li>
					<li>
						<span className="selected-armor"><ArmorPart armorPiece="gloves" armorList={props.armorList} selectedArmorSet={props.selectedArmorSet}  onSelectedArmor={props.onSelectedArmor} onFocusPartSearch={props.onFocusPartSearch} onInputPartSearch={props.onInputPartSearch} onSelectedDeco={props.onSelectedDeco} onFocusSlotSearch={props.onFocusSlotSearch} onBlurSearch={props.onBlurSearch} onBlurContainer={props.onBlurContainer} onFocusContainer={props.onFocusContainer} onDecoInputSearch={props.onDecoInputSearch} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveArmorPiece={props.onRemoveArmorPiece} /></span>
					</li>
					<li>
						<span className="selected-armor"><ArmorPart armorPiece="waist" armorList={props.armorList} selectedArmorSet={props.selectedArmorSet}  onSelectedArmor={props.onSelectedArmor} onFocusPartSearch={props.onFocusPartSearch} onInputPartSearch={props.onInputPartSearch} onSelectedDeco={props.onSelectedDeco} onFocusSlotSearch={props.onFocusSlotSearch} onBlurSearch={props.onBlurSearch} onBlurContainer={props.onBlurContainer} onFocusContainer={props.onFocusContainer} onDecoInputSearch={props.onDecoInputSearch} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveArmorPiece={props.onRemoveArmorPiece} /></span>
					</li>
					<li>
						<span className="selected-armor"><ArmorPart armorPiece="legs" armorList={props.armorList} selectedArmorSet={props.selectedArmorSet}  onSelectedArmor={props.onSelectedArmor} onFocusPartSearch={props.onFocusPartSearch} onInputPartSearch={props.onInputPartSearch} onSelectedDeco={props.onSelectedDeco} onFocusSlotSearch={props.onFocusSlotSearch} onBlurSearch={props.onBlurSearch} onBlurContainer={props.onBlurContainer} onFocusContainer={props.onFocusContainer} onDecoInputSearch={props.onDecoInputSearch} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveArmorPiece={props.onRemoveArmorPiece} /></span>
					</li>
					<li>
						<span className="selected-armor"><CharmSearch selectedArmorSet={props.selectedArmorSet} onCharmInputSearch={props.onCharmInputSearch} onFocusPartSearch={props.onFocusPartSearch} onRemoveArmorPiece={props.onRemoveArmorPiece} /></span>
					</li>
				</ul>
			</div>
		</div>		
	)
}

export default ArmorLoadoutBuilder;
