import queryString, { OutputParams } from "query-string";

import { SaucesParams } from "../../redux/sauces/types";

// Constants
const DEFAULT_LIMIT_COUNT = 15;
const DEFAULT_PAGE = 1;
const DEFAULT_TYPE = "all";
const DEFAULT_ORDER = "newest";

class Utils {
  /** @description Parse the path location string into components we can comprehend
   *  @param {String} path string with parsable params
   *  @returns {Number} limit - # of sauces per page
   *  @returns {String} order - how the sauces should be sorted
   *  @returns {Number} page - current page
   *  @returns {type} type - which sauces should be returned
   */
  public static getParamsFromPath({ path }: { path: string }): SaucesParams {
    // Get values from string
    const values: OutputParams = queryString.parse(path);

    let page: number;
    // Make sure page is not undefined or an array
    if (values.page && !Array.isArray(values.page)) {
      // Make sure it's a valid number
      page = parseInt(values.page, 10);
    } else {
      page = DEFAULT_PAGE; // set default
    }

    let limit: number;
    // Make sure limit is not undefined or an array
    if (values.limit && !Array.isArray(values.limit)) {
      // Make sure it's a valid number
      limit = parseInt(values.limit, 10);
      limit = limit < 0 ? 1 : limit;
    } else {
      limit = DEFAULT_LIMIT_COUNT; // set default
    }

    const type: string =
      values.type && !Array.isArray(values.type) ? values.type : DEFAULT_TYPE;

    const order: string =
      values.order && !Array.isArray(values.order)
        ? values.order
        : DEFAULT_ORDER;

    return { limit, order, page, type };
  }

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
