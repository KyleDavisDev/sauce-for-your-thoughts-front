class Auth {
  // set local storage w/ token and datetime
  public static authenticateUser({
    token,
    displayName
  }: {
    token: string;
    displayName: string;
  }) {
    const timestamp: number = new Date().getTime();
    const sfytKey = { token, timestamp, displayName };
    localStorage.setItem("sfytKey", JSON.stringify(sfytKey));
  }

  // check if token exists and hasn't expired
  public static isUserAuthenticated(): boolean {
    // Grab key
    const sfytKey: string | null = localStorage.getItem("sfytKey");

    // if token doesn't exist, stop
    if (sfytKey === null) return false;

    // if timestamp doesn't exist inside of key, stop
    const keyTime: string = JSON.parse(sfytKey).timestamp;
    if (!keyTime) return false;

    // set timelimit, in minutes, for token in minutes
    const timeLimit: number = 60 * 24 * 3; // three days

    // get current time
    const curTime: string = new Date().getTime().toString();

    // compare times and round to minutes
    const diffInMinutes: number = Math.round(
      (parseInt(curTime, 10) - parseInt(keyTime, 10)) / 60000
    );

    // token hasn't expired yet, update token and return true
    if (diffInMinutes < timeLimit) {
      return this.updateUserToken();
    } else {
      // token exists but is old, should remove
      this.deauthenticateUser();
      return false;
    }
  }

  // remove authentication token
  public static deauthenticateUser() {
    // if exists, remove
    if (localStorage.getItem("sfytKey")) {
      localStorage.removeItem("sfytKey");
    }
  }

  // return authentication token
  public static getToken(): undefined | string {
    // Grab key
    const sfytKey: string | null = localStorage.getItem("sfytKey");

    // if exists, send back
    if (sfytKey !== null) {
      return JSON.parse(sfytKey).token || null;
    }
    return undefined;
  }

  // Return name
  public static getName(): undefined | string {
    // Grab key
    const sfytKey: string | null = localStorage.getItem("sfytKey");

    // if exists, send back
    if (sfytKey !== null) {
      return JSON.parse(sfytKey).displayName || null;
    }
    return undefined;
  }

  // update existing token
  // should ONLY be called from isUserAuthenticated so will
  // not be doing same sanity checks as above
  private static updateUserToken(): boolean {
    // Grab key
    const sfytKey: string | null = localStorage.getItem("sfytKey");

    // Make sure we have key
    if (sfytKey === null) return false;

    // grab token and displayName
    const {
      token,
      displayName
    }: { token: string | null; displayName: string | null } = JSON.parse(
      sfytKey
    );

    // Make sure we have token
    if (token === null) return false;

    // make sure token is string and not empty
    if (
      Object.prototype.toString.call(token) === "[object String]" &&
      token.length > 0
    ) {
      // apply new time to key
      const key = {
        token,
        timestamp: new Date().getTime(),
        displayName
      };
      // set key
      localStorage.setItem("sfytKey", JSON.stringify(key));
      return true;
    } else {
      // remove local storage item
      this.deauthenticateUser();
      return false;
    }
  }
}

export default Auth;
