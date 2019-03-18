import React from 'react';

const CharmSearch = (props) => {

	let armorPartContent = '';
	let charmSearchResults = '';

	if(props.selectedArmorSet['charm']['selected'] !== null) {
		// return <p>{props.selectedArmorSet['charm']['selected']['name']}</p>
		armorPartContent = <div className="input-container selected charm">
		<label>{props.selectedArmorSet['charm']['selected']['name']}</label>
		<button className="clear-button selected" data-armor-piece="charm" onClick={props.onRemoveArmorPiece} /></div>
	} else {
		charmSearchResults = props.selectedArmorSet['charm']['results'].length > 0 ? <ul className="armor-part-search-result">{props.selectedArmorSet['charm']['results']}</ul> : '';

		armorPartContent = <div className="input-container">
			<input className="charm" type="text" placeholder="Attack Charm 3" onChange={props.onCharmInputSearch} onFocus={props.onFocusPartSearch} value={props.selectedArmorSet['charm']['searchString']} />
			<button className="clear-button" data-armor-piece="charm" onClick={props.onRemoveArmorPiece} >clear</button>
		</div>;
	}

	return (
		<div className="armor-part-container">
			{armorPartContent}
			{charmSearchResults}
		</div>
	)

	// return (
	// 	<div className="armor-part-container">
	// 		<input type="text" placeholder="Attack Charm 3" onChange={props.onCharmInputSearch} onFocus={props.onFocusPartSearch} />
			
	// 		{charmSearchResults}
	// 	</div>
	// )
}

export default CharmSearch;