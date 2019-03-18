export default (state = {}, action) => {
 switch (action.type) {
  case 'GET_SKILLSLIST':
   return {
    result: action.payload
   }
  default:
   return state
 }
}