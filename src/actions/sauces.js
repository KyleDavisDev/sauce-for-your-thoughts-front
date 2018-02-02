import api from "../api/api";

export const saucesGot = ({ sauces }) => ({
  type: "SAUCE_GOT",
  sauces
});

export const updatedSaucesItems = ({ store }) => ({
  type: "UPDATED_SAUCE_ITEM",
  store
});

export const saucesByTagGot = ({ sauces }) => ({
  type: "SAUCE_BY_TAG_GOT",
  sauces
});

export const sauceHearted = ({ sauce }) => ({
  type: "SAUCE_HEARTED",
  sauce
});

export const sauceUnHearted = ({ sauce }) => ({
  type: "SAUCE_UNHEARTED",
  sauce
});

export const getSauces = credentials => dispatch => {
  return api.sauces.get(credentials).then(res => {
    dispatch(saucesGot({ sauces: res.sauces }));
    return res;
  });
};

export const updateSaucesItem = store => dispatch => {
  dispatch(updatedSaucesItems({ store }));
  return;
};

export const getSaucesByTag = data => dispatch => {
  return api.sauces.getSaucesByTag(data).then(res => {
    dispatch(saucesByTagGot({ sauces: res.sauces }));
    return res;
  });
};

export const getSaucesBySearch = searchValue => dispatch => {
  return api.sauces.search(searchValue).then(res => {
    //dipatch event here in future (?)

    return res;
  });
};

export const getSaucesByMap = coordinates => dispatch => {
  return api.sauces.searchByMap(coordinates).then(res => {
    //dispatch event here in future (?)

    return res;
  });
};
