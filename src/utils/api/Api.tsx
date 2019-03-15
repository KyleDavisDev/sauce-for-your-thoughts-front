import axios, { AxiosPromise } from "axios";
import { IRegisterUser, ILoginUser } from "../../redux/users/types";
import { IReview } from "../../redux/reviews/types";

export const host =
  process.env.API_ENV === "prod"
    ? "https://sauceforyourthoughts.com"
    : "http://localhost:7777";

export const API = {
  user: {
    /** @description Add new user to DB
     *  @param {IRegisterUser} credentials - user credentials
     *  @return {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  {Object} res.data.user - user data
     *
     *  {String} res.data.user.token - unique user JWT
     *
     *  {String} res.data.user.name - user's display name
     *
     *  {String} res.data.email - user's email
     *  @reject {String} error message
     */
    register: (credentials: IRegisterUser): AxiosPromise =>
      axios.post(`${host}/api/user/register`, credentials).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      }),

    /** @description Add new user to DB
     *  @param {ILoginUser} credentials - user credentials
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  {Object} res.data.user - user data
     *
     *  {String} res.data.user.token - unique user JWT
     *
     *  {String} res.data.user.name - user's display name
     *
     *  {String} res.data.email - user's email
     *  @reject {String} error message
     */
    login: (credentials: ILoginUser): AxiosPromise =>
      axios.post(`${host}/api/user/login`, credentials).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      })
  },
  sauce: {
    /** @description Add sauce to DB
     *  @param {FormData} formData object w/ all required suace and user information
     *    @param {String} formData.user.token user's unique token
     *    @param {ISauce} formData.sauce - sauce being added
     *    @param {File} formData.image - image associated w/ sauce
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object} res.data.sauce - sauce data
     *
     *  {String} res.data.sauce.slug - unique sauce slug
     *  @reject {String} error message
     */
    add: ({ formData }: { formData: FormData }): AxiosPromise => {
      return axios
        .post(`${host}/api/sauce/add`, formData, {
          headers: {
            "content-type": `multipart/form-data`
          }
        })
        .then(res => {
          if (res.data.isGood) {
            return res;
          }
          throw new Error(res.data.msg);
        });
    },

    /** @description Find sauce information given the sauce's slug
     *  @param {Object} data object w/ all required suace and user information
     *    @param {String} data.sauce.slug sauce's unique slug
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {ISauce} res.data.sauce - sauce data
     *
     *  @reject {String} error message
     */
    getBySlug: ({
      data
    }: {
      data: { sauce: { slug: string } };
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/sauce/get/by/slug/`, data, {
          headers: {
            "content-type": `multipart/form-data`
          }
        })
        .then(res => {
          if (res.data.isGood) {
            return res;
          }
          throw new Error(res.data.msg);
        });
    }
  },
  review: {
    /** @description Add review to DB
     *  @param {Object} data data object
     *    @param {string} data.user.token user's unique token
     *    @param {IReview} data.review - review being added
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {String} error message
     */
    add: (data: { user: { token: string }; review: IReview }): AxiosPromise =>
      axios.post(`${host}/api/review/add`, data).then(res => {
        if (res.data.isGood) {
          return res;
        }
        throw new Error(res.data.msg);
      })
  }
};
