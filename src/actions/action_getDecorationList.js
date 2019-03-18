// import decoration json file
import decorationJSON from '../mhw_dbDecorationList.json';

const decorationList = JSON.stringify(decorationJSON);

const getDecorationList = () => dispatch => {
 dispatch({
  type: 'GET_DECORATIONLIST',
  payload: JSON.parse(decorationList)
 })
}

export default getDecorationList;