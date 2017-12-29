import api from "../api/api";
import { flashSuccess } from "./flash";

//Not sure what I want to do with this yet...
export const storeAdded = () => ({
  type: "STORE_ADDED"
});

export const storeFound = (store) => ({
  type: "STORE_FOUND",
  store
})

export const addStore = data => dispatch => {
  return api.store.add(data).then(res => {
    // dispatch(storeAdded())
    dispatch(flashSuccess({ text: res.msg }));
    return res;
  });
};

export const getStore = data => dispatch => {
  return api.store.getStore(data).then(res => {
    dispatchEvent(foundStore(res.store));
    return res;
  })
}
