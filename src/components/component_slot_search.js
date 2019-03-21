import React, { Component } from 'react';
//importing components
// import DecoSlotOne from './component_decoSlotOne_svg';
// import DecoSlotTwo from './component_decoSlotTwo_svg';
// import DecoSlotThree from './component_decoSlotThree_svg';

class SlotSearch extends Component {

	constructor(props) {
		super(props);

		this.state = {
			inputString: ''
		}
	}

	onClearDeco = (e) => {
		const slotIndex = parseInt(e.target.getAttribute('data-slot-index'));
		const slotRank = parseInt(e.target.getAttribute('data-slot-rank'));
		const equipmentPart = e.target.getAttribute('data-part');

		this.setState({ inputString: '' }, this.props.onClearDecoResults(slotIndex,slotRank,equipmentPart));
	}

	onFocusSlotSearch = (e) => {
		const slotIndex = parseInt(e.target.getAttribute('data-slot-index'));
		const slotRank = parseInt(e.target.getAttribute('data-slot-rank'));
		const equipmentPart = e.target.getAttribute('data-part');

		// const { partDecos } = this.props.selectedArmorSet[equipmentPart];
		const decoPieces =  this.props.decorationList;

		let decoResults = [];

		// const updatePartDecos = partDecos.map((slot,index) => {
		//   if(slotIndex === index) {
		//     return { ...slot, active: true }
		//   } else {
		//     return { ...slot, active: false }
		//   }
		// });

		decoPieces.forEach(deco => {
		  if(deco.slot <= slotRank ) {
		    deco.skills.forEach(skill => {
		      decoResults = [ { id: skill.id, skillName: skill.skillName, level: skill.level, slotRank, slot: deco.slot }, ...decoResults ]
		    });
		  }
		});

		// Sort Deco Results..
		decoResults.sort((a,b) => a.skillName > b.skillName ? 1 : -1);

		// Call select deco input props function
		this.props.onSelectDecoInput(slotIndex,slotRank,equipmentPart,decoResults);
	}

	onDecoInput = (e) => {

		// write a RegEx here..
		const inputString = e.target.value;
		const slotIndex = parseInt(e.target.getAttribute('data-slot-index'));
		const slotRank = parseInt(e.target.getAttribute('data-slot-rank'));
		const equipmentPart = e.target.getAttribute('data-part');

		// const { partDecos } = this.props.selectedArmorSet[equipmentPart];
		const decoPieces =  this.props.decorationList;

		let decoResults = [];
		
		let pattern = new RegExp(`^(${e.target.value})`,'i');

		decoPieces.forEach(deco => {
		  deco.skills.forEach(skill => {
		    if(pattern.test(skill.skillName)) {
		      if(deco.slot <= slotRank) {
		        decoResults = [ { id: skill.id, skillName: skill.skillName, slotRank,  slot: deco.slot, level: skill.level }, ...decoResults ];
		      }
		    }
		  });
		});

		// Sort Deco Results..
		decoResults.sort((a,b) => a.skillName > b.skillName ? 1 : -1);

		this.setState({ inputString }, this.props.onSelectDecoInput(slotIndex,slotRank,equipmentPart,decoResults));
	}

	render() {
		const { props } = this;
		const { slotRank } = this.props;
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
				<input className={decoType} type="text" data-slot-rank={slotRank} data-part={props.part} data-slot-index={props.slotIndex} onFocus={this.onFocusSlotSearch} onChange={this.onDecoInput} value={this.state.inputString} />
				<button className="clear-button" data-slot-rank={slotRank} data-part={props.part} data-slot-index={props.slotIndex} onClick={this.onClearDeco}>clear</button>
			</div>
		)
	}
}

export default SlotSearch;