import axios from "axios";

export default {
  user: {
    login: credentials => {
      return axios
        .post("http://localhost:7777/login", credentials)
        .then(res => {
          return res.data.token;
        })
        .catch(err => console.log(err));
    }
  }
};
