import React from 'react';

const ElementStatus = (props) => {

	const { selectedWeapon } = props;
	let elementalRating = [];
	if(selectedWeapon) {
		elementalRating = selectedWeapon.elements.map((elem, index) => {
			const ifHiddenClass = elem.hidden ? 'hidden' : '';
			return <span key={index} className={ifHiddenClass}>{elem.type} {elem.damage}</span>
		})
	}

	return (
		<li>
			<span>Element:</span>
			<span>{elementalRating}</span>
		</li>
	)
}

export default ElementStatus;