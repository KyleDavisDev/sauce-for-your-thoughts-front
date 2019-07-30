import moment from "moment";

import { IReview, IReviewAPI } from "../../redux/reviews/types";
import { IUser, IUserState } from "../../redux/users/types";
import {
  ISauce,
  ISaucesState,
  ISaucesFromQuery
} from "../../redux/sauces/types";
import Utils from "../Utils/Utils";

class Flatn {
  // flatten array of reviews
  public static reviews({ reviews }: { reviews: IReviewAPI[] | IReview[] }) {
    const byReviewID: { [key: string]: IReview } = {};

    // Will assign this to reviews if need to.
    // Creating it once here will save computing time and give all reviews same value
    const addedToStore: number = moment().unix();

    for (let i = 0, len = reviews.length; i < len; i++) {
      const review = reviews[i];
      const hashID: string | undefined = review.reviewID;

      // Make sure review has a hashID or we wont be doing anything with it
      if (!hashID) continue;

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

    // Will assign this to sauces if need to.
    // Creating it once here will save computing time and give all sauces same value
    const addedToStore: number = moment().unix();
    for (let i = 0, len = sauces.length; i < len; i++) {
      const slug: string | undefined = sauces[i].slug;

      if (!slug) continue;

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

    const allSlugs: string[] = Object.keys(bySlug);

    return { allSlugs, bySlug };
  }

  // flatten object of sauces
  public static saucesObj({
    sauces
  }: {
    sauces: ISaucesFromQuery;
  }): ISaucesState {
    // init
    const bySlug: { [key: string]: ISauce } = {};

    // Will assign this to sauces if need to.
    // Creating it once here will save computing time and give all sauces same value
    const addedToStore: number = moment().unix();
    for (let i = 0, len = Object.keys(sauces).length - 1; i < len; i++) {
      // make sure we aren't dealing with number
      const val = sauces[i];
      if (typeof val === "number") continue;

      const slug = val.slug;

      if (!slug) continue;

      // Add to obj
      bySlug[slug] = val;

      // If sauce doesn't have _addedToStore prop, we will add it
      if (!bySlug[slug]._addedToStore) {
        bySlug[slug]._addedToStore = addedToStore;
      }

      // If we don't have _full assigned, assume to be false and set to false
      if (!bySlug[slug]._full) {
        bySlug[slug]._full = false;
      }
    }

    const allSlugs: string[] = Object.keys(bySlug);

    return { allSlugs, bySlug };
  }
}

export default Flatn;
