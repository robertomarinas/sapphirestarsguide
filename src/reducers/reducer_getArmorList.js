export default (state = {}, action) => {
 switch (action.type) {
  case 'GET_ARMORLIST':
   return {
    result: action.payload
   }
  default:
   return state
 }
}