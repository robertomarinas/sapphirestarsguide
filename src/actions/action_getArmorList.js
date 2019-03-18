// import armor json file
import armorJSON from '../mhw_dbArmorList.json';

const armorList = JSON.stringify(armorJSON);

const getArmorList = () => dispatch => {
 dispatch({
  type: 'GET_ARMORLIST',
  payload: JSON.parse(armorList)
 })
}

export default getArmorList;