import * as React from "react";
import { connect } from "react-redux";

import SectionTitle from "../components/SectionTitle/SectionTitle";
import { MyThunkDispatch, AppState } from "../redux/configureStore";
import { ISauce } from "../redux/sauces/types";
import { getSaucesByNewest } from "../redux/sauces/actions";
import {
  StyledDiv,
  StyledCard,
  StyledCardHolder,
  StyledCardContainer
} from "./NewestSaucesStyles";

export interface NewestSaucesProps {
  className?: string;
  sauces: { newest?: ISauce[] };
  getSaucesByNewest: () => Promise<null>;
}

export interface NewestSaucesState {}

class NewestSauces extends React.PureComponent<
  NewestSaucesProps,
  NewestSaucesState
> {
  constructor(props: NewestSaucesProps) {
    super(props);
  }

  public componentDidMount() {
    window.scrollTo(0, 0); // Move screen to top
    // If we don't have sauces, go look for them!
    if (!this.props.sauces || !this.props.sauces.newest) {
      // Call API
      this.props.getSaucesByNewest().catch(err => console.log(err));
    }
  }

  public render() {
    const { sauces } = this.props;
    return (
      <StyledDiv className={this.props.className}>
        <SectionTitle
          title="Newest Sauces"
          description="We are always adding new sauces to our knowledgebase!"
        />
        <StyledCardContainer>
          {sauces.newest && sauces.newest.length > 0
            ? sauces.newest.map((sauce, ind) => {
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
            : "No sauces found..."}
        </StyledCardContainer>
      </StyledDiv>
    );
  }
}

function mapStateToProps(state: AppState, myProps: any): any {
  // Find the sauces we will render by first getting the array of slugs
  const sauceSlugs2Render: string[] | undefined = state.sauces.newest
    ? state.sauces.newest
    : [];

  // Make sure we have something to work with
  if (!sauceSlugs2Render || sauceSlugs2Render.length === 0) {
    return { sauces: {} };
  }

  // Make sure our store has content
  const bySlug = state.sauces.bySlug ? state.sauces.bySlug : {};
  if (!bySlug) return { sauces: {} };

  // Find actual sauces
  const newest = sauceSlugs2Render
    ? sauceSlugs2Render.map(slug => {
        return bySlug[slug];
      })
    : [];

  // Make sure we found the sauces
  if (newest.length === 0) return { sauces: {} };

  return {
    sauces: { newest }
  };
}

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  getSaucesByNewest: () => dispatch(getSaucesByNewest())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewestSauces);
