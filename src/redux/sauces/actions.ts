import { API } from "../../utils/api/Api";

import { ISaucesAction, SaucesActionTypes, ISaucesState } from "./types";
import { IReviewsState, IReviewAPI } from "../reviews/types.js";
import Flatn from "../../utils/Flatn/Flatn";

import { addedReviews } from "../reviews/actions";
import { IUser, IUserState } from "../users/types";
import { addUsers } from "../users/actions";
// import { addUsers } from "./users";

/** @description Add sauce(s) to array of sauces
 *  @param {Object} byId - dictionary of id => ISauce pairs
 *    @param {ISauce} byId.id - dictionary of id => ISauce pairs
 *  @param {String[]} allIds - array of sauce id's
 *  @param {Object} query - dictionary of queryString => id pairs
 *    @param {String[]} query - dictionary of queryString => id pairs
 *  @param {Number} total - total number of suaces we know about
 *  @return {ISaucesAction} sauce and action type
 */
export const addedSauces = ({
  sauce,
  saucesWithNewestReviews
}: {
  sauce: ISaucesState;
  saucesWithNewestReviews: Array<{ name: string; slug: string }>;
}): ISaucesAction => ({
  type: SaucesActionTypes.SAUCES_ADDED,
  allSlugs: sauce.allSlugs,
  bySlug: sauce.bySlug,
  query: sauce.query,
  total: sauce.total,
  saucesWithNewestReviews
});

/** @description Add sauce(s) to array of sauces
 *  @param {ISaucesAction} object - object of sauce information
 *    @param {Object} object.byId - dictionary of id => ISauce pairs
 *    @param {number[]} object.allIds - array of sauce id's
 *  @return {ISaucesAction} sauce and action type
 */
// export const updatedSaucesItems = ({
//   allIds,
//   byId
// }: ISaucesAction): ISaucesAction => ({
//   type: SaucesActionTypes.UPDATE_SAUCE,
//   allIds,
//   byId
// });

/** @description grab single sauce related to slug
 *  @param {Object} data - object containing slug we are interested in
 *    @param {Object} data.sauce  - sauce container
 *      @param {String} data.sauce.slug - unique sauce slug
 *
 *  @returns {Promise}
 *  @fires sauces.addsauce - add sauce to redux store
 *  @fires reviews.addedReviews - add reviews to redux store
 *  @resolves {Null}
 *
 *  @reject {String} error message
 */
export const getSauceBySlug = ({
  data
}: {
  data: { sauce: { slug: string } };
}) => async (dispatch: any): Promise<null> => {
  return API.sauce.getBySlug({ data }).then((res: any) => {
    // Pull sauce out
    const { sauce } = res.data;

    // Update sauce and dispatch reviews if we have them
    const reviews: IReviewAPI[] = [...sauce.reviews];
    if (reviews && reviews.length > 0) {
      // Normalize reviews
      const { byHashID, allHashIDs } = Flatn.reviews({
        reviews
      });

      // Create obj to redux
      const normalizedReviews: IReviewsState = { byHashID, allHashIDs };

      // Push reviews to redux
      dispatch(addedReviews({ reviews: normalizedReviews }));

      // Update reviews on sauce
      sauce.reviews = normalizedReviews.allHashIDs;
    }

    // Now we need to normalize author and update sauce
    // Grab author from sauce
    const author: IUser = sauce.author;
    // grab the author from reviews
    const usersFromReviews = reviews.map((review: any) => {
      return review.author;
    });

    const normalizedUser: IUserState = Flatn.users({
      users: [author, ...usersFromReviews]
    });
    // Dispatch user
    dispatch(addUsers({ user: normalizedUser }));
    // Update sauce w/ author and set _full to true
    sauce.author = author.displayName;

    // Normalize sauce and dispatch
    sauce._full = true; // Set here for Flatn will auto-set to false
    const normalizedSauce: ISaucesState = Flatn.sauces({ sauces: [sauce] });

    // Grab newest reviews
    const { saucesWithNewestReviews } = res.data;

    // Lastly dispatch sauce
    dispatch(addedSauces({ sauce: normalizedSauce, saucesWithNewestReviews }));

    return null;
  });
};

/** @description Add sauce to DB
 *  @param {FormData} formdata - Form Data that has been JSONified
 *    @param {Object} formdata.user - author of the sauce
 *      @param {String} formdata.user.token - unique string
 *    @param {ISauce} formdata.sauce - sauce object
 *  @returns {Promise}
 *    @returns {String} slug - unique sauce slug
 */
export const addSauce = ({ formData }: { formData: FormData }) => async (
  dispatch: any
): Promise<string> => {
  return API.sauce.add({ formData }).then((res: any) => {
    const { slug } = res.data.sauce;

    return slug;
  });
};

// /** @description Grab sauces according to query
//  *  @param {String?} query - optional query string to search for
//  *  @return {NULL}
//  */
export const getSaucesByQuery = ({ query }: { query?: string }) => async (
  dispatch: any
) => {
  return API.sauces.findByQuery({ query }).then(res => {
    console.log(res);

    return null;
  });
};

/** @description Update sauce in DB
 *  @param {FormData} data - Form Data that has been JSONified
 *    @param {Object} data.user - author of the sauce
 *      @param {String} data.user.token - unique string
 *    @param {ISauce} data.sauce - sauce object
 *    @param {IReview} review - user review object
 *    @param {Blob?} photo - actual photo to upload
 *  @returns {Promise}
 *    @returns {null}
 */
// export const updateSauce = ({
//   data
// }: {
//   data: {
//     user: { token: string };
//     sauce: ISauce;
//     review: IReview;
//     photo?: Blob;
//   };
// }) => (dispatch: any) => {
//   return api.sauce.update(data).then((res: any) => {
//     // dispatch(updatedSaucesItems({ sauce }));
//   });
// };

// export const getSaucesByTag = data => dispatch =>
//   api.sauces.getSaucesByTag(data).then(res => {
//     dispatch(saucesByTagFound({ sauces: res.sauces }));
//     return res;
//   });

// export const getSaucesBySearch = searchValue => dispatch =>
//   api.sauces.search(searchValue).then(
//     res =>
//       // dipatch event here in future (?)
//       res
//   );
