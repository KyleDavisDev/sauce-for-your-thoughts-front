import api from "../api/api";

export const storesGot = ({ stores }) => ({
  type: "STORES_GOT",
  stores
});

export const getStores = selection => dispatch => {
  return api.stores.get(selection).then(res => {
    dispatch(storesGot({ stores: res.stores }));
    return res;
  });
};
