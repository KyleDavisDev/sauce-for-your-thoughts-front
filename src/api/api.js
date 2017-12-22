import axios from "axios";

export default {
  user: {
    login: credentials => {
      return axios
        .post("http://localhost:7777/login", credentials)
        .then(res => {
          if (res.data.isGood) {
            return res.data;
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
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    getInfo: credentials => {
      return axios
        .post("http://localhost:7777/api/user/getInfo", credentials)
        .then(res => {
          if (res.status === 200 && res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    update: credentials => {
      return axios
        .post("http://localhost:7777/account/update", credentials)
        .then(res => {
          if (res.status === 200 && res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    },
    isLoggedIn: credentials => {
      return axios
        .post("http://localhost:7777/user/isloggedin", credentials)
        .then(res => {
          if (res.status === 200 && res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    }
  },
  store: {
    add: data => {
      return axios
        .post("http://localhost:7777/api/store/add", data, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.isGood) {
            return res.data;
          } else {
            throw new Error(res.data.msg);
          }
        });
    }
  },
  stores: {
    get: range => {
      return axios.get("http://localhost:7777/api/stores/get").then(res => {
        if (res.data.isGood) {
          return res.data;
        } else {
          throw new Error(res.data.msg);
        }
      });
    }
  }
};
