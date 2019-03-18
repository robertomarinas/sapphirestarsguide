import React from 'react';

const SkillsList = (props) => {

	if(props.displayActiveSkills.length === 0) {
		return null;
	}
	
	return (
		<div className="skills-list hunter-ui-card results">
			<h2>Skills</h2>
			<ul>
				{props.displayActiveSkills}				
			</ul>
		</div>
	)
}

export default SkillsList;