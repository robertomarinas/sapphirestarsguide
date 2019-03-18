// import weapon json file
import weaponJSON from '../mhw_dbWeaponList.json';

const weaponList = JSON.stringify(weaponJSON);

const getWeaponList = () => dispatch => {
 dispatch({
  type: 'GET_WEAPONLIST',
  payload: JSON.parse(weaponList)
 })
}

export default getWeaponList;
