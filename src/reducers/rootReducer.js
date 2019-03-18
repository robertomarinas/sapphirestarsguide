import { combineReducers } from 'redux';
import weaponListReducer from './reducer_getWeaponList';
import armorListReducer from './reducer_getArmorList';
import charmListReducer from './reducer_getCharmList';
import decorationListReducer from './reducer_getDecorationList';
import skillsListReducer from './reducer_getSkillsList';

export default combineReducers({
 weaponListReducer,
 armorListReducer,
 charmListReducer,
 decorationListReducer,
 skillsListReducer
});