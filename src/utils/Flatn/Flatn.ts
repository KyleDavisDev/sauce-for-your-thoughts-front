import moment from "moment";

import { IReview, IReviewAPI } from "../../redux/reviews/types";
import { IUser, IUserState } from "../../redux/users/types";
import { ISauce, ISaucesState } from "../../redux/sauces/types";

class Flatn {
  // flatten array of reviews
  public static reviews({ reviews }: { reviews: IReviewAPI[] }) {
    const byReviewID: { [key: string]: IReview } = {};

    // Will assign this to reviews if need to.
    // Creating it once here will save computing time and give all reviews same value
    const _addedToStore: number = moment().unix();

    for (let i = 0, len = reviews.length; i < len; i++) {
      // 1) Grab review
      const review = reviews[i];

      // 2) Grab reviewID
      const reviewID: string | undefined = review.reviewID;
      if (!reviewID) continue;

      // 3) Grab authors name
      const { displayName } = review.author;
      if (!displayName) continue;

      // 4) Set object, make sure author has been reassigned to name, update addedToStore time
      byReviewID[reviewID] = {
        ...review,
        ...{ author: displayName, _addedToStore }
      };
    }

    // Set all the id's from byReviewID into obj
    const allReviewIDs: string[] = Object.keys(byReviewID);

    return { allReviewIDs, byReviewID };
  }

  // flatten array of users
  public static users({ users }: { users: IUser[] }): IUserState {
    const byDisplayName: { [key: string]: IUser } = {};

    // Will assign this to users if need to.
    // Creating it once here will save computing time and give all users same value
    const addedToStore: number = moment().unix();

    for (let i = 0, len = users.length; i < len; i++) {
      const displayName: string = users[i].displayName;

      // Add to obj
      byDisplayName[displayName] = users[i];

      // If user doesn't have _addedToStore prop, we will add it
      if (!byDisplayName[displayName]._addedToStore) {
        byDisplayName[displayName]._addedToStore = addedToStore;
      }
    }

    const allDisplayNames: string[] = Object.keys(byDisplayName);

    return { allDisplayNames, byDisplayName };
  }

  // flatten array of sauces
  public static saucesArr({ sauces }: { sauces: ISauce[] }): ISaucesState {
    // init
    const bySlug: { [key: string]: ISauce } = {};
    const allSlugs: string[] = [];

    // Will assign this to sauces if need to.
    // Creating it once here will save computing time and give all sauces same value
    const addedToStore: number = moment().unix();
    for (let i = 0, len = sauces.length; i < len; i++) {
      // Grab sauce and slug
      const sauce = sauces[i];
      const slug = sauce.slug;
      if (!slug) continue;

      // Add to obj and array
      if (!bySlug[slug]) {
        bySlug[slug] = sauce;
        allSlugs.push(slug);
      }

      // If sauce doesn't have _addedToStore prop, we will add it
      if (!bySlug[slug]._addedToStore) {
        bySlug[slug]._addedToStore = addedToStore;
      }

      // If we don't have _full assigned, assume to be false and set to false
      if (!bySlug[slug]._full) {
        bySlug[slug]._full = false;
      }
    }

    return { allSlugs, bySlug };
  }
}

export default Flatn;
