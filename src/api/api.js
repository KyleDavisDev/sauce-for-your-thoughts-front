import axios from "axios";
export const host =
  process.env.API_ENV === "prod"
    ? "https://sauceforyourthoughts.com"
    : "http://localhost:7777";

export default {
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
     *  @param {Object} data.sauce - sauce object
     *    @param {String} data.sauce.name - sauce name
     *    @param {String[]} data.sauce.tags[] - tags
     *    @param {Blob} data.sauce.photo - photo blog
     *  @param {Object} data.review - review object
     *    @param {String} data.review.text - authors's review
     *    @param {Integer} data.review.rating - author's rating for sauce
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
    get: () =>
      axios.get(`${host}/api/sauces/get`).then(res => {
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
    add: data =>
      axios.post(`${host}/api/review/add`, data).then(res => {
        if (res.data.isGood && res.status === 200) {
          return res.data;
        }
        throw new Error(res.data.msg);
      })
  }
};
