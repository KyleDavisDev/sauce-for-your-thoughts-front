import * as React from "react";

import { getSaucesByQuery } from "../../redux/sauces/actions";
import FilterBar from "./components/FilterBar/FilterBar";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import PageTitle from "../../components/PageTitle/PageTitle";
import Pagination from "./components/pagination/Pagination";
import TopBar from "../../components/TopBar/TopBar";
import {
  StyledArticle,
  StyledCardContainer,
  StyledCardHolder,
  StyledCard
} from "./SaucesStyles";
import { connect } from "react-redux";
import { IinitialState } from "../../redux/configureStore";
import { ISauce, SaucesParams } from "../../redux/sauces/types";
import Utils from "../../utils/Utils/Utils";

export interface SaucesProps {
  location: { search: string };
  sauces?: ISauce[];
  getSaucesByQuery: ({ query }: { query?: string }) => Promise<any>;
}

export interface SaucesState {
  page: number;
  minPage: number;
  maxPage: number;
  total: number;
}

export const host =
  process.env.API_ENV === "prod"
    ? "https://sauceforyourthoughts.com"
    : "http://localhost:7777";

class Sauces extends React.Component<SaucesProps, SaucesState> {
  constructor(props: SaucesProps) {
    super(props);

    this.state = {
      page: 1,
      minPage: 1,
      maxPage: 10, // Will update this value from API
      total: 52 // Will update this value from API
    };
  }

  public componentDidMount() {
    const params: SaucesParams = Utils.getParamsFromPath({
      path: this.props.location.search
    });

    this.setState({ ...this.state, page: params.page });

    window.scrollTo(0, 0); // Move screen to top

    // Construct query string
    const query = `lim=${params.limit}&order=${params.order}&page=${
      params.page
    }&type=${params.type}`;
    // Call API
    this.props.getSaucesByQuery({ query }).catch(err => console.log(err));
  }

  public componentWillReceiveProps(props: SaucesProps) {
    // Going to compare current page vs page in URL
    const params: SaucesParams = Utils.getParamsFromPath({
      path: props.location.search
    });
    const { page: pageFromState } = this.state;

    if (params.page !== pageFromState) {
      this.setState({ ...this.state, page: params.page });
    }

    window.scrollTo(0, 0); // Move screen to top
  }

  public render() {
    const sauces = this.props.sauces ? this.props.sauces : [];
    return (
      <div>
        <TopBar />
        <Navigation />
        <StyledArticle>
          <PageTitle>Sauces</PageTitle>
          <FilterBar onSubmit={this.onSubmit} />
          <StyledCardContainer>
            {sauces.length > 0 &&
              sauces.map((sauce, ind) => {
                return (
                  <StyledCardHolder key={ind}>
                    <StyledCard
                      title={sauce.name}
                      imageLink={`${host}/public/uploads/${sauce.photo}`}
                      description={sauce.description}
                      author={sauce.author}
                      maker={sauce.maker}
                      type={sauce.types ? sauce.types.join(", ") : "N/A"}
                      to={`/sauce/?s=${sauce.slug}`}
                    />
                  </StyledCardHolder>
                );
              })}
          </StyledCardContainer>
          <Pagination
            total={this.state.total}
            page={this.state.page}
            limit={5}
            range={3}
          />
        </StyledArticle>
        <Footer />
      </div>
    );
  }

  private onSubmit = ({ type, order }: { type: string; order: string }) => {
    console.log(type, order);
  };
}

function mapStateToProps(state: IinitialState, myProps: any): any {
  const { limit, order, page, type } = Utils.getParamsFromPath({
    path: myProps.match.params
  });
  // Construct query string
  const queryString = `lim=${limit}&order=${order}&page=${page}&type=${type}`;

  // Find the sauces we will render by first getting the array of slugs
  const sauceSlugs2Render: string[] | undefined = state.sauces.query
    ? state.sauces.query[queryString]
    : [];

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
    sauces
  };
}

const mapDispatchToProps = {
  getSaucesByQuery
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sauces);
