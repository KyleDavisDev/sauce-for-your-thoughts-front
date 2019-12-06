import { IReview } from "../../../../redux/reviews/types";

export const dummyData: IReview[] = [
  {
    _id: "58c6a8aafb4d61115815f8b4",
    created: 1575642773,
    sauce: "5",
    author: "1",
    overall: {
      rating: 3,
      txt:
        "Ive had some umami hot sauces that are too complex in flavor profile and stumble over themselves.... this is not it."
    },
    label: {
      rating: 5,
      txt:
        "Ive had some umami hot sauces that are too complex in flavor profile and stumble over themselves.... this is not it."
    },
    aroma: {
      rating: 1,
      txt:
        "Deep rich smokey aroma with a sweetness of caramalized onions. Really enjoyable on the nose. Not overly complex or simple Deep rich smokey aroma with a sweetness of caramalized onions. Really enjoyable on the nose. Not overly complex or simple "
    },
    taste: { rating: 4, txt: "here is some test text" }
  },
  {
    _id: "58c6a8b8fb4d61115815f8b5",
    created: 1575642773,
    sauce: "5",
    author: "2",
    overall: { rating: 1, txt: "here is some test text" },
    label: { rating: 1, txt: "here is some test text" },
    taste: { rating: 5, txt: "here is some test text" },
    heat: { rating: 5, txt: "On the mild side, but balanced well" }
  },
  {
    _id: "58c6a8cefb4d61115815f8b6",
    created: 1575642773,
    sauce: "5",
    author: "3",
    overall: { rating: 4, txt: "On the mild side, but balanced well" },

    aroma: { rating: 4, txt: "here is some test text" },
    taste: {
      rating: 4,
      txt:
        "Deep rich smokey aroma with a sweetness of caramalized onions. Really enjoyable on the nose. Not overly complex or simple Deep rich smokey aroma with a sweetness of caramalized onions. Really enjoyable on the nose. Not overly complex or simple "
    },
    heat: { rating: 2, txt: "here is some test text" },
    note: { rating: 5, txt: "On the mild side, but balanced well" }
  },
  {
    _id: "58c6a8e5fb4d61115815f8b7",
    created: 1575642773,
    sauce: "5",
    author: "4",
    overall: { rating: 1, txt: "here is some test text" },
    label: {
      rating: 1,
      txt:
        "Ive had some umami hot sauces that are too complex in flavor profile and stumble over themselves.... this is not it."
    },
    taste: {
      rating: 3,
      txt:
        "Ive had some umami hot sauces that are too complex in flavor profile and stumble over themselves.... this is not it."
    },
    heat: {
      rating: 5,
      txt:
        "Deep rich smokey aroma with a sweetness of caramalized onions. Really enjoyable on the nose. Not overly complex or simple Deep rich smokey aroma with a sweetness of caramalized onions. Really enjoyable on the nose. Not overly complex or simple "
    },
    note: { rating: 4, txt: "here is some test text" }
  },
  {
    _id: "58c6a8f6fb4d61115815f8b8",
    created: 1575642773,
    sauce: "5",
    author: "122",
    overall: { rating: 2, txt: "here is some test text" },
    label: {
      rating: 3,
      txt:
        "Ive had some umami hot sauces that are too complex in flavor profile and stumble over themselves.... this is not it."
    },
    aroma: {
      rating: 4,
      txt:
        "Ive had some umami hot sauces that are too complex in flavor profile and stumble over themselves.... this is not it."
    }
  }
];
