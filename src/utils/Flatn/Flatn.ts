import moment from "moment";

import { IReview, IReviewAPI } from "../../redux/reviews/types";
import { IUser, IUserState } from "../../redux/users/types";
import { ISauce, ISaucesState } from "../../redux/sauces/types";

class Flatn {
  // flatten array of reviews
  public static reviews({ reviews }: { reviews: IReviewAPI[] | IReview[] }) {
    const allReviewIDs: string[] = [];
    const byReviewID: { [key: string]: IReview } = {};

    // Will assign this to reviews if need to.
    // Creating it once here will save computing time and give all reviews same value
    const addedToStore: number = moment().unix();

    for (let i = 0, len = reviews.length; i < len; i++) {
      const review = reviews[i];
      const hashID: string | undefined = review.reviewID;

      // Make sure review has a hashID or we wont be doing anything with it
      if (!hashID) continue;
      // Push into array
      allReviewIDs.push(hashID);

      // Add to obj and reassign author to match desired format
      let author = review.author;
      if (typeof author === "string") {
        // do not need to do anything
      } else {
        // dig little deeper
        author = author.displayName;
      }
      byReviewID[hashID] = { ...review, author };

      // If review doesn't have _addedToStore prop, we will add it
      if (!byReviewID[hashID]._addedToStore) {
        byReviewID[hashID]._addedToStore = addedToStore;
      }
    }

    return { allReviewIDs, byReviewID };
  }

  // flatten array of users
  public static users({ users }: { users: IUser[] }): IUserState {
    const allDisplayNames: string[] = [];
    const byDisplayName: { [key: string]: IUser } = {};

    // Will assign this to users if need to.
    // Creating it once here will save computing time and give all users same value
    const addedToStore: number = moment().unix();

    for (let i = 0, len = users.length; i < len; i++) {
      const displayName: string = users[i].displayName;

      // Push into array
      allDisplayNames.push(displayName);

      // Add to obj
      byDisplayName[displayName] = users[i];

      // If user doesn't have _addedToStore prop, we will add it
      if (!byDisplayName[displayName]._addedToStore) {
        byDisplayName[displayName]._addedToStore = addedToStore;
      }
    }

    return { allDisplayNames, byDisplayName };
  }

  // flatten array of sauces
  public static sauces({ sauces }: { sauces: ISauce[] }): ISaucesState {
    const allSlugs: string[] = [];
    const bySlug: { [key: string]: ISauce } = {};

    // Will assign this to sauces if need to.
    // Creating it once here will save computing time and give all sauces same value
    const addedToStore: number = moment().unix();

    for (let i = 0, len = sauces.length; i < len; i++) {
      const slug: string | undefined = sauces[i].slug;

      if (!slug) continue;

      // Push into array
      allSlugs.push(slug);

      // Add to obj
      bySlug[slug] = sauces[i];

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
