import { IReview } from "../../redux/reviews/types";

class Flatn {
  // flatten array of reviews
  public static reviews({
    reviews
  }: {
    reviews: IReview[];
  }): {
    allHashID: string[];
    byHashID: {
      [key: string]: IReview;
    };
  } {
    const allHashID: string[] = [];
    const byHashID: { [key: string]: IReview } = {};

    for (let i = 0, len = reviews.length; i < len; i++) {
      const hashID: string | undefined = reviews[i].hashID;

      // Make sure review has a hashID or we wont be doing anything with it
      if (!hashID) continue;

      // Push into array
      allHashID.push(hashID);

      // Add to obj
      byHashID[hashID] = reviews[i];
    }

    return { allHashID, byHashID };
  }
}

export default Flatn;
