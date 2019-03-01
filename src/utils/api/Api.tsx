import axios, { AxiosPromise } from "axios";
import { IRegisterUser, ILoginUser } from "../../redux/users/types";
import { IReview } from "../../redux/reviews/types";

export const host =
  process.env.API_ENV === "prod"
    ? "https://sauceforyourthoughts.com"
    : "http://localhost:7777";

export const API = {
  user: {
    register: (credentials: IRegisterUser): AxiosPromise =>
      axios.post(`${host}/api/user/register`, credentials).then(res => {
        if (res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      }),
    login: (credentials: ILoginUser): AxiosPromise =>
      axios.post(`${host}/api/user/login`, credentials).then(res => {
        if (res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      })
  },
  sauce: {
    add: ({ formData }: { formData: FormData }): AxiosPromise => {
      return axios
        .post(`${host}/api/sauce/add`, formData, {
          headers: {
            "content-type": `multipart/form-data`
          }
        })
        .then(res => {
          if (res.data.isGood && res.status === 200) {
            return res.data;
          }
          throw new Error(res.data.msg);
        });
    }
  },
  review: {
    add: (data: { user: { token: string }; review: IReview }): AxiosPromise =>
      axios.post(`${host}/api/review/add`, data).then(res => {
        if (res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      })
  }
};
