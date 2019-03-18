export default (state = {}, action) => {
 switch (action.type) {
  case 'GET_DECORATIONLIST':
   return {
    result: action.payload
   }
  default:
   return state
 }
}