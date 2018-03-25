export default function user(state = {}, action) {
  switch (action.type) {
    case "USERS_ADDED":
      //make sure action contains users .byId and .allIds else return
      if (
        Object.keys(action.users.byId).length === 0 ||
        action.users.allIds.length === 0
      )
        return {};

      //construct return object
      return {
        byId:
          "byId" in state && Object.keys(state.byId).length > 0
            ? Object.assign({}, state.byId, action.users.byId)
            : Object.assign({}, action.users.byId),
        allIds:
          "allIds" in state && state.allIds.length > 0
            ? state.allIds.concat(action.users.allIds)
            : [].concat(action.users.allIds)
      };
    default:
      return state;
  }
}
