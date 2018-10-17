import api from "../../utils/api/api.js";
// import { normalize } from "normalizr";

import { IQuery, IActionSauces, SaucesActionTypes } from "./types";
import { ISauce } from "../sauce/types";
import { IReview } from "../reviews/types.js";

// import { addedReviews } from "./reviews";
// import { addUsers } from "./users";

/** @description Add sauce(s) to array of sauces
 *  @param {ISauce[]} sauces[] - array of sauce objects
 *  @param {IQuery[]?} query - query used to get sauces
 *  @param {Number} total - total number of sauces in store
 *  @return {IActionSauces}, sauce and action type
 */
export const addedSauces = (
  sauces: ISauce[],
  query?: IQuery,
  total?: number
): IActionSauces => ({
  type: SaucesActionTypes.SAUCES_ADDED,
  sauces,
  query,
  total
});

/** @description Update single sauce
 *  @param {ISauce} sauce - sauce to be updated
 *  @return {IActionSauces}, sauce and action type
 */
export const updatedSaucesItems = ({
  sauce
}: {
  sauce: ISauce;
}): IActionSauces => ({
  type: SaucesActionTypes.UPDATE_SAUCE,
  sauce
});

// This may not be used anymore
// export const saucesByTagFound = ({ sauces }) => ({
//   type: SaucesActionTypes.SAUCES_BY_TAG_FOUND,
//   sauces
// });

/** @description Add sauce to DB
 *  @param {FormData} data - Form Data that has been JSONified
 *    @param {Object} data.user - author of the sauce
 *      @param {String} data.user.token - unique string
 *    @param {Object} data.sauce - sauce object
 *      @param {String} data.sauce.name - name of the sauce
 *      @param {String} data.sauce.description - description of sauce
 *      @param {String[]} data.sauce.tags[] - user selected tags to catagorize sauce
 *    @param {Object} review - user review object
 *      @param {String} text - user's review of sauce
 *      @param {Number} rating - 0-10 value
 *    @param {Blob} photo - actual photo to upload
 *  @returns {Promise}
 *    @returns {null}
 */
export const addSauce = ({
  data
}: {
  data: {
    user: { token: string };
    sauce: ISauce;
    review: IReview;
    photo: Blob;
  };
}) => (dispatch: any) => {
  return api.sauce.add(data).then((res: any) => {
    // flatten response
    // const { sauces } = flatten(res.data.sauces); // Might need to play around with this

    // // Add sauce to store
    // dispatch(addedSauces(sauces));

    // Add user to store
    // dispatch(addUsers({ users: authors }));

    return null;
  });
};

// /** @description Grab all sauces available (will limit this to only set amount at a time in future)
//  *  @param {String?} query - optional query string to search for
//  *  @return {NULL}
//  */
// export const getSauces = ({ query }) => dispatch => {
//   api.sauces.get({ query }).then(res => {
//     // flatten data
//     const { sauces, reviews, authors } = flattenSauces(res.data.sauces);

//     // construct just-searched query
//     const sauceQuery = { [query]: { sauces: sauces.allIds } };

//     // get total from response
//     const total = res.data.total || 6;

//     // make sauces were flattened
//     if (flatChecker(sauces)) {
//       dispatch(addedSauces({ sauces, query: sauceQuery, total }));
//     }

//     // make sure review were flattened
//     if (flatChecker(reviews)) {
//       dispatch(addedReviews({ reviews }));
//     }

//     // make sure users were flattened
//     if (flatChecker(authors)) {
//       dispatch(addUsers({ users: authors }));
//     }

//     return res;
//   });
// };

// export const updateSaucesItem = ({ sauce }) => dispatch => {
//   dispatch(updatedSaucesItems({ sauce }));
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

// /** @description grab single sauce related to slug
//  *  @param {String} slug - keyword to lookup
//  *  @returns {NULL}
//  */
// export const getSauceBySlug = slug => dispatch =>
//   api.sauce.getBySlug(slug).then(res => {
//     // flatten response obj
//     const { sauces, reviews, authors } = flattenSauces(res.data.sauces);

//     // make sauces were flattened
//     if (flatChecker(sauces)) {
//       dispatch(addedSauces({ sauces }));
//     }

//     // make sure review were flattened
//     if (flatChecker(reviews)) {
//       dispatch(addedReviews({ reviews }));
//     }

//     // make sure users were flattened
//     if (flatChecker(authors)) {
//       dispatch(addUsers({ users: authors }));
//     }
//   });
