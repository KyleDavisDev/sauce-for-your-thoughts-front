import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NextRouter } from "next/router";
import { AppState } from "../../redux/configureStore";
import { reduxStore } from "../../redux/with-redux-store";
import useParamsFromPath from "./useParamsFromPath";
import { SaucesParams, ISauce } from "../../redux/sauces/types";
import { getSaucesByQuery } from "../../redux/sauces/actions";

/** @description Return sauces from redux store and, if needed, call out to database to fetch sauces
 *  @param {NextRouter} router router object
 *  @returns {ISauce[]} sauces - arrray of sauce objects
 *  @returns {Boolean} loading - whether or not we are waiting for sauces to load
 *  @returns {Number} total - how many sauces, in total, fit within the router criteria
 */
export default function useSauces({
  router
}: {
  router: NextRouter;
}): { sauces: ISauce[]; loading: boolean; total: number } {
  // assign state
  const [loading, setLoading] = React.useState(false);
  const [queryString, setQueryString] = React.useState("");

  // assign dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();

  // grab sauces from redux store
  const [sauces, total] = useSelector((store: AppState) => {
    // Grab for convenience later
    const { bySlug, query } = store.sauces;

    // 1. Check for undefined query object, make sure query object has values,
    // and undefined bySlug object is truthy
    if (!query || Object.keys(query).length === 0 || !bySlug) {
      return [[], 0];
    }

    // 2. Confirm we have slugs within our query object for the current queryString
    if (!query[queryString]) {
      return [[], 0];
    }

    // 3. Return the total sauce object for each sauce slug and how many sauces fit our query
    const completeSauces = query[queryString].sauces.map(slug => {
      return bySlug[slug];
    });
    return [completeSauces, query[queryString].total];
  });

  // Call everytime the path changes. This may or may not cause queryString to update which
  // will trigger another effect
  React.useEffect(() => {
    // 1. Grab and validate params from URL
    const tmp: SaucesParams = useParamsFromPath({
      router
    });

    // 2. construct query string
    let query = `limit=${tmp.limit}&order=${tmp.order}&page=${tmp.page}&type=${tmp.type}`;
    if (tmp.srch) {
      query += `&srch=${tmp.srch}`;
    }

    // 3. update state (will force next effect)
    setQueryString(query);
  }, [router.asPath]);

  // Call every time our queryString changes
  React.useEffect(() => {
    // declare async function
    async function getSauces() {
      try {
        setLoading(true);
        await useThunkDispatch(getSaucesByQuery({ query: queryString }));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }

    // Check if we already have sauces or not
    if (sauces.length === 0 && queryString) {
      // Trigger redux action which will go look for sauces
      getSauces();
    }
  }, [queryString]);

  return { sauces, loading, total };
}
