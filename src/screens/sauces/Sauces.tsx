import * as React from "react";
import queryString, { OutputParams } from "query-string";

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

export interface SaucesParams {
  page: number;
  limit: number;
  order: string;
  type: string;
}

export interface SaucesProps {
  location: { search: string };
  getSaucesByQuery: ({ query }: { query?: string }) => Promise<any>;
}

export interface SaucesState {
  page: number;
  minPage: number;
  maxPage: number;
  total: number;
}

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
    const params: SaucesParams = this.getParamsFromPath({
      path: this.props.location.search
    });

    this.setState({ ...this.state, page: params.page });

    window.scrollTo(0, 0); // Move screen to top

    // Call API
    const query = "type=all&order=newest&page=1&lim=8";
    this.props.getSaucesByQuery({ query }).catch(err => console.log(err));
  }

  public componentWillReceiveProps(props: SaucesProps) {
    // Going to compare current page vs page in URL
    const params: SaucesParams = this.getParamsFromPath({
      path: props.location.search
    });
    const { page: pageFromState } = this.state;

    if (params.page !== pageFromState) {
      this.setState({ ...this.state, page: params.page });
    }

    window.scrollTo(0, 0); // Move screen to top
  }

  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <StyledArticle>
          <PageTitle>Sauces</PageTitle>
          <FilterBar onSubmit={this.onSubmit} />
          <StyledCardContainer>
            {new Array(8).fill(undefined).map((x, ind) => {
              return (
                <StyledCardHolder key={ind}>
                  <StyledCard
                    title="test"
                    imageLink="https://as.ftcdn.net/r/v1/pics/2fd8819a419c4245e5429905770db4b570661f48/home/discover_collections/Images.jpg"
                    description="description here"
                    author="John Davis Guy"
                    maker="Tasty sauces inc."
                    type="Hot Sauce"
                    to={`/sauce/?s=${5}`}
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

  private getParamsFromPath({ path }: { path: string }): SaucesParams {
    let page: number;
    let limit: number;

    // Get values from string
    const values: OutputParams = queryString.parse(path);

    // Make sure page is not undefined or an array
    if (values.page && !Array.isArray(values.page)) {
      // Make sure it's a valid number
      page = parseInt(values.page, 10);
      page = page > this.state.maxPage ? this.state.maxPage : page;
      page = page < this.state.minPage ? this.state.minPage : page;
    } else {
      page = 1; // set default
    }

    // Make sure limit is not undefined or an array
    if (values.limit && !Array.isArray(values.limit)) {
      // Make sure it's a valid number
      limit = parseInt(values.limit, 10);
      limit = limit < 0 ? 1 : limit;
    } else {
      limit = 8; // set default
    }

    const type: string =
      values.type && !Array.isArray(values.type) ? values.type : "all";

    const order: string =
      values.order && !Array.isArray(values.order) ? values.order : "newest";

    return { page, type, order, limit };
  }

  private onSubmit = ({ type, order }: { type: string; order: string }) => {
    console.log(type, order);
  };
}

function mapStateToProps(state: IinitialState): any {
  return {
    user: { token: state.users.self.token }
  };
}

const mapDispatchToProps = {
  getSaucesByQuery
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sauces);
