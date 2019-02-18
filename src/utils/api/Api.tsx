import axios, { AxiosPromise } from "axios";
import { IRegisterUser, ILoginUser } from "../../redux/users/types";

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
    add: (formData: FormData): AxiosPromise =>
      axios.post(`${host}/api/sauce/add`).then(res => {
        if (res.data.isGood && res.status === 200) {
          return res.data;
        }
        throw new Error(res.data.msg);
      })
  }
};
