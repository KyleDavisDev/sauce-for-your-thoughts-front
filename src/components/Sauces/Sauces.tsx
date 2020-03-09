import * as React from "react";

import { getSaucesByQuery } from "../../redux/sauces/actions";
import FilterBar from "./components/FilterBar/FilterBar";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import PageTitle from "../../components/PageTitle/PageTitle";
import Pagination from "./components/Pagination/Pagination";
import TopBar from "../../components/TopBar/TopBar";
import {
  StyledArticle,
  StyledCardContainer,
  StyledCardHolder,
  StyledCard
} from "./SaucesStyles";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/configureStore";
import { reduxStore } from "../../redux/with-redux-store";
import { SaucesParams } from "../../redux/sauces/types";
import { useRouter, NextRouter } from "next/router";

export interface SaucesProps {}

export interface SaucesState {}

// defaults
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT_COUNT = 15;
const DEFAULT_ORDER = "newest";
const DEFAULT_TYPE = "all";
const DEAFULT_MIN_PAGE = 1;
const DEFAULT_MAX_PAGE = 10;
const MAX_SRCH_LENGTH = 20;

const Sauces: React.SFC<SaucesProps> = props => {
  // assign state
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [limit, setLimit] = React.useState(DEFAULT_LIMIT_COUNT);
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [type, setType] = React.useState(DEFAULT_TYPE);
  const [srch, setSrch] = React.useState(DEFAULT_TYPE);
  const [queryString, setQueryString] = React.useState("");
  const [minPage, setMinPage] = React.useState(DEAFULT_MIN_PAGE);
  const [maxPage, setMaxPage] = React.useState(DEFAULT_MAX_PAGE);
  // const [total, setTotal] = React.useState(DEFAULT_TOTAL);

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
    const total = query[queryString].total;
    return [completeSauces, total];
  });

  // assign router
  const router = useRouter();
  // assign dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();

  // Call everytime the path changes
  React.useEffect(() => {
    // 1. Grab and validate params from URL
    const tmp: SaucesParams = getParamsFromPath({
      router
    });

    // 2. construct query string
    let query = `limit=${tmp.limit}&order=${tmp.order}&page=${tmp.page}&type=${tmp.type}`;
    if (tmp.srch) {
      query += `&srch=${tmp.srch}`;
    }

    // 3. update state
    setPage(tmp.page);
    setLimit(tmp.limit);
    setOrder(tmp.order);
    setType(tmp.type);
    setSrch(tmp.srch || "");
    setQueryString(query);

    // 4. Move screen to top
    window.scrollTo(0, 0);
    window.focus();
  }, [router.asPath]);

  // Call every time our queryString changes
  React.useEffect(() => {
    // declare async function
    async function getSauces() {
      try {
        await useThunkDispatch(getSaucesByQuery({ query: queryString }));
      } catch (err) {}
    }

    // Check if we already have sauces or not
    if (sauces.length === 0) {
      // Trigger redux action which will go look for sauces
      getSauces();
    }
  }, [queryString]);

  // assign count
  const count = sauces.length;
  return (
    <div>
      <TopBar />
      <Navigation />
      <StyledArticle>
        <PageTitle>Sauces</PageTitle>
        <FilterBar
          onSubmit={onSubmit}
          typeFromPath={type}
          orderFromPath={order}
          limitFromPath={limit}
          srchFromPath={srch}
        />
        <StyledCardContainer>
          {sauces.length > 0 ? (
            sauces.map((sauce, ind) => {
              return (
                <StyledCardHolder key={ind}>
                  <StyledCard
                    title={sauce.name}
                    imageLink={`${sauce.photo}`}
                    description={sauce.description}
                    to={`/sauce?s=${sauce.slug}`}
                  />
                </StyledCardHolder>
              );
            })
          ) : (
            <p>
              Could not find any sauces! Try adjusting the items in the filter
              bar to find your perfect sauce.
            </p>
          )}
        </StyledCardContainer>
        {count > 0 && (
          <Pagination total={total} page={page} limit={limit} range={3} />
        )}
      </StyledArticle>
      <Footer />
    </div>
  );

  function onSubmit({ type, order, limit, srch }) {
    // Construct query string
    let query = `/sauces?limit=${limit}&order=${order}&page=${1}&type=${type}`;
    if (srch) query += `&srch=${srch}`;

    // Go to new page
    router.push(query);
  }
};

export default Sauces;

/** @description Parse the path location string into components we can comprehend
 *  @param {String} path string with parsable params
 *  @returns {Number} limit - # of sauces per page
 *  @returns {String} order - how the sauces should be sorted
 *  @returns {Number} page - current page
 *  @returns {string} type - which sauces should be returned
 *  @returns {string?} srch - filter for name
 */
function getParamsFromPath({ router }: { router: NextRouter }): SaucesParams {
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
