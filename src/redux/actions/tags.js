import api from "../../api/api";

export const gotTagsList = ({ tags }) => ({
  type: "GOT_TAGS_LIST",
  tags
});

export const getTagsList = () => dispatch => {
  return api.tags.getList().then(res => {
    dispatch(gotTagsList({ tags: res.tags }));
    return res;
  });
};
