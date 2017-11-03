import axios from "axios";

export default {
  user: {
    login: credentials => {
      return axios
        .post("http://localhost:7777/login", credentials)
        .then(res => {
          if (res.data.isGood) {
            return res.data.token;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    register: credentials => {
      return axios
        .post("http://localhost:7777/register", credentials)
        .then(res => {
          if (res.data.isGood) {
            return res.data.token;
          } else {
            throw new Error(res.data.msg);
          }
        });
    }
  },
  store: {}
};
