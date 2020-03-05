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
import { ISauce, SaucesParams } from "../../redux/sauces/types";
import { useRouter, NextRouter } from "next/router";

export interface SaucesProps {
  location: { search: string };
  sauces?: ISauce[];
  getSaucesByQuery: ({ query }: { query?: string }) => Promise<null>;
  count?: number;
  page?: number;
  order?: string;
  history: { push: (location: string) => null };
}

export interface SaucesState {
  page: number;
  limit: number;
  order: string;
  type: string;
  minPage: number;
  maxPage: number;
  total: number;
  srch?: string;
}

// Constants
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT_COUNT = 15;
const DEFAULT_ORDER = "newest";
const DEFAULT_TYPE = "all";
const DEAFULT_MIN_PAGE = 1;
const DEFAULT_MAX_PAGE = 10;
const DEFAULT_TOTAL = 50;
const MAX_SRCH_LENGTH = 20;

const Sauces: React.SFC<SaucesProps> = props => {
  // assign state
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [limit, setLimit] = React.useState(DEFAULT_LIMIT_COUNT);
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [type, setType] = React.useState(DEFAULT_TYPE);
  const [srch, setSrch] = React.useState(DEFAULT_TYPE);
  const [count, setCount] = React.useState(0);
  const [queryString, setQueryString] = React.useState("");
  const sauces = useSelector((store: AppState) => {
    // check for query object
    if (!store.sauces.query) {
      return [];
    }

    // check for values
    if (Object.keys(store.sauces.query).length === 0) {
      return [];
    }

    // check for value of interest
    if (!store.sauces.query[queryString]) {
      return [];
    }

    // return value of interest
    return store.sauces.query[queryString].sauces;
  });
  console.log(sauces);
  const [minPage, setMinPage] = React.useState(DEAFULT_MIN_PAGE);
  const [maxPage, setMaxPage] = React.useState(DEFAULT_MAX_PAGE);
  const [total, setTotal] = React.useState(DEFAULT_TOTAL);

  // assign router
  const router = useRouter();
  // assign dispatch
  const dispatch = useDispatch();

  React.useEffect(() => {
    // grab and validate params from URL
    const tmp: SaucesParams = getParamsFromPath({
      router
    });

    // construct query string
    let query = `limit=${tmp.limit}&order=${tmp.order}&page=${tmp.page}&type=${tmp.type}`;
    if (tmp.srch) {
      query += `&srch=${tmp.srch}`;
    }

    // update state
    setPage(tmp.page);
    setLimit(tmp.limit);
    setOrder(tmp.order);
    setType(tmp.type);
    setSrch(tmp.srch || "");
    setQueryString(query);

    // Move screen to top
    window.scrollTo(0, 0);
  }, [router.pathname]);

  // Call every time our queryString changes
  React.useEffect(() => {
    // If we don't have sauces, go look for them!
    if (sauces.length === 0) {
      // Construct query string

      // Call API
      dispatch(getSaucesByQuery({ query: queryString }));
    }
  }, [queryString]);

  // public componentWillReceiveProps(props: SaucesProps) {
  //   // Going to compare current page vs page in URL
  //   const { page, limit, order, type, srch }: SaucesParams = getParamsFromPath({
  //     path: props.location.search
  //   });
  //   const {
  //     page: pageFromState,
  //     limit: limitFromState,
  //     order: orderFromState,
  //     type: typeFromState,
  //     srch: srchFromState
  //   } = this.state;

  //   // Update and call API if anything has changed
  //   if (
  //     page !== pageFromState ||
  //     limit !== limitFromState ||
  //     order !== orderFromState ||
  //     type !== typeFromState ||
  //     srch !== srchFromState
  //   ) {
  //     // Construct query string
  //     let query = `limit=${limit}&order=${order}&page=${page}&type=${type}`;
  //     if (srch) query += `&srch=${srch}`;
  //     // Call API
  //     this.props.getSaucesByQuery({ query }).catch(err => console.log(err));

  //     this.setState({ ...this.state, page, limit, order, type, srch });
  //   }

  //   window.scrollTo(0, 0); // Move screen to top
  // }

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
                  {/* <StyledCard
                    title={sauce.name}
                    imageLink={`${sauce.photo}`}
                    description={sauce.description}
                    to={`/sauce?s=${sauce.slug}`}
                  /> */}
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
          <Pagination total={count} page={page} limit={limit} range={3} />
        )}
      </StyledArticle>
      <Footer />
    </div>
  );

  function onSubmit() {
    // Get any params from path
    const params: SaucesParams = getParamsFromPath({
      router
    });

    // Construct query string
    let query = `/sauces?limit=${limit}&order=${order}&page=${params.page}&type=${type}`;
    if (srch) query += `&srch=${srch}`;

    // Go to new page
    router.push(query);
  }
};

// function mapStateToProps(state: AppState, myProps: any): any {
//   // Get path params
//   const { limit, order, page, type, srch } = getParamsFromPath({
//     path: myProps.location.search
//   });

//   // Construct key string
//   let key = `limit=${limit}&order=${order}&page=${page}&type=${type}`;
//   if (srch) key += `&srch=${srch}`;

//   // Get query and sanity check
//   const { query } = state.sauces;
//   if (!query || Object.keys(query).length === 0) {
//     return {};
//   }

//   // Make sure we have a query[key]
//   if (!query[key]) {
//     return {};
//   }

//   // Find the sauces we will render by first getting the array of slugs
//   const sauceSlugs2Render: string[] = query ? query[key].sauces : [];

//   // Make sure we have something to work with
//   if (!sauceSlugs2Render || sauceSlugs2Render.length === 0) return {};

//   // Make sure our store has content
//   const bySlug = state.sauces.bySlug ? state.sauces.bySlug : {};
//   if (!bySlug) return {};

//   // Find actual sauces
//   const sauces = sauceSlugs2Render
//     ? sauceSlugs2Render.map(slug => {
//         return bySlug[slug];
//       })
//     : [];

//   // Make sure we found the sauces
//   if (sauces.length === 0) return {};

//   return {
//     sauces,
//     count: query[key].total,
//     page: page || 1
//   };
// }

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
// const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
//   getSaucesByQuery: ({ query }: { query: string }) =>
//     dispatch(getSaucesByQuery({ query }))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Sauces);
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
