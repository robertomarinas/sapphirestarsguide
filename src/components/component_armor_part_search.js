import React from 'react';
// import components
import SlotSearch from './component_slot_search';

const ArmorPartSearch = (props) => {

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
		const { partDecos, decoResults } = props.selectedArmorSet[props.armorPart];
		const { type, slots } = props.selectedArmorSet[props.armorPart]['selected'];

		const updateClass = `input-container selected ${type}`;

		if(slots.length > 0) {

			mapSlots = partDecos.map((slot, index) => {
				return <SlotSearch key={index} slotIndex={index} slotRank={slot.rank} active={slot.active} part={props.armorPart} decorationList={props.decorationList} selected={partDecos[index]} decoResults={decoResults} onDecoInputSearch={props.onDecoInputSearch} onFocusSlotSearch={props.onFocusSlotSearch} onBlurSearch={props.onBlurSearch} onFocusContainer={props.onFocusContainer} onBlurContainer={props.onBlurContainer} onSelectedDeco={props.onSelectedDeco} onRemoveDecoPiece={props.onRemoveDecoPiece} />
			});
		}
		
		armorPartContent = <div className={updateClass}>
		<label>{props.selectedArmorSet[props.armorPart]['selected']['name']}</label>
		<button className="clear-button selected" data-armor-piece={props.armorPart} onClick={props.onRemoveArmorPiece} /></div>

		partDecos.forEach((slot, slotIndex) => {
			if(slot.active && decoResults.length > 0) {
				decoSearchResults = decoResults.map((res,index) => {
					return (
						<li key={index}>
							<button data-deco-name={res.skillName} data-part={props.armorPart} data-deco-index={index} data-deco-id={res.id} data-deco-level={res.level} data-slot-rank={res.slot} data-slot-index={slotIndex} onClick={props.onSelectedDeco} >
								{res.skillName}
							</button>
						</li>
					)
				});

				decoSearchResultsContainer = <ul className="slots-search-results">{decoSearchResults}</ul>;
			}
			
		});

	} else {

		armorPartContent = <div className="input-container">
				<input className={props.armorPart} type="text" data-armor-type={props.armorPart} onChange={props.onInputPartSearch} onFocus={props.onFocusPartSearch} placeholder={placeHolder} value={props.selectedArmorSet[props.armorPart]['searchString']} />
				<button className="clear-button" data-armor-piece={props.armorPart} onClick={props.onRemoveArmorPiece} >clear</button>
			</div>;
	}

	const armorSearchResults = props.selectedArmorSet[props.armorPart]['results'].length > 0 ? <ul className="armor-part-search-result">{props.selectedArmorSet[props.armorPart]['results']}</ul> : '';

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

	// let placeHolder = '';

	// switch (props.armorPart) {

	// 	case 'head':
	// 		placeHolder = 'Kulve Taroth\'s Fury Beta';
	// 		break;
	// 	case 'chest':
	// 		placeHolder = 'Kulve Taroth\'s Ire Beta';
	// 		break;
	// 	case 'gloves':
	// 		placeHolder = 'Kulve Taroth\'s Rage Beta';
	// 		break;
	// 	case 'waist':
	// 		placeHolder = 'Kulve Taroth\'s Malice Beta';
	// 		break;
	// 	case 'legs':
	// 		placeHolder = 'Kulve Taroth\'s Wrath Beta';
	// 		break;
	// 	default:
	// 		break;
	// }

	// const armorPartSearchResults = props.selectedArmorSet[props.armorPart]['results'].length > 0 ? <ul className="armor-part-search-result">{props.selectedArmorSet[props.armorPart]['results']}</ul> : '';

	// return (
	// 	<div className="armor-part-container">
	// 		<input type="text" data-armor-type={props.armorPart} onChange={props.onInputPartSearch} onFocus={props.onFocusPartSearch} placeholder={placeHolder} value={props.selectedArmorSet[props.armorPart]['searchString']} />
			
	// 		{armorPartSearchResults}
			
	// 	</div>
	// )
}

export default ArmorPartSearch;