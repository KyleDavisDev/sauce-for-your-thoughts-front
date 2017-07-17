{
  /*Javascript makes checking between an object and an array incredibly*/
  /*difficult to be 100% but this method seems to work*/
  /*For more info:*/
  /*https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/*/
}
class Checker {
  //return bool of if input is an array or not
  static isArray(input) {
    return Object.prototype.toString.call(input) === "[object Array]";
  }

  //return bool of if input is object or not
  static isObject(input) {
    return Object.prototype.toString.call(input) === "[object Object]";
  }

  //return bool if input is string or not
  static isString(input) {
    return Object.prototype.toString.call(input) === "[object String]";
  }
}

export default Checker;
