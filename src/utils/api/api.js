import axios from "axios";
import { ISauce } from "../../redux/sauce/types";
import { IReview } from "../../redux/reviews/sauce";
export const host =
  process.env.API_ENV === "prod"
    ? "https://sauceforyourthoughts.com"
    : "http://localhost:7777";

const api = {
  user: {
    login: credentials =>
      axios.post(`${host}/api/user/login`, credentials).then(res => {
        if (res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),
    register: credentials =>
      axios.post(`${host}/api/user/register`, credentials).then(res => {
        if (res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),

    /** @description get user-specific info from DB
     *  @param {Object} credentials - object container
     *    @param {Object} credentials.user - user container
     *      @param {String} credentials.user.token - unique user string
     *  @returns {Promise} res
     *    @returns {Number} res.status - status of request
     *    @return {Object} res.data - container object
     *      @return {Boolean} res.data.isGood - whether user was able to be found or not
     *      @return {String} res.data.msg - small blurb about isGood bool
     *      @return {Object} res.data.user - user container
     *        @return {String} res.data.user._id - unique person identifier
     *        @return {String} res.data.user.email - user email
     *        @return {String} res.data.user.name - user's name (first last)
     */
    getInfo: credentials =>
      axios.post(`${host}/api/user/getInfo`, credentials).then(res => {
        if (res.status === 200 && res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),
    update: credentials =>
      axios.post(`${host}/api/user/update`, credentials).then(res => {
        if (res.status === 200 && res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),
    isLoggedIn: credentials =>
      axios.post(`${host}/api/user/isloggedin`, credentials).then(res => {
        if (res.status === 200 && res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),
    toggleSauce: data =>
      axios.post(`${host}/api/user/toggleSauce`, data).then(res => {
        if (res.data.isGood && res.status === 200) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),

    /** @description Get the hearts of a user
     *  @param {Object} user object
     *    @param {String} user.token - JWT string
     *  @returns {Promise}
     *    @returns {String[]} array of store _ids
     */
    getHearts: credentials =>
      axios.post(`${host}/api/user/getHearts`, credentials).then(res => {
        if (res.data.isGood && res.status === 200) {
          return res.data;
        }
        throw new Error(res.data.msg);
      })
  },
  sauce: {
    /** @description Add sauce to DB
     *  @param {Object} data object
     *  @param {Object} data.user object
     *    @param {String} data.user.token - user token
     *  @param {ISauce} data.sauce - sauce object
     *  @param {Blob} data.photo - photo blog
     *  @returns {Promise} represents
     */
    add: data =>
      axios
        .post(`${host}/api/sauce/add`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.isGood && res.status === 200) {
            return res.data;
          }
          throw new Error(res.data.msg);
        }),

    /** @description Get sauce related data by using single sauce id
     *  @param Object, API expects user.token and sauce._id
     *  @returns Promise
     *  @returns Object, sauce specific data
     */
    getById: data =>
      axios.post(`${host}/api/sauce/get/id`, data).then(res => {
        if (res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),
    getBySlug: data =>
      axios.get(`${host}/api/sauce/get/${data}`).then(res => {
        if (res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),
    update: data =>
      axios
        .post(`${host}/api/sauce/update`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          }
          throw new Error(res.data.msg);
        })
  },
  sauces: {
    /** @description get sauces from API
     *  @param {String?} query - query string to search for
     *  @returns {Promise} res
     *    @returns {Number} res.status - status of request
     *    @return {Object} res.data - container object
     *      @return {Boolean} res.data.isGood - whether user was able to be found or not
     *      @return {String} res.data.msg - small blurb about isGood bool
     *      @return {Object[]} res.data.sauces[] - array of sauce objects
     *        @return {String} res.data.sauces[]._id - unique sauce identifier
     *        @return {String} res.data.sauces[].description - description of sauce
     *        @return {String} res.data.sauces[].name - sauces's name
     *        @return {String} res.data.sauces[].slug - unique sauce slug
     *        @return {String} res.data.sauces[].photo - name of the photo
     *        @return {Object} res.data.sauces[].author - author of sauce
     *          @return {String} res.data.sauces[].author._id - unique author identifier
     *          @return {String} res.data.sauces[].author.name - name of the author
     *        @return {Object[]} res.data.sauces[].reviews[] - reviews for the sauce
     *          @return {String} res.data.sauces[].reviews[]._id - unique review identifier
     *        @return {String[]} res.data.sauces[].tags[] - tags for sauce
     */
    get: ({ query }) =>
      axios.get(`${host}/api/sauces/get${query}`).then(res => {
        if (res.data.isGood && res.status === 200) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),
    getSaucesByTag: data =>
      axios.post(`${host}/api/sauces/get/by/tag`, data).then(res => {
        if (res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),
    search: searchValue =>
      axios.get(`${host}/api/sauces/search/${searchValue}`).then(res => {
        if (res.data.isGood) {
          return res.data;
        }
        // this false error will be handled in SearchBar component
        throw new Error(res.data.msg);
      })
  },
  tags: {
    getList: () =>
      axios.get(`${host}/api/tags/get`).then(res => {
        if (res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      })
  },
  review: {
    /** @description add a single review to the DB
     *  @param {Object} data - all encompasing object
     *    @param {Object} data.user - holds user information
     *      @param {String} data.user.token - unique user identifier
     *    @param {Object} data.sauce - hold sauce information
     *      @param {String} data.sauce.token - unique sauce string
     *    @param {String} data.review.taste - taste obj
     *      @param {String} data.review.taste.txt - description of taste
     *      @param {Number} data.review.taste.rating - 1-5 rating
     *    @param {String} data.review.heat - heat obj
     *      @param {String} data.review.heat.txt - description of heat
     *      @param {Number} data.review.heat.rating - 1-5 rating
     *    @param {String} data.review.aroma - aroma obj
     *      @param {String} data.review.aroma.txt - description of aroma
     *      @param {Number} data.review.aroma.rating - 1-5 rating
     *    @param {String} data.review.overall - overall obj
     *      @param {String} data.review.overall.txt - description of overall
     *      @param {Number} data.review.overall.rating - 1-5 rating
     *    @param {String} data.review.label - label obj
     *      @param {String} data.review.label.txt - description of label
     *      @param {Number} data.review.label.rating - 1-5 rating
     *    @param {String?} data.review.note - who made the sauce
     *  @returns {Promise}
     */
    add: data =>
      axios.post(`${host}/api/review/add`, data).then(res => {
        if (res.data.isGood && res.status === 200) {
          return res.data;
        }
        throw new Error(res.data.msg);
      })
  },
  peppers: {
    get: () =>
      axios.get(`${host}/api/peppers/get`).then(res => {
        if (res.data.isGood && res.status === 200) {
          return res.data;
        }
        throw new Error(res.data.msg);
      })
  },
  types: {
    get: () =>
      axios.get(`${host}/api/types/get`).then(res => {
        if (res.data.isGood && res.status === 200) {
          return res.data;
        }
        throw new Error(res.data.msg);
      })
  }
};

export default api;
