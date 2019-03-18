import React from 'react';

const AffinityStatus = (props) => {

	const { affinityModifiers } = props;

	// attack-boost
	// critical-eye
	// maximum-might
	let totalAffinity = 0;

	Object.entries(affinityModifiers).forEach(modifier => {
		totalAffinity += modifier[1]
	});

	return (
		<li>
			<span>Affinity:</span><span>{totalAffinity}%</span>
		</li>
	)

}

export default AffinityStatus;