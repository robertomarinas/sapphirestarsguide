import React, { Component } from 'react';

//importing Components
import SkillsList from './component_skills_list';
import StatusList from './component_status_list';

class HunterStatus extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeSkills: {}
		};
	}

	componentDidUpdate(prevProps, prevState) {
	}

	render() {

		// Skills
		// id property is 'modifier id'
		// skill property is 'skill id'

		console.log('hunter status component rerendered...');

		let activeArmorSkills = {};
		let activeSkillsText = '';
		const { skillsList, selectedArmorSet, onSkillModifier } = this.props;
		
		selectedArmorSet.activeParts.forEach(piece => {
			const { partDecos } = selectedArmorSet[piece];

			if(selectedArmorSet[piece].selected.skills) {
				selectedArmorSet[piece].selected.skills.forEach(armorSkill => {
			
					const pattern = new RegExp(`(${armorSkill.skillName})`, 'gi');
					const id = armorSkill.skill;
					let value = armorSkill.level;

					if(pattern.test(activeSkillsText)) {
						activeArmorSkills[armorSkill.skillName]['value'] = activeArmorSkills[armorSkill.skillName]['value'] + value;
					} else {

						let ranks = [];
						let description = '';
						
						// get Skill ranks..
						ranks = skillsList[id - 1]['ranks'];
						description = skillsList[id - 1]['description'];

						activeArmorSkills = { [armorSkill.skillName]: { id, value, ranks, description, skillName: armorSkill.skillName }, ...activeArmorSkills };
						activeSkillsText += `${armorSkill.skillName} `;
					}
				});
			}

			if(partDecos && partDecos.length > 0) {
				
				partDecos.forEach(deco => {
					if(!deco.skillName) return;

					const pattern = new RegExp(`(${deco.skillName})`, 'gi');
					let value = deco.level;

					if(pattern.test(activeSkillsText)) {					
						activeArmorSkills[deco.skillName]['value'] = activeArmorSkills[deco.skillName]['value'] + value;
					} else {
						let ranks = [];
						let description = '';
						skillsList.forEach(skill => {
							if(skill.name === deco.skillName) {
								ranks = skill.ranks;
								description = skill.description;
							}
						});
						
						activeArmorSkills = { [deco.skillName]: { value, ranks, description, skillName: deco.skillName }, ...activeArmorSkills };
						activeSkillsText += `${deco.skillName} `;
					}

				});
			}
		});

		// Sort active armor skills Obj and convert it to an array..
		const activeArmorSkillsArray = Object.entries(activeArmorSkills).sort((a,b) => a[0] > b[0] ? 1 : -1);
		
		const displayActiveSkills = activeArmorSkillsArray.map((skill, index) => {
			const currentValueClass = skill[1].value > skill[1].ranks.length ? 'exceeded' : '';
			return <li key={index}><div>{skill[0]}<ul>{skill[1].ranks.map((rank, ranksIndex) => (ranksIndex + 1) <= skill[1].value ? <li key={ranksIndex} className="active"></li> : <li key={ranksIndex}></li> )}</ul></div><span className={currentValueClass}>{skill[1].value}</span></li>
		});

		return (
			<div className="hunter-status">
				<SkillsList activeArmorSkills={activeArmorSkills} displayActiveSkills={displayActiveSkills} selectedArmorSet={this.props.selectedArmorSet} />
            	<StatusList activeArmorSkills={activeArmorSkills} displayActiveSkills={displayActiveSkills} selectedArmorSet={this.props.selectedArmorSet} selectedWeapon={this.props.selectedArmorSet.weapon.selected} activeSkillsText={activeSkillsText} onSkillModifier={onSkillModifier} />
			</div>
		)
	}
}

export default HunterStatus;