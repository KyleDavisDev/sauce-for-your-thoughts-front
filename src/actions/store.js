import api from "../api/api";
import { flashSuccess } from "./flash";

//Not sure what I want to do with this yet...
export const storeAdded = () => ({
  type: "STORE_ADDED"
});

export const addStore = data => dispatch => {
  return api.store.add(data).then(res => {
    console.log(res);
    // dispatch(storeAdded())
    dispatch(flashSuccess({ text: res.msg, slug: res.slug }));
    return res;
  });
};
