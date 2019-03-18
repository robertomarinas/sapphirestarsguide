import React from 'react';
//importing components
// import DecoSlotOne from './component_decoSlotOne_svg';
// import DecoSlotTwo from './component_decoSlotTwo_svg';
// import DecoSlotThree from './component_decoSlotThree_svg';

const SlotSearch = (props) => {

	const { slotRank } = props;
	let decoType = '';

	switch (slotRank) {
		case 1:
			decoType = 'slot-one';
			break;
		case 2:
			decoType = 'slot-two';
			break;
		case 3:
			decoType = 'slot-three';
			break;
		default:
			break;
	}

	if(props.selected.skillName) {
		return <div className="slot-container selected"><span className={decoType}>{props.selected.skillName}</span><button className="clear-button selected" data-slot-rank={slotRank} data-part={props.part} data-slot-index={props.slotIndex} onClick={props.onRemoveDecoPiece}></button></div>
	}
	
	return (
		<div className="slot-container">
			<input className={decoType} data-slot-rank={slotRank} data-part={props.part} data-slot-index={props.slotIndex} onFocus={props.onFocusSlotSearch} onChange={props.onDecoInputSearch} value={props.selected.searchString} />
			<button className="clear-button" data-slot-rank={slotRank} data-part={props.part} data-slot-index={props.slotIndex} onClick={props.onRemoveDecoPiece}>clear</button>
		</div>
	)
	
}

export default SlotSearch;