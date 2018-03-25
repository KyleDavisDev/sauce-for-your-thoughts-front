export const flattenSauce = ({ sauce }) => {
  //TODO figure out flattening sauce
  const key = sauce._id;
  const temp = {
    key: {
      name: sauce.name,
      description: sauce.description,
      photo: sauce.photo,
      tags: sauce.tags,
      author: { _id: sauce.author._id },
      reviews: sauce.rewiews.map(x => x._id)
    }
  };
  console.log("i");
  return temp;
};

export default function sauces(state = [], action) {
  switch (action.type) {
    case "SAUCES_FOUND":
      return action.sauces;

    case "SAUCE_ADDED":
      console.log("sauce found");
      console.log(action);
      action.sauce = flattenSauce({ sauce: action.sauce });
      console.log("yo");
      console.log(action);
    case "UPDATED_SAUCES_ITEM":
      //update single sauces item if sauces is already set
      return state
        ? state.map(sauce => {
            if (sauce._id === action.sauce._id) {
              action.sauce.author = sauce.author;
              return action.sauce;
            }
            return sauce;
          })
        : [];
    case "SAUCES_BY_TAG_FOUND":
      return action.sauces;
    case "CLEANED_UP_SAUCES":
      return [];
    default:
      return state;
  }
}
