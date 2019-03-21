import React, { Component } from 'react';

class CharmSearch extends Component {

	constructor(props) {
		super(props);

		this.state = {
			inputString: '',
			charmSearchResults: []
		}
	}

	onSelectedCharm = (e) => {
		this.setState({
			charmSearchResults: []
		}, this.props.onSelectedCharm(e));
	}

	onCharmInputSearch = (e) => {
		// add RegEx input checker here..
		const inputString = e.target.value;
		const pattern = new RegExp(`^${e.target.value}`,'i');
		let charmSearchResults = [];
		const charmPieces = this.props.charmList;

		// // Sort Charm Pieces..
		charmPieces.sort((a,b) => a.name < b.name ? 1 : -1);

		charmPieces.forEach((charm, parentIndex) => {
		  if(pattern.test(charm.name) && e.target.value !== '') {
		    const charmRanks = charm.ranks.map((rank, index) => {
		      return <li key={index}><button data-selected-rank={rank.name} data-parent-index={parentIndex} data-index={index} onClick={this.onSelectedCharm}>{rank.name}</button></li>
		    });

		    charmSearchResults = [charmRanks, ...charmSearchResults]
		  }
		});

		this.setState({ inputString, charmSearchResults });
	}

	onClearInput = (e) => {
		this.setState({ inputString: '', charmSearchResults: [] });
	}

	onRemovePart = (e) => {
		this.setState({
			inputString: '',
			charmSearchResults: []
		}, this.props.onRemoveEquipmentPart(e))
	}

	render() {
		const { props } = this;

		let armorPartContent = '';
		let charmSearchResults = '';

		if(props.selectedArmorSet['charm']['selected'] !== null) {
			armorPartContent = <div className="input-container selected charm">
			<label>{props.selectedArmorSet['charm']['selected']['name']}</label>
			<button className="clear-button selected" data-equipment-type="charm" onClick={this.onRemovePart} /></div>
		} else {
			charmSearchResults = props.activeInputPart === 'charm' ? <ul className="armor-part-search-result">{this.state.charmSearchResults}</ul> : '';

			armorPartContent = <div className="input-container">
				<input className="charm" type="text" placeholder="Attack Charm 3" data-equipment-type="charm" onClick={props.onSelectInput} onChange={this.onCharmInputSearch} value={this.state.inputString} />
				<button className="clear-button" data-armor-piece="charm" onClick={this.onClearInput} >clear</button>
			</div>;
		}

		return (
			<div className="armor-part-container">
				{armorPartContent}
				{charmSearchResults}
			</div>
		)
	}
}

export default CharmSearch;