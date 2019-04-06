import moment from "moment";

import { IReview, IReviewsState } from "../../redux/reviews/types";
import { IUser, IUserState } from "../../redux/users/types";

class Flatn {
  // flatten array of reviews
  public static reviews({ reviews }: { reviews: IReview[] }): IReviewsState {
    const allHashIDs: string[] = [];
    const byHashID: { [key: string]: IReview } = {};

    // Will assign this to reviews if need to.
    // Creating it once here will save computing time and give all reviews same value
    const addedToStore: number = moment().unix();

    for (let i = 0, len = reviews.length; i < len; i++) {
      const hashID: string | undefined = reviews[i].hashID;

      // Make sure review has a hashID or we wont be doing anything with it
      if (!hashID) continue;

      // Push into array
      allHashIDs.push(hashID);

      // Add to obj
      byHashID[hashID] = reviews[i];

      // If review doesn't have _addedToStore prop, we will add it
      if (!byHashID[hashID]._addedToStore) {
        byHashID[hashID]._addedToStore = addedToStore;
      }
    }

    return { allHashIDs, byHashID };
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

      // If review doesn't have _addedToStore prop, we will add it
      if (!byDisplayName[displayName]._addedToStore) {
        byDisplayName[displayName]._addedToStore = addedToStore;
      }
    }

    return { allDisplayNames, byDisplayName };
  }
}

export default Flatn;
