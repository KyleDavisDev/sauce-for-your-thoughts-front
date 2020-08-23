import { NextRouter } from "next/router";
import { SaucesParams } from "../../redux/sauces/types";

// defaults
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT_COUNT = 15;
const DEFAULT_ORDER = "newest";
const DEFAULT_TYPE = "all";
const MAX_SRCH_LENGTH = 20;

/** @description Parse the path location string into components we can comprehend
 *  @param {NextRouter} router router object
 *  @returns {Number} limit - # of sauces per page
 *  @returns {String} order - how the sauces should be sorted
 *  @returns {Number} page - current page
 *  @returns {string} type - which sauces should be returned
 *  @returns {string?} srch - filter for name
 */
export default function useParamsFromPath({
  router
}: {
  router: NextRouter;
}): SaucesParams {
  // Get values from string
  const values = router.query;

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
    values.type && !Array.isArray(values.type)
      ? values.type.toLowerCase()
      : DEFAULT_TYPE;

  const order: string =
    values.order && !Array.isArray(values.order)
      ? values.order.toLowerCase()
      : DEFAULT_ORDER;

  const srch =
    values.srch &&
    !Array.isArray(values.srch) &&
    values.srch.length < MAX_SRCH_LENGTH
      ? values.srch.toLowerCase()
      : undefined;

  return { limit, order, page, type, srch };
}
