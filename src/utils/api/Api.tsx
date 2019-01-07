import axios from "axios";
import { IRegisterUser } from "../../redux/users/types";

export const host =
  process.env.API_ENV === "prod"
    ? "https://sauceforyourthoughts.com"
    : "http://localhost:7777";

export const API = {
  user: {
    register: (credentials: IRegisterUser) =>
      axios.post(`${host}/api/user/register`, credentials).then(res => {
        console.log(res);
        if (res.data.isGood) {
          return res.data;
        }
        throw new Error(res.data.msg);
      })
  }
};
