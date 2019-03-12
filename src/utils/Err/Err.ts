const DEFAULT_MSG =
  "Something wasn't configured correctly. Please make sure your form is filled out entirely and try again.";

class Err {
  // set local storage w/ token and datetime
  public static getError({ err }: { err: any }): string {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return err.response.status === 401 ? err.response.data.msg : DEFAULT_MSG;
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return "Network error - Please try again";
    } else {
      // Something happened in setting up the request that triggered an Error
      return DEFAULT_MSG;
    }
  }
}

export default Err;
