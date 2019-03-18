// import weapon json file
import skillsJSON from '../mhw_dbSkillList.json';

const skillsList = JSON.stringify(skillsJSON);

const getSkillsList = () => dispatch => {
 dispatch({
  type: 'GET_SKILLSLIST',
  payload: JSON.parse(skillsList)
 })
}

export default getSkillsList;
