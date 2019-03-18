export default (state = {}, action) => {
 switch (action.type) {
  case 'GET_WEAPONLIST':
   return {
    result: action.payload
   }
  default:
   return state
 }
}