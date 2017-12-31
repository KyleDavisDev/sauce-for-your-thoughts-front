import api from "../api/api";
import { flashSuccess } from "./flash";
import { updateStoresItem } from "./stores";

//Not sure what I want to do with this yet...
export const storeAdded = () => ({
  type: "STORE_ADDED"
});

export const storeFound = ({ store }) => ({
  type: "STORE_FOUND",
  store
});

export const storeUpdated = () => ({
  type: "STORE_UPDATED"
});

export const addStore = data => dispatch => {
  return api.store.add(data).then(res => {
    // dispatch(storeAdded())
    dispatch(flashSuccess({ text: res.msg }));
    return res;
  });
};

export const getStore = data => dispatch => {
  return api.store.get(data).then(res => {
    dispatch(storeFound({ store: res.store }));
    return res;
  });
};

export const updateStore = data => dispatch => {
  return api.store.update(data).then(res => {
    //remove store from redux
    dispatch(storeUpdated());
    //update store in redux stores array
    dispatch(updateStoresItem(res.store));
    return res;
  });
};
