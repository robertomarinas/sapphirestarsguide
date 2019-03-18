export default (state = {}, action) => {
 switch (action.type) {
  case 'GET_CHARMLIST':
   return {
    result: action.payload
   }
  default:
   return state
 }
}