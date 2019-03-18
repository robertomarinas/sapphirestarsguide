import React from 'react';
// import components
import SlotSearch from './component_slot_search';

const WeaponSearch = (props) => {

	let armorPartContent = '';
	let mapSlots = '';
	let decoSearchResults = '';
	let decoSearchResultsContainer = '';

	if(props.selectedArmorSet['weapon']['selected'] !== null) {
		const { partDecos, decoResults } = props.selectedArmorSet['weapon'];
		const { type, slots } = props.selectedArmorSet['weapon']['selected'];

		const updateClass = `input-container selected ${type}`;

		if(slots.length > 0) {

			mapSlots = partDecos.map((slot, index) => {
				return <SlotSearch key={index} slotIndex={index} slotRank={slot.rank} active={slot.active} part="weapon" decorationList={props.decorationList} selected={partDecos[index]} decoResults={decoResults} onDecoInputSearch={props.onDecoInputSearch} onFocusSlotSearch={props.onFocusSlotSearch} onSelectedDeco={props.onSelectedDeco} onRemoveDecoPiece={props.onRemoveDecoPiece} />
			});
		}
		
		armorPartContent = <div className={updateClass}>
		<label>{props.selectedArmorSet['weapon']['selected']['name']}</label>
		<button className="clear-button selected" data-armor-piece="weapon" onClick={props.onRemoveArmorPiece} /></div>

		partDecos.forEach((slot, slotIndex) => {
			if(slot.active) {
				decoSearchResults = decoResults.map((res,index) => {
					return (
						<li key={index}>
							<button data-deco-name={res.skillName} data-part='weapon' data-deco-index={index} data-deco-id={res.id} data-slot-rank={res.slot} data-slot-index={slotIndex} onClick={props.onSelectedDeco} >
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
				<input className="weapon-default" type="text" placeholder='Wyvern Ignition "Impact"' onFocus={props.onFocusPartSearch} onChange={props.onWeaponInputSearch} value={props.selectedArmorSet.weapon.searchString} />
				<button className="clear-button" data-armor-piece="weapon" onClick={props.onRemoveArmorPiece} >clear</button>
			</div>;
	}

	const weaponSearchResults = props.selectedArmorSet['weapon']['results'].length > 0 ? <ul className="armor-part-search-result">{props.selectedArmorSet['weapon']['results']}</ul> : '';

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

export default WeaponSearch;