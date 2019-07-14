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
}

export default Utils;
