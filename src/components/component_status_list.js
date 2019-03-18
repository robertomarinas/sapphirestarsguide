import React from 'react';
// importing components
import AttackStatus from './component_attack_status';
import ElementStatus from './component_element_status';
import SharpnessStatus from './component_sharpness_status';
import AffinityStatus from './component_affinity_status';

const StatusList = (props) => {

	const selectedWeapon = props.selectedWeapon ? props.selectedWeapon : '';
	
	const { activeArmorSkills, activeSkillsText, selectedArmorSet } = props;
	// const { selected: equippedWeapon } = props.selectedArmorSet.weapon;
	// const activeArmorSkillsToArray = Object.entries(activeArmorSkills);

	let activeDefenseObj = { defense: 1 };
	let activeResistancesObj = {
		fire: 0,
		water: 0,
		ice: 0,
		thunder: 0,
		dragon: 0,
	};
	let hunterStatusModifiers = {
		attack: {},
		sharpness: {},
		affinity: {},
		element: {},
		defense: {},
		resistance: {}
	}

	selectedArmorSet.activeParts.forEach(piece => {
		// add armor part defense to total defense status
		const baseDefense = selectedArmorSet[piece].selected.defense ? selectedArmorSet[piece].selected.defense.base : 0;
		activeDefenseObj['defense'] += baseDefense;
		
		const resistances = selectedArmorSet[piece].selected.resistances ? Object.entries(selectedArmorSet[piece].selected.resistances) : Object.entries({ fire: 0, water: 0, ice: 0, thunder: 0, dragon: 0 });

		resistances.forEach(resistance => {
			// Check if positive or negative integer
			if(Math.sign(resistance[1])) {
				activeResistancesObj[resistance[0]] = activeResistancesObj[resistance[0]] + resistance[1]; 
			} else {
				activeResistancesObj[resistance[0]] = activeResistancesObj[resistance[0]] - resistance[1];
			}
		});
	});

	// apply skill attack modifiers
	const skillModifiers = [ { skillName: 'Attack Boost', ranks: [3,6,9,12,15,18,21] }, { skillName: 'Agitator', ranks: [4,8,12,16,20] }, { skillName: 'Peak Performance', ranks: [5,10,20] }, { skillName: 'Heroics', ranks: [5,10,15], percent: true}, { skillName: 'Fortify', ranks: [10], percent: true }, { skillName: 'Critical Eye', ranks: [3,6,10,15,20,25,30] }, { skillName: 'Maximum Might', ranks: [10,20,30] }, { skillName: 'Free Elem/Ammo Up', ranks: [33,66,100] } ];

	skillModifiers.forEach(skill => {
		const modifierPattern = new RegExp(`(${skill.skillName})`, 'i');
		
		if(modifierPattern.test(activeSkillsText)) {
			if(skill.skillName === 'Attack Boost') {
				if(activeArmorSkills[skill.skillName].value >= 4) {
					let rank = 0;
					if(activeArmorSkills[skill.skillName].value > skill.ranks.length) {
						rank = skill.ranks[skill.ranks.length - 1];
					} else {
						rank = skill.ranks[activeArmorSkills[skill.skillName].value - 1]
					}
					hunterStatusModifiers['attack'][skill.skillName] = rank;
					hunterStatusModifiers['affinity'][skill.skillName] = 5;
					// attack['modified']['check'] = true;
				} else {
					hunterStatusModifiers['attack'][skill.skillName] = skill.ranks[activeArmorSkills[skill.skillName].value - 1];
					// attack['modified']['check'] = true;
				}
			} else if(skill.skillName === 'Critical Eye') {
				let rank = 0;
				if(activeArmorSkills[skill.skillName].value > skill.ranks.length) {
					rank = skill.ranks[skill.ranks.length - 1];
				} else {
					rank = skill.ranks[activeArmorSkills[skill.skillName].value - 1]
				}
				hunterStatusModifiers['affinity'][skill.skillName] = rank;
			} else if (skill.skillName === 'Maximum Might') {
				let rank = 0;
				if(activeArmorSkills[skill.skillName].value > skill.ranks.length) {
					rank = skill.ranks[skill.ranks.length - 1];
				} else {
					rank = skill.ranks[activeArmorSkills[skill.skillName].value - 1]
				}
				hunterStatusModifiers['affinity'][skill.skillName] = rank;
			}
		}
	});

	// Update Defense && Resistances with modifiers
	Object.entries(activeResistancesObj).forEach(resistance => {
		const pattern = new RegExp(`(${resistance[0]} resistance)`, 'i');
		
		Object.entries(activeArmorSkills).forEach(skill => {
			if(pattern.test(skill[0])) {
				let index = skill[1].value - 1;
				
				if(skill[1].value <= skill[1].ranks.length) {
					Object.entries(skill[1].ranks[index].modifiers).forEach(modifier => {
						if(modifier[0] === 'defense') {
							activeDefenseObj['defense'] += modifier[1];
						} else {
							activeResistancesObj[resistance[0]] = activeResistancesObj[resistance[0]] + modifier[1];	
						}
						
					});	
				} else {
					
					index = skill[1].ranks.length - 1;
					Object.entries(skill[1].ranks[index].modifiers).forEach(modifier => {
					
						if(modifier[0] === 'defense') {
							activeDefenseObj['defense'] += modifier[1];
						} else {
							activeResistancesObj[resistance[0]] = activeResistancesObj[resistance[0]] + modifier[1];	
						}
					});
				}
			}
		});
	});

	const displayDefenseStatus = Object.entries(activeDefenseObj).map((defense, index) => {
		return <li key={index}><span>{defense[0]}</span><span>{defense[1]}</span></li>
	});

	const displayResistanceStatus = Object.entries(activeResistancesObj).map((resistance, index) => {
		return <li key={index}><span>{resistance[0]}</span><span>{resistance[1]}</span></li>
	});

	// {attackStatusList}

	return (
		<div className="status-list hunter-ui-card results">
			<h2>Attack Status</h2>
			<ul className="attack-status-list">
				<AttackStatus selectedWeapon={selectedWeapon} attackModifiers={hunterStatusModifiers.attack} />
				<ElementStatus selectedWeapon={selectedWeapon} />
				<SharpnessStatus selectedWeapon={selectedWeapon} />
				<AffinityStatus affinityModifiers={hunterStatusModifiers.affinity} />
			</ul>
			<h2>Defense Status</h2>
			<ul className="defense-status-list">
				{displayDefenseStatus}
				{displayResistanceStatus}
			</ul>
		</div>
	)
}

export default StatusList;