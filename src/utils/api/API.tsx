import axios, { AxiosPromise, AxiosResponse } from "axios";
import ProgressBar from "rsup-progress";
import { theme } from "../../theme/styled-components";
import {
  IRegisterUser,
  ILoginUser,
  IUserUpdateEmail,
  IUserUpdatePassword,
  IUserUpdateDisplayName,
  IUserUpdateAvatar,
  IUserResetPassword
} from "../../redux/users/types";
import { IReview, IReviewToServer } from "../../redux/reviews/types";
import Err, { IErrReturn } from "../Err/Err";
import { UserInfo } from "./types";

// let ProgressBar;
let progressBar;

if (typeof window !== "undefined") {
  // tslint:disable-next-line:no-var-requires
  // import ProgressBar from "rsup-progress";
  progressBar = new ProgressBar({
    height: 5,
    color: theme.secondaryThemeColor
  });
}

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    progressBar.start();

    // Do something before request is sent
    return config;
  },
  error => {
    progressBar.end();
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
function createAxiosResponseInterceptor() {
  const interceptor = axios.interceptors.response.use(
    response => {
      progressBar.end();
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    error => {
      // Any status codes that falls outside the range of 2xx causes this function to trigger

      if (error.response.status !== 410) {
        // set status bar to end
        progressBar.end();

        // return/resolve original error
        return Promise.reject(error);
      }

      /*
       * When response code is 410, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 410 response
       */
      axios.interceptors.response.eject(interceptor);

      // refresh token
      return axios
        .post(`${host}/api/auth/refresh_token`)
        .then(res => {
          if (res.status === 200) {
            // return originalRequest object with Axios.
            return axios(error.response.config);
          }

          // return/resolve original error
          return Promise.reject(error);
        })
        .catch((err: any) => {
          // return/resolve original error
          return Promise.reject(err);
        })
        .finally(() => {
          //rebind interceptor
          createAxiosResponseInterceptor();

          // set status bar to end
          progressBar.end();
        });
    }
  );
}
createAxiosResponseInterceptor();

axios.defaults.withCredentials = true;

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
    register: (credentials: IRegisterUser): AxiosPromise => {
      return axios
        .post(`${host}/api/user/register`, credentials)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        });
    },

    /** @description Log user into account
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
    login: (credentials: ILoginUser): AxiosPromise => {
      return axios
        .post(`${host}/api/user/login`, credentials, {
          withCredentials: true
        })
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw Err({
            msg: err.response.data.msg,
            status: err.response.status,
            isGood: err.response.data.isGood || false
          });
        });
    },

    /** @description Call API to send null cookies
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  @reject {String} error message
     */
    logout: (): AxiosPromise => {
      return axios.post(`${host}/api/user/logout`).then((res: any) => {
        if (res.data.isGood) {
          return res;
        }

        // If not good, throw an error
        throw Err({ msg: res.data.msg, status: res.status });
      });
    },

    /** @description Update a user's email
     *  @param {IUserUpdateEmail} data - container for user information
     *  @param {string} data.user.email - new email address
     *  @param {string} data.user.confirmEmail - confirmed email adress
     *  @param {string} data.user.password - user password
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object} res.data.user - user data object
     *
     *  {String} res.data.user.token - unique user token
     *
     *  @reject {String} error message
     */
    updateEmail: ({ data }: { data: IUserUpdateEmail }): AxiosPromise => {
      return axios
        .post(`${host}/api/user/update/email`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        });
    },

    /** @description Call Server to update password
     *  @param {IUserUpdatePassword} data - container for user information
     *  @param {string} data.user.jwt - user's jwt (from url)
     *  @param {string} data.user.newPassword - new user password
     *  @param {string} data.user.confirmNewPassword - confirm new user password
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  @reject {String} error message
     */
    updatePassword: (data: IUserUpdatePassword): AxiosPromise => {
      return axios
        .post(`${host}/api/user/update/password`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw Err({
            msg: err.response.data.msg,
            status: err.response.status,
            isGood: err.response.data.isGood || false
          });
        });
    },

    /** @description Call Server to update display name
     *  @param {IUserUpdateDisplayName} data - container for user information
     *  @param {string} data.user.password - original password
     *  @param {string} data.user.displayName - new user display name
     *  @param {string} data.user.confirmDisplayName - confirm new display name
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  @reject {String} error message
     */
    updateDisplayName: ({
      data
    }: {
      data: IUserUpdateDisplayName;
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/user/update/displayname`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw Err({
            msg: err.response.data.msg,
            status: err.response.status,
            isGood: err.response.data.isGood || false
          });
        });
    },

    /** @description Update a user's avatar
     *  @param {IUserUpdateAvatar} data - container for user information
     *  @param {string} data.user.token - user token
     *  @param {string} data.user.password - original password
     *  @param {string} data.user.avatarURL - new user avatar url
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object} res.data.user - user data object
     *
     *  {String} res.data.user.token - unique user token
     *
     *  @reject {String} error message
     */
    updateAvatar: ({ data }: { data: IUserUpdateAvatar }): AxiosPromise => {
      return axios
        .post(`${host}/api/user/update/avatar`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        });
    },

    /** @description Confirm a user's email
     *  @param {Object} data email
     *    @param {String} data.jwt - jwt to verify
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {IErrReturn} error object
     */
    confirmEmail: ({
      data
    }: {
      data: {
        jwt: string;
      };
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/user/email/confirm`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // Throw error in handle-able format
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw Err({
            msg: err.response.data.msg,
            status: err.response.status,
            isGood: err.response.data.isGood || false
          });
        });
    },

    /** @description Check to see if email is confirmed or not
     *  @param {Object} data data object
     *    @param {String} data.user.token - user JWT
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {IErrReturn} error object
     */
    isEmailConfirmed: ({
      data
    }: {
      data: {
        user: { token: string };
      };
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/user/email/check`, data)
        .then((res: any) => {
          return res;
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw Err({
            msg: err.response.data.msg,
            status: err.response.status,
            isGood: err.response.data.isGood || false
          });
        });
    },

    /** @description Request for the verification email to be sent again
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {IErrReturn} error object
     */
    resendVerificationEmail: (): AxiosPromise => {
      return axios
        .post(`${host}/api/user/email/resend`)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw Err({
            msg: err.response.data.msg,
            status: err.response.status,
            isGood: err.response.data.isGood || false
          });
        });
    },

    /** @description Make a request to the server for a password reset email
     *  @param {String} email - email to lookup and send reset link so
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {IErrReturn} error object
     */
    requestPasswordReset: (email: string): AxiosPromise => {
      return axios
        .post(`${host}/api/user/requestreset/password`, { email })
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw Err({
            msg: err.response.data.msg,
            status: err.response.status,
            isGood: err.response.data.isGood || false
          });
        });
    },

    /** @description Call Server to reset password
     *  @param {IUserResetPassword} data - container for user information
     *  @param {string} jwt - user's jwt (from url)
     *  @param {string} newPassword - new user password
     *  @param {string} confirmPassword - confirm new user password
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String} res.data.msg - message accociated with isGood
     *
     *  @reject {String} error message
     */
    resetPassword: (data: IUserResetPassword): AxiosPromise => {
      return axios
        .post(`${host}/api/user/reset/password`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw handleCallbackError(err);
        });
    },

    /** @description Refresh a user's API token
     *  @param {Any?} originalRequest axios original request
     *  @param {Any?} error - axios error
     *  @returns {AxiosPromise} AxiosPromise
     */
    refreshAPIToken: (): AxiosPromise => {
      return axios
        .post(`${host}/api/auth/refresh_token`)
        .then(res => {
          return res;
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw handleCallbackError(err);
        });
    },

    /** @description Get info about user. Uses cookies for authentication
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves  {UserInfo} res.data.user - user data
     *
     *  @reject {IErrReturn} error object
     */
    getInfo: async (): Promise<UserInfo | void> => {
      try {
        const res: AxiosResponse = await axios.post(`${host}/api/user/getInfo`);
        if (!res) return;

        // If good,
        if (res.data?.isGood) {
          return res.data.user as UserInfo;
        }

        // If not good, throw an error
        throw Err({ msg: res.data.msg, status: res.status });
      } catch (err) {
        // console.log(err);
        // Throw error in handle-able format
        throw handleCallbackError(err);
      }
    }
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
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        });
    },

    /** @description Get sauce to edit
     *  @param {Object} data container object
     *    @param {String} data.user.token user's unique token
     *    @param {String} data.sauce.slug unique sauce slug
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object} res.data.sauce - sauce data
     *
     *  {String} res.data.msg - msg related to query
     *  @reject {String} error message
     */
    edit: ({
      data
    }: {
      data: { user: { token: string }; sauce: { slug: string } };
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/sauce/edit`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res.data.sauce;
          }

          // Throw error in handle-able format
          throw Err({
            msg: res.data.msg,
            status: res.status,
            isGood: res.data.isGood
          });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw handleCallbackError(err);
        });
    },

    /** @description Update a specific sauce
     *  @param {FormData} formData object w/ all required suace and user information
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
    update: ({ formData }: { formData: FormData }): AxiosPromise => {
      return axios
        .post(`${host}/api/sauce/update`, formData, {
          headers: {
            "content-type": `multipart/form-data`
          }
        })
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // Throw error in handle-able format
          throw Err({
            msg: res.data.msg,
            status: res.status,
            isGood: res.data.isGood
          });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw handleCallbackError(err);
        });
    },

    /** @description Find sauce information given the sauce's slug
     *  @param {String} slug sauce's unique slug
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {ISauce} res.data.sauce - sauce data
     *
     *  {Object[]} res.data.related - array of related sauces
     *
     *  @reject {String} error message
     */
    getBySlug: ({ slug }: { slug: string }): AxiosPromise => {
      return axios
        .get(`${host}/api/sauce/get/by/slug/?s=${slug}`)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        });
    },

    /** @description Check if user is eligible to edit a sauce
     *  @param {Object} data data object
     *    @param {string} data.sauce.slug unique sauce slug
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {IErrReturn} error object
     */
    canUserEdit: ({
      data
    }: {
      data: {
        sauce: { slug: string };
      };
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/sauce/canuseredit`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // Throw error in handle-able format
          throw Err({
            msg: res.data.msg,
            status: res.status,
            isGood: res.data.isGood
          });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw Err({
            msg: err.response.data.msg,
            status: err.response.status
          });
        });
    }
  },

  sauces: {
    /** @description Grab sauces from DB
     *  @param {String?} query string with parsable params
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object[]} res.data.sauces - Array of sauces
     *
     *  {Number} res.data.count - how many sauces are in DB
     *
     *  @reject {String} error message
     */
    getByQuery: ({ query }: { query?: string }): AxiosPromise => {
      // Assign default query if falsy
      if (!query) query = "type=all&order=newest&page=1&lim=8";
      return axios
        .get(`${host}/api/sauces/getByQuery/?${query}`)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        });
    },

    /** @description Grab newest sauces from DB
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object[]} res.data.saucesByNewest - Array of sauces
     *
     *  @reject {String} error message
     */
    getByNewest: (): AxiosPromise => {
      return axios.get(`${host}/api/sauces/get/by/newest/`).then((res: any) => {
        if (res.data.isGood) {
          return res;
        }

        // If not good, throw an error
        throw Err({ msg: res.data.msg, status: res.status });
      });
    },

    /** @description Grab featured sauces from DB
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object[]} res.data.saucesByFeatured - Array of sauces
     *
     *  @reject {String} error message
     */
    getByFeatured: (): AxiosPromise => {
      return axios
        .get(`${host}/api/sauces/get/by/featured/`)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        });
    },

    /** @description Check if user is eligible to submit a sauce or not (maybe user has not verified email yet)
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {IErrReturn} error object
     */
    canUserSubmit: (): AxiosPromise => {
      return axios
        .post(`${host}/api/sauce/canusersubmit`)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // Throw error in handle-able format
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          throw handleCallbackError(err);
        });
    }
  },

  review: {
    /** @description Add review to DB
     *  @param {IReviewToServer} data data object
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {String} error message
     */
    add: (data: IReviewToServer): Promise<IReview> =>
      axios.post(`${host}/api/review/add`, data).then((res: any) => {
        if (res.data.isGood) {
          const review = res.data.review as IReview;
          return review;
        }

        // If not good, throw an error
        throw Err({ msg: res.data.msg, status: res.status });
      }),

    /** @description Get review from server
     *  @param {Object} data data object
     *    @param {string} data.sauce.slug - unique sauce slug
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object} res.data.review - review information
     *
     *  @reject {String} error message
     */
    get: (data: { sauce: { slug: string } }): Promise<IReview> =>
      axios.post(`${host}/api/review/get`, data).then((res: any) => {
        if (res.data.isGood) {
          const review = res.data.review as IReview;
          return review;
        }

        // If not good, throw an error
        throw Err({ msg: res.data.msg, status: res.status });
      }),

    /** @description Add review to DB
     *  @param {IReviewToServer} data data object
     *    @param {string} data.user.token user's unique token
     *    @param {IReview} data.review - review info
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {String} error message
     */
    edit: (data: IReviewToServer): AxiosPromise =>
      axios.post(`${host}/api/review/edit`, data).then((res: any) => {
        if (res.data.isGood) {
          return res;
        }

        // If not good, throw an error
        throw Err({ msg: res.data.msg, status: res.status });
      }),

    /** @description Check if user is eligible to submit a review or not (maybe suace is private or have already submitted one)
     *  @param {Object} data data object
     *    @param {string} data.user.token user's unique token
     *    @param {string} data.sauce.slug unique sauce string
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {IErrReturn} error message
     */
    canUserSubmit: ({
      data
    }: {
      data: {
        user: { token: string };
        sauce: { slug: string };
      };
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/review/canusersubmit`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // Throw error in handle-able format
          throw Err({
            msg: res.data.msg,
            status: res.status,
            isGood: res.data.isGood
          });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw handleCallbackError(err);
        });
    },

    /** @description Check if user is eligible to edit a review or not (maybe suace is private or do not have a review to edit)
     *  @param {Object} data data object
     *    @param {string} data.sauce.slug unique sauce string
     *  @returns {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {IErrReturn} error message
     */
    canUserEdit: ({
      data
    }: {
      data: {
        sauce: { slug: string };
      };
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/review/canuseredit`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // Throw error in handle-able format
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw handleCallbackError(err);
        });
    }
  },

  image: {
    /** @description Get the URL paths to avatars
     *  @param {Object} data data object
     *    @param {string} data.user.token user's unique token
     *    @param {IReview} data.review - review info
     *  @return {AxiosPromise} AxiosPromise
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {String[]} res.data.urls[] - Array of paths
     *
     *  @reject {String} error message
     */
    getAvatarURLs: (data: { user: { token: string } }): AxiosPromise => {
      return axios
        .post(`${host}/api/images/getAvatars`, data)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        });
    }
  },

  types: {
    /** @description Get all types of sauces
     *  @returns {Promise} promise
     *  @resolves {String[]} array of types of sauces
     *  @reject {IErrReturn} handleable error object
     */
    getTypes: (): Promise<string[] | IErrReturn> => {
      return axios
        .get(`${host}/api/types/getTypes`)
        .then(res => {
          if (res.data.isGood) {
            return res.data.types;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw handleCallbackError(err);
        });
    }
  },

  admin: {
    /** @description Get all unapproved sauces
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  {Object[]} res.data.sauces - Array of sauces
     *
     *  {Number} res.data.count - how many sauces are in DB
     *
     *  @reject {IErrReturn} handleable error object
     */
    getUnapproved: (): AxiosPromise => {
      return axios
        .post(`${host}/api/admin/sauces/unapproved`)
        .then((res: any) => {
          if (res.data.isGood) {
            return res;
          }

          // If not good, throw an error
          throw Err({ msg: res.data.msg, status: res.status });
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw handleCallbackError(err);
        });
    },

    /** @description Approve of a single sauce
     *  @param {Object} data data object
     *    @param {Number} data.sauce.sauceID - sauce id
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {IErrReturn} handleable error object
     */
    approveSauce: ({
      data
    }: {
      data: {
        sauce: { sauceID: number };
      };
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/admin/sauces/aprove`, data)
        .then((res: any) => {
          return res;
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw handleCallbackError(err);
        });
    },

    /** @description Decline a single sauce
     *  @param {Object} data data object
     *    @param {Number} data.sauce.sauceID - sauce id
     *  @resolves {Object} res.data - relevant info to request
     *
     *  {Boolean} res.data.isGood - whether request was good or not
     *
     *  @reject {IErrReturn} handleable error object
     */
    declineSauce: ({
      data
    }: {
      data: {
        sauce: { sauceID: number };
      };
    }): AxiosPromise => {
      return axios
        .post(`${host}/api/admin/sauces/decline`, data)
        .then((res: any) => {
          return res;
        })
        .catch((err: any) => {
          // Throw error in handle-able format
          throw handleCallbackError(err);
        });
    }
  }
};

/** @description Handle API callback errors
 *  @param {any} error error handler
 *  @returns {IErrReturn} standard return object
 */
function handleCallbackError(error: any): IErrReturn {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return Err({
      msg:
        error.response.data.msg ||
        "Could not connect to server. Please try again",
      isGood: error.response.data.isGood || false,
      status: error.response.status
    });
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return Err({
      msg: "Could not connect to server. Please try again",
      isGood: false,
      status: 500
    });
  } else {
    // Something happened in setting up the request that triggered an Error
    return Err({
      msg: "Issue while making request to server. Please try again.",
      isGood: false,
      status: 300
    });
  }
}
