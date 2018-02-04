import api from "../../api/api";

export const saucesFound = ({ sauces }) => ({
  type: "SAUCES_FOUND",
  sauces
});

export const updatedSaucesItems = ({ sauce }) => ({
  type: "UPDATED_SAUCES_ITEM",
  sauce
});

export const saucesByTagFound = ({ sauces }) => ({
  type: "SAUCES_BY_TAG_FOUND",
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
    dispatch(saucesFound({ sauces: res.sauces }));
    return res;
  });
};

export const updateSaucesItem = ({ sauce }) => dispatch => {
  dispatch(updatedSaucesItems({ sauce }));
  return;
};

export const getSaucesByTag = data => dispatch => {
  return api.sauces.getSaucesByTag(data).then(res => {
    dispatch(saucesByTagFound({ sauces: res.sauces }));
    return res;
  });
};

export const getSaucesBySearch = searchValue => dispatch => {
  return api.sauces.search(searchValue).then(res => {
    //dipatch event here in future (?)
    return res;
  });
};
