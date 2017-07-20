class Auth {
  //set local storage w/ token and datetime
  static authenticateUser(token) {
    const key = { token, timestamp: new Date().getTime() };
    localStorage.setItem("key", JSON.stringify(key));
  }

  //check if token exists and hasn't expired
  static isUserAuthenticated() {
    // if token doesn't exist, return false here
    if (!localStorage.getItem("key")) return false;

    //set timelimit for token in minutes
    const timeLimit = 60;

    //get key time or return false if timestamp doesn't exist inside of key
    const keyTime = JSON.parse(localStorage.getItem("key")).timestamp;
    if (!keyTime) return false;

    //get current time
    const curTime = new Date().getTime().toString();

    //compare times and round to minutes
    const diffInMinutes = Math.round(
      (parseInt(curTime) - parseInt(keyTime)) / 60000
    );

    //token is good, update token and return true
    if (diffInMinutes < timeLimit) {
      this.updateUserToken();
      return true;
    } else {
      //token exists but is old, should remove
      this.deauthenticateUser();
      return false;
    }

  }

  //update existing token
  //should ONLY be called from isUserAuthenticated so will
  //not be doing same sanity checks as above
  static updateUserToken() {
    const key = {
      token: JSON.parse(localStorage.getItem("key")).token,
      timestamp: new Date().getTime()
    };
    localStorage.setItem("key", JSON.stringify(key));
    return true;
  }

  //remove authentication token
  static deauthenticateUser() {
    //if exists, remove
    if (localStorage.getItem("key")) {
      localStorage.removeItem("key");
    }
  }

  //return authentication token
  static getToken() {
    //if exists, send back
    if (localStorage.getItem("key")) {
      return JSON.parse(localStorage.getItem("key")).token || null;
    }
    return null;
  }
}

export default Auth;
