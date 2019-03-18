import React from 'react';

const AttackStatus = (props) => {

	const { selectedWeapon, attackModifiers } = props;

	// let attack = {
	// 	modified: { value: 0, check: false},
	// 	display: null,
	// 	modifier: null,
	// 	raw: null,
	// 	sharpness: null,
	// 	element: null,
	// 	affinity: 0
	// };

	const weaponModifier = {
		hammer: 5.2,
		greatSword: 4.8,
		huntingHorn: 4.2,
		chargeBlade: 3.6,
		switchAxe: 3.5,
		longSword: 3.3,
		insectGlaive: 3.1,
		lance: 2.3,
		gunLance: 2.3,
		heavyBowgun: 1.5,
		swordAndShield: 1.4,
		dualBlades: 1.4,
		lightBowgun: 1.3,
		bow: 1.2,
	}

	let selectedWeaponDisplay = 0;
	let modifiedAttack = false;
	let rawDamage = 0;
	let selectedWeaponModifier = 0;
	let skillModifier = 0;

	if(selectedWeapon) {
		const weaponType = selectedWeapon.type;
		const { display } = selectedWeapon.attack;
		
// weaponAttackDisplay={attack.display} weaponDamageType={attributes.damageType} overallAttackModifier={hunterStatusModifiers.attack}

		switch (weaponType) {
			case 'great-sword':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.greatSword;
				selectedWeaponModifier = weaponModifier.greatSword;
				break;
			case 'long-sword':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.longSword;
				selectedWeaponModifier = weaponModifier.longSword;
				break;
			case 'sword-and-shield':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.swordAndShield;
				selectedWeaponModifier = weaponModifier.swordAndShield;
				break;
			case 'dual-blades':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.dualBlades;
				selectedWeaponModifier = weaponModifier.dualBlades;
				break;
			case 'insect-glaive':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.insectGlaive;
				selectedWeaponModifier = weaponModifier.insectGlaive;
				break;
			case 'switch-axe':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.switchAxe;
				selectedWeaponModifier = weaponModifier.switchAxe;
				break;
			case 'charge-blade':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.chargeBlade;
				selectedWeaponModifier = weaponModifier.chargeBlade;
				break;
			case 'hammer':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.hammer;
				selectedWeaponModifier = weaponModifier.hammer;
				break;
			case 'hunting-horn':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.huntingHorn;
				selectedWeaponModifier = weaponModifier.huntingHorn;
				break;
			case 'lance':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.lance;
				selectedWeaponModifier = weaponModifier.lance;
				break;
			case 'gunlance':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.gunLance;
				selectedWeaponModifier = weaponModifier.gunLance;
				break;
			case 'light-bowgun':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.lightBowgun;
				selectedWeaponModifier = weaponModifier.lightBowgun;
				break;
			case 'heavy-bowgun':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.heavyBowgun;
				selectedWeaponModifier = weaponModifier.heavyBowgun;
				break;
			case 'bow':
				selectedWeaponDisplay = display;
				rawDamage = display / weaponModifier.bow;
				selectedWeaponModifier = weaponModifier.bow;
				break;
			default:
				break;
		}
	}

	
	const attackModifiersArray = Object.entries(attackModifiers);

	if(attackModifiersArray.length > 0) {
		Object.entries(attackModifiers).forEach(modifier => {
			switch (modifier[0]) {
				case 'Attack Boost':
					skillModifier = modifier[1];
					break;
				default:
					break;
			}
		});
	}

	// calculated overall attack including bonus from skills (modifiers)

	if(skillModifier > 0) {
		modifiedAttack = (rawDamage + skillModifier) * selectedWeaponModifier;	
	}

	// Attack Calculation

	// let rawDamage = '';
	// let attackStatusList = '';
	//  Get Weapon Info
	// if(weapon.selected) {
	// 	Object.entries(selectedWeapon).forEach((at, index) => {
	// 		// assign new value to attack.display
	// 		attack[at[0]] = at[1];
	// 	});
	// 	// Get elemental values
	// 	attack['element'] = weapon.selected.elements.map((elem, elemIndex) => {
	// 		// if elem.hidden !== hidden ? !elem.hidden
	// 		const ifHiddenClass = elem.hidden ? 'hidden' : 'awakened';
	// 		return <span key={elemIndex}>{elem.type}: <span className={ifHiddenClass}>{elem.damage}</span></span>
	// 	});

	

	// 	// skills that modifies attack 
	// 	// attack-boost
	// 	// agitator
	// 	// heroics
	// 	// fortify
	// 	// peak-performance
	// 	// resentment
	// 	// artillery - for gunners, gunlance, charge blade, sticky ammo

	// 	// apply skill attack modifiers
	// 	const skillAttackModifiers = [ { skillName: 'Attack Boost', ranks: [3,6,9,12,15,18,21] }, { skillName: 'Agitator', ranks: [4,8,12,16,20] }, { skillName: 'Peak Performance', ranks: [5,10,20] }, { skillName: 'Heroics', ranks: [5,10,15], percent: true}, { skillName: 'Fortify', ranks: [10], percent: true }];

	// 	skillAttackModifiers.forEach(skill => {
	// 		const modifierPattern = new RegExp(`(${skill.skillName})`, 'i');
	// 		console.log(skill.skillName);
	// 		if(modifierPattern.test(activeSkillsText)) {
	// 			if(skill.skillName === 'Attack Boost') {
	// 				if(activeArmorSkills[skill.skillName].value >= 4) {
	// 					let rank = 0;
	// 					if(activeArmorSkills[skill.skillName].value > skill.ranks.length) {
	// 						rank = skill.ranks[skill.ranks.length - 1];
	// 					} else {
	// 						rank = skill.ranks[activeArmorSkills[skill.skillName].value - 1]
	// 					}
	// 					skillModifiers['attack'][skill.skillName] = rank;
	// 					skillModifiers['affinity'][skill.skillName] = 5;
	// 					attack['modified']['check'] = true;
	// 				} else {
	// 					skillModifiers['attack'][skill.skillName] = skill.ranks[activeArmorSkills[skill.skillName].value - 1];
	// 					attack['modified']['check'] = true;
	// 				}
	// 			}
	// 		}
	// 	});

	// 	if(weapon.selected.sharpness) {
	// 		attack['sharpness'] = Object.entries(weapon.selected.sharpness).map((color, index) => {
	// 			return <span key={index} style={{ backgroundColor: color[0], width: `${color[1]}%`, height: '15px'}}></span>
	// 		});
	// 	}
	// }

	// // assign updated raw attack value
	// attack['raw'] = rawDamage;

	// attackStatusList = Object.entries(attack).map((at, index) => {
		
	// 	if(at[0]) {
	// 		const subClass = at[0] === 'sharpness' && at[1] !== null ? 'sharpness-bar' : '';
	// 		if(at[0] === 'modified') {
	// 			if(at[1]['check']) {

	// 				let addAttackModifiers = 0;
	// 				Object.entries(skillModifiers['attack']).forEach(modifier => {
	// 					if(modifier[0] === 'Attack Boost') {
	// 						console.log(modifier);
	// 						addAttackModifiers += modifier[1];
	// 					}
	// 				});

	// 				const modifiedAttack = Math.round((attack['raw'] + addAttackModifiers) * attack['modifier']);
	// 				return <li key={index}><div>{at[0]}:</div><div className={subClass}>{modifiedAttack}</div></li>	
	// 			}
				
	// 		} else {
	// 			return <li key={index}><div>{at[0]}:</div><div className={subClass}>{at[1]}</div></li>	
	// 		}
			
			
			
	// 	}
		
	// });

	return (
		<li className="attack-info">
			<div><span>display:</span> <span>{Math.round(selectedWeaponDisplay)} {modifiedAttack ? `( ${Math.round(modifiedAttack)} )` : ''}</span></div>	
			<div><span>raw:</span> <span>{Math.round(rawDamage)}</span></div>	
			<div><span>modifier:</span> <span>{selectedWeaponModifier}</span></div>	
		</li>
	)

}

export default AttackStatus;