import React from 'react';
// import components
import ArmorPartSearch from './component_armor_part_search';

const ArmorPart = (props) => {
	
	let armorPiece = "";

	switch (props.armorPiece) {

		case 'head': 

			let headPieces = [];

			props.armorList.forEach((armor, index) => {
				if(armor.armorType === 'head') {
					headPieces = [{ name: armor.name, slug: armor.slug, armorType: armor.armorType}, ...headPieces];
				}
			});

			armorPiece = <ArmorPartSearch armorPieces={headPieces} armorPart="head" clearedArmorPart={props.clearedArmorPart} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} onSelectedDeco={props.onSelectedDeco} activeInputPart={props.activeInputPart} onSelectInput={props.onSelectInput} activeDecoInputPart={props.activeDecoInputPart} onSelectDecoInput={props.onSelectDecoInput} onClearDecoResults={props.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} />
			
			break;
		
		case 'chest':
			let chestPieces = [];
			props.armorList.forEach((armor, index) => {
				if(armor.armorType === 'chest') {
					chestPieces = [{ name: armor.name, slug: armor.slug, armorType: armor.armorType}, ...chestPieces];
				}
			});

			armorPiece = <ArmorPartSearch armorPieces={chestPieces} armorPart="chest" clearedArmorPart={props.clearedArmorPart} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} onSelectedDeco={props.onSelectedDeco} activeInputPart={props.activeInputPart} onSelectInput={props.onSelectInput} activeDecoInputPart={props.activeDecoInputPart} onSelectDecoInput={props.onSelectDecoInput} onClearDecoResults={props.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} />

			break;
		
		case 'gloves':
			let glovesPieces = [];
			props.armorList.forEach((armor, index) => {
				if(armor.armorType === 'gloves') {
					glovesPieces = [{ name: armor.name, slug: armor.slug, armorType: armor.armorType}, ...glovesPieces];
				}
			});

			armorPiece = <ArmorPartSearch armorPieces={glovesPieces} armorPart="gloves" clearedArmorPart={props.clearedArmorPart} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} onSelectedDeco={props.onSelectedDeco} activeInputPart={props.activeInputPart} onSelectInput={props.onSelectInput} activeDecoInputPart={props.activeDecoInputPart} onSelectDecoInput={props.onSelectDecoInput} onClearDecoResults={props.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} />

			break;

		case 'waist':
			let waistPieces = [];
			props.armorList.forEach((armor, index) => {
				if(armor.armorType === 'waist') {
					waistPieces = [{ name: armor.name, slug: armor.slug, armorType: armor.armorType}, ...waistPieces];
				}
			});

			armorPiece = <ArmorPartSearch armorPieces={waistPieces} armorPart="waist" clearedArmorPart={props.clearedArmorPart} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} onSelectedDeco={props.onSelectedDeco} activeInputPart={props.activeInputPart} onSelectInput={props.onSelectInput} activeDecoInputPart={props.activeDecoInputPart} onSelectDecoInput={props.onSelectDecoInput} onClearDecoResults={props.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} />

			break;

		case 'legs':
			let legsPieces = [];
			props.armorList.forEach((armor, index) => {
				if(armor.armorType === 'legs') {
					legsPieces = [{ name: armor.name, slug: armor.slug, armorType: armor.armorType}, ...legsPieces];
				}
			});

			armorPiece = <ArmorPartSearch armorPieces={legsPieces} armorPart="legs" clearedArmorPart={props.clearedArmorPart} decorationList={props.decorationList} selectedArmorSet={props.selectedArmorSet} onSelectedArmor={props.onSelectedArmor} onSelectedDeco={props.onSelectedDeco} activeInputPart={props.activeInputPart} onSelectInput={props.onSelectInput} activeDecoInputPart={props.activeDecoInputPart} onSelectDecoInput={props.onSelectDecoInput} onClearDecoResults={props.onClearDecoResults} onRemoveDecoPiece={props.onRemoveDecoPiece} onRemoveEquipmentPart={props.onRemoveEquipmentPart} />

			break;

		default:
			break;

	}
	return armorPiece;
}

export default ArmorPart;