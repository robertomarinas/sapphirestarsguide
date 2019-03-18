import React from 'react';

const SharpnessStatus = (props) => {

	const { selectedWeapon } = props;
	let weaponSharpness = [];
	const sharpnessClassNames = selectedWeapon.sharpness ? 'sharpness-bar' : ''; 
	if(selectedWeapon) {
		if(selectedWeapon.sharpness) {
			weaponSharpness = Object.entries(selectedWeapon.sharpness).map((color, index) => {
				return <span key={index} style={{ backgroundColor: color[0], width: `${color[1]}%`, height: '15px'}}></span>
			});
		}
	}

	return (
		<li>
			<div>Sharpness:</div>
			<div className={sharpnessClassNames}>{weaponSharpness}</div>
		</li>
	)
}

export default SharpnessStatus;