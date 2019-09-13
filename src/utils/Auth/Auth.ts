class Auth {
  // set local storage w/ token and datetime
  public static authenticateUser({
    token,
    displayName,
    avatarURL,
    isAdmin
  }: {
    token: string;
    displayName: string;
    avatarURL: string;
    isAdmin: boolean;
  }) {
    const timestamp: number = new Date().getTime();
    const sfytKey = { token, timestamp, displayName, avatarURL, isAdmin };
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
      return this.updateTimestamp();
    } else {
      // token exists but is old, should remove
      this.deauthenticateUser();
      return false;
    }
  }

  // check if user is an admin or not
  public static isAdmin(): boolean {
    // Grab key
    const sfytKey: string | null = localStorage.getItem("sfytKey");

    // if token doesn't exist, stop
    if (sfytKey === null) return false;

    return JSON.parse(sfytKey).isAdmin || false;
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

  // Return avatarURL
  public static getAvatarURL(): undefined | string {
    // Grab key
    const sfytKey: string | null = localStorage.getItem("sfytKey");

    // if exists, send back
    if (sfytKey !== null) {
      return JSON.parse(sfytKey).avatarURL || null;
    }
    return undefined;
  }

  // Update a displayName
  public static updateDisplayName(displayName: string): boolean {
    // Grab key
    const sfytKey: string | null = localStorage.getItem("sfytKey");

    // Make sure we have key
    if (sfytKey === null) {
      // remove local storage item
      this.deauthenticateUser();
      return false;
    }

    // apply new time to key
    const key = { ...JSON.parse(sfytKey), displayName };
    // set key
    localStorage.setItem("sfytKey", JSON.stringify(key));
    return true;
  }

  // Update a token
  public static updateToken(token: string): boolean {
    // Quick sanity check
    if (!token) return false;

    // Grab key
    const sfytKey: string | null = localStorage.getItem("sfytKey");

    // Make sure we have key
    if (sfytKey === null) {
      // remove local storage item
      this.deauthenticateUser();
      return false;
    }

    // apply new time to key
    const key = { ...JSON.parse(sfytKey), token };
    // set key
    localStorage.setItem("sfytKey", JSON.stringify(key));
    return true;
  }

  // Update avatar
  public static updateAvatar(avatarURL: string): boolean {
    // Quick sanity check
    if (!avatarURL) return false;

    // Grab key
    const sfytKey: string | null = localStorage.getItem("sfytKey");

    // Make sure we have key
    if (sfytKey === null) {
      // remove local storage item
      this.deauthenticateUser();
      return false;
    }

    // apply new time to key
    const key = { ...JSON.parse(sfytKey), avatarURL };
    // set key
    localStorage.setItem("sfytKey", JSON.stringify(key));
    return true;
  }

  // update existing token
  // should ONLY be called from isUserAuthenticated so will
  // not be doing same sanity checks as above
  private static updateTimestamp(): boolean {
    // Grab key
    const sfytKey: string | null = localStorage.getItem("sfytKey");

    // Make sure we have key
    if (sfytKey === null) return false;

    // grab values from key
    const {
      token,
      displayName,
      avatarURL
    }: { token: string; displayName: string; avatarURL: string } = JSON.parse(
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
        displayName,
        avatarURL
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
