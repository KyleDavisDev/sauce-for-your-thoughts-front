class Utils {
  /** @description Checks if input is an array or not
   *  @param {any} input any input
   *  @returns {Boolean} true if is an array else false
   */
  public static isArray(input: any) {
    return Object.prototype.toString.call(input) === "[object Array]";
  }

  /** @description Checks if input is an object or not
   *  @param {any} input any input
   *  @returns {Boolean} true if is an object else false
   */
  public static isObject(input: any) {
    return Object.prototype.toString.call(input) === "[object Object]";
  }

  /** @description Checks if input is an string or not
   *  @param {any} input any input
   *  @returns {Boolean} true if is an string else false
   */
  public static isString(input: any) {
    return Object.prototype.toString.call(input) === "[object String]";
  }

  /** @description Checks if input is an number or not
   *  @param {any} input any input
   *  @returns {Boolean} true if is an number else false
   */
  public static isNumber(input: any) {
    return Object.prototype.toString.call(input) === "[object Number]";
  }

  /** @description Converts PascalCase JSON to camelCase
   *  @param {any} o - array/obj/string/etc
   *  @return {any} o - camelCased'd o
   */
  public static toCamel(o: any): any {
    let newO: any;
    let origKey: any;
    let newKey: any;
    let value: any;
    if (o instanceof Array) {
      return o.map(val => {
        if (typeof val === "object") {
          return Utils.toCamel(val);
        }
        return val;
      });
    } else {
      newO = {};
      for (origKey in o) {
        if (o.hasOwnProperty(origKey)) {
          // This will allow a key that is ALL uppercase to remain ALL uppercase
          if (origKey === origKey.toUpperCase()) {
            newKey = origKey.toString();
          } else {
            // Else camel case
            newKey = (
              origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
            ).toString();
          }
          value = o[origKey];
          if (
            value instanceof Array ||
            (value !== null && value.constructor === Object)
          ) {
            return Utils.toCamel(value);
          }
          newO[newKey] = value;
        }
      }
    }
    return newO;
  }
}

export default Utils;
