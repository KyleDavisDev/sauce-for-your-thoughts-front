import api from "../api/api";

export const storesGot = ({ stores }) => ({
  type: "STORES_GOT",
  stores
});

export const updatedStoresItems = ({ store }) => ({
  type: "UPDATED_STORES_ITEM",
  store
});

export const getStores = selection => dispatch => {
  return api.stores.get(selection).then(res => {
    dispatch(storesGot({ stores: res.stores }));
    return res;
  });
};

export const updateStoresItem = store => dispatch => {
  dispatch(updatedStoresItems({ store }));
  return;
};
