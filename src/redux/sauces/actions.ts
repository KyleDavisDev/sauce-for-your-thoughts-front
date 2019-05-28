import { API } from "../../utils/api/Api";

import {
  ISaucesReturnAction,
  ISaucesState,
  IQuery,
  SAUCES_ADDED,
  IAddSaucesAction
} from "./types";
import { IReviewsState, IReviewAPI } from "../reviews/types.js";
import Flatn from "../../utils/Flatn/Flatn";

import { addedReviews } from "../reviews/actions";
import { IUser, IUserState } from "../users/types";
import { addUsers } from "../users/actions";
import { MyThunkResult } from "../configureStore";
// import { addUsers } from "./users";

/** @description Add sauce(s) to array of sauces
 *  @param {Object} byId - dictionary of id => ISauce pairs
 *    @param {ISauce} byId.id - dictionary of id => ISauce pairs
 *  @param {String[]} allIds - array of sauce id's
 *  @param {Object} query - dictionary of queryString => id pairs
 *    @param {String[]} query - dictionary of queryString => id pairs
 *  @param {Number} total - total number of suaces we know about
 *  @return {ISaucesReturnAction} sauce and action type
 */
export const addedSauces = ({
  allSlugs,
  bySlug,
  query,
  total,
  saucesWithNewestReviews
}: IAddSaucesAction): ISaucesReturnAction => ({
  type: SAUCES_ADDED,
  allSlugs,
  bySlug,
  query,
  total,
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
//   type: UPDATE_SAUCE,
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
    const { allSlugs, bySlug }: ISaucesState = Flatn.sauces({
      sauces: [sauce]
    });

    // Grab newest reviews
    const { saucesWithNewestReviews } = res.data;

    // Lastly dispatch sauce
    dispatch(addedSauces({ allSlugs, bySlug, saucesWithNewestReviews }));

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

/** @description Grab sauces according to query
 *  @param {String?} query - optional query string to search for
 *  @returns {Promise}
 *  @fires sauces.addedSauces - add sauces to redux store
 *  @resolves {NULL}
 */
export const getSaucesByQuery = ({
  query
}: {
  query?: string;
}): MyThunkResult<Promise<null>> => dispatch => {
  console.log(query);
  return API.sauces.getByQuery({ query }).then(res => {
    // Normalize sauces
    const { allSlugs, bySlug }: ISaucesState = Flatn.sauces({
      sauces: res.data.sauces
    });

    // format query as expected
    const tmpQuery: IQuery = {};
    if (query) {
      tmpQuery[query] = allSlugs || [];
    } else {
      tmpQuery.default = allSlugs;
    }

    // dispatch sauce
    dispatch(addedSauces({ allSlugs, bySlug, query: tmpQuery }));

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
