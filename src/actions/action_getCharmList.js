// import charm json file
import charmJSON from '../mhw_dbCharmList.json';

const charmList = JSON.stringify(charmJSON);

const getCharmList = () => dispatch => {
 dispatch({
  type: 'GET_CHARMLIST',
  payload: JSON.parse(charmList)
 })
}

export default getCharmList;