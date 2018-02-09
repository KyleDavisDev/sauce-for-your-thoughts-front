export default function tags(state = [], action) {
  switch (action.type) {
    case "GOT_TAGS_LIST":
      return action.tags;
    case "CLEANED_UP_TAGS":
      return [];
    default:
      return state;
  }
}
