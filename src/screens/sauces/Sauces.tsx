import * as React from "react";
import queryString, { OutputParams } from "query-string";

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
import { connect } from "react-redux";
import { AppState, MyThunkDispatch } from "../../redux/configureStore";
import { ISauce, SaucesParams } from "../../redux/sauces/types";

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
const DEFAULT_LIMIT_COUNT = 15;
const DEFAULT_PAGE = 1;
const DEFAULT_TYPE = "all";
const DEFAULT_ORDER = "newest";
const MAX_SRCH_LENGTH = 20;

class Sauces extends React.Component<SaucesProps, SaucesState> {
  constructor(props: SaucesProps) {
    super(props);

    this.state = {
      page: DEFAULT_PAGE,
      limit: DEFAULT_LIMIT_COUNT,
      order: DEFAULT_ORDER,
      type: DEFAULT_TYPE,
      minPage: 1,
      maxPage: 10, // Will update this value from API
      total: 52 // Will update this value from API
    };
  }

  public componentDidMount() {
    const { page, limit, order, type, srch }: SaucesParams = getParamsFromPath({
      path: this.props.location.search
    });

    window.scrollTo(0, 0); // Move screen to top

    // If we don't have sauces, go look for them!
    if (!this.props.sauces) {
      // Construct query string
      let query = `limit=${limit}&order=${order}&page=${page}&type=${type}`;
      if (srch) query += `&srch=${srch}`;

      // Call API
      this.props.getSaucesByQuery({ query }).catch(err => console.log(err));

      this.setState({ ...this.state, page, limit, order, type, srch });
    }
  }

  public componentWillReceiveProps(props: SaucesProps) {
    // Going to compare current page vs page in URL
    const { page, limit, order, type, srch }: SaucesParams = getParamsFromPath({
      path: props.location.search
    });
    const {
      page: pageFromState,
      limit: limitFromState,
      order: orderFromState,
      type: typeFromState,
      srch: srchFromState
    } = this.state;

    // Update and call API if anything has changed
    if (
      page !== pageFromState ||
      limit !== limitFromState ||
      order !== orderFromState ||
      type !== typeFromState ||
      srch !== srchFromState
    ) {
      // Construct query string
      let query = `limit=${limit}&order=${order}&page=${page}&type=${type}`;
      if (srch) query += `&srch=${srch}`;
      // Call API
      this.props.getSaucesByQuery({ query }).catch(err => console.log(err));

      this.setState({ ...this.state, page, limit, order, type, srch });
    }

    window.scrollTo(0, 0); // Move screen to top
  }

  public render() {
    // Assign for convenience later
    const sauces = this.props.sauces ? this.props.sauces : [];
    const count = this.props.count || 0;
    const page = this.props.page || 1;
    const limit = this.state.limit;
    const srch = this.state.srch;

    return (
      <div>
        <TopBar />
        <Navigation />
        <StyledArticle>
          <PageTitle>Sauces</PageTitle>
          <FilterBar
            onSubmit={this.onSubmit}
            typeFromPath={this.state.type}
            orderFromPath={this.state.order}
            limitFromPath={this.state.limit}
            srchFromPath={this.state.srch}
          />
          <StyledCardContainer>
            {sauces.length > 0 &&
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
              })}
          </StyledCardContainer>
          {count > 0 && (
            <Pagination total={count} page={page} limit={limit} range={3} />
          )}
        </StyledArticle>
        <Footer />
      </div>
    );
  }

  private onSubmit = ({
    type,
    order,
    limit
  }: {
    type: string;
    order: string;
    limit: string;
  }) => {
    // Get any params from path
    const params: SaucesParams = getParamsFromPath({
      path: this.props.location.search
    });

    // Construct query string
    let query = `/sauces?limit=${limit}&order=${order}&page=${
      params.page
    }&type=${type}`;
    if (params.srch) query += `&srch=${params.srch}`;

    // Go to new page
    this.props.history.push(query);
  };
}

function mapStateToProps(state: AppState, myProps: any): any {
  // Get path params
  const { limit, order, page, type, srch } = getParamsFromPath({
    path: myProps.location.search
  });

  // Construct key string
  let key = `limit=${limit}&order=${order}&page=${page}&type=${type}`;
  if (srch) key += `&srch=${srch}`;

  // Get query and sanity check
  const { query } = state.sauces;
  if (!query || Object.keys(query).length === 0) {
    return {};
  }

  // Make sure we have a query[key]
  if (!query[key]) {
    return {};
  }

  // Find the sauces we will render by first getting the array of slugs
  const sauceSlugs2Render: string[] = query ? query[key].sauces : [];

  // Make sure we have something to work with
  if (!sauceSlugs2Render || sauceSlugs2Render.length === 0) return {};

  // Make sure our store has content
  const bySlug = state.sauces.bySlug ? state.sauces.bySlug : {};
  if (!bySlug) return {};

  // Find actual sauces
  const sauces = sauceSlugs2Render
    ? sauceSlugs2Render.map(slug => {
        return bySlug[slug];
      })
    : [];

  // Make sure we found the sauces
  if (sauces.length === 0) return {};

  return {
    sauces,
    count: query[key].total,
    page: page || 1
  };
}

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  getSaucesByQuery: ({ query }: { query: string }) =>
    dispatch(getSaucesByQuery({ query }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sauces);

/** @description Parse the path location string into components we can comprehend
 *  @param {String} path string with parsable params
 *  @returns {Number} limit - # of sauces per page
 *  @returns {String} order - how the sauces should be sorted
 *  @returns {Number} page - current page
 *  @returns {string} type - which sauces should be returned
 *  @returns {string?} srch - filter for name
 */
function getParamsFromPath({ path }: { path: string }): SaucesParams {
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
