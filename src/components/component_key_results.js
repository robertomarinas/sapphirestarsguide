import React from 'react';

const KeyResults = (props) => {

	if(props.keyResult.length === 0) {
		return null;
	}

	let gearList;
	if(props.radioSelect === 'armor') {
		gearList = props.keyResult.map((gear, index) => <li key={index}><button className={gear.armorType} data-selected-index={gear.index} data-equipment-type={gear.armorType} data-selected-armor={gear.armor} data-search-bar="main-search" onClick={props.onSelectedArmor}>{gear.armor}</button></li>);
	} else if(props.radioSelect === 'skill') {
		gearList = props.keyResult.map((gear, index) => {
			return (
				<li key={index}>
					<button className={gear.armorType} data-selected-index={gear.index} data-equipment-type={gear.armorType} data-selected-armor={gear.armor} data-search-bar="main-search" onClick={props.onSelectedArmor}>
						{gear.armor} - { gear.skills.map((skill, index) => `${skill.skillName}: ${skill.level}` )}
					</button>
				</li>
			)
		});
	}

	const keyResultsClasses = props.keyResultShow ? 'key-results show' : 'key-results hide';

	return (
		<div className="key-results-container">
			<button className="key-results-container-toggle" onClick={props.onResultsToggle}>Toggle Results</button>
			<ul className={keyResultsClasses}>{ gearList }</ul>
		</div>
	)

}

export default KeyResults;