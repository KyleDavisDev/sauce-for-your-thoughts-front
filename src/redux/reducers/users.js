export default function user(state = {}, action) {
  switch (action.type) {
    /** @description add users.byId{} and users.allIds[] to users store */
    case "USERS_ADDED":
      // make sure action contains users .byId and .allIds else return
      if (
        Object.keys(action.users.byId).length === 0 ||
        action.users.allIds.length === 0
      )
        return {};

      // construct return object
      return {
        ...state,
        byId:
          "byId" in state && Object.keys(state.byId).length > 0
            ? Object.assign({}, state.byId, action.users.byId)
            : Object.assign({}, action.users.byId),
        allIds:
          "allIds" in state && state.allIds.length > 0
            ? state.allIds.concat(action.users.allIds)
            : [].concat(action.users.allIds)
      };

    /** @description assigns token value to users.self.token */
    case "USER_LOGGED_IN":
      return Object.assign({}, state, { self: { token: action.token } });

    /** @description clears .self of users */
    case "USER_LOGGED_OUT":
      return Object.assign({}, state, { self: {} });

    case "GOT_HEARTS":
      return {
        ...state,
        self: {
          ...state.self,
          hearts:
            "hearts" in state.self && state.self.hearts.length > 0
              ? [
                  ...state.self.hearts,
                  ...action.hearts.filter(
                    x => state.self.hearts.indexOf(x) === -1
                  )
                ]
              : [].concat(action.hearts)
        }
      };

    /** @description add/remove action.sauce._id from self.hearts[] */
    case "TOGGLED_HEART":
      return {
        ...state,
        self: {
          ...state.self,
          hearts:
            "hearts" in state.self &&
            state.self.hearts.length > 0 &&
            state.self.hearts.includes(action.sauce._id) // sanity checks
              ? state.self.hearts.filter(x => x !== action.sauce._id) // remove from array
              : [...state.self.hearts, action.sauce._id] // add
        }
      };
    default:
      return state;
  }
}
