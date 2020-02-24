import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { ISauce } from "../../../../redux/sauces/types";
import { MyThunkDispatch, AppState } from "../../../../redux/configureStore";
import { getSaucesByFeatured } from "../../../../redux/sauces/actions";

import {
  StyledDiv,
  StyledCard,
  StyledCardHolder,
  StyledCardContainer
} from "./FeaturedSaucesStyles";

interface FeaturedSaucesProps {
  className?: string;
  sauces: { featured?: ISauce[] };
  getSaucesByFeatured: () => Promise<null>;
}

const FeaturedSauces: React.SFC<FeaturedSaucesProps> = props => {
  // public componentDidMount() {
  //   window.scrollTo(0, 0); // Move screen to top
  //   // If we don't have sauces, go look for them!
  //   if (!this.props.sauces || !this.props.sauces.featured) {
  //     // Call API
  //     this.props.getSaucesByFeatured().catch(err => console.log(err));
  //   }
  // }

  const { sauces } = useSelector((state: AppState) => state);
  const featuredSuaces = sauces.featured;
  if (!featuredSuaces || featuredSuaces.length === 0) {
    const dispatch = useDispatch();
    dispatch(getSaucesByFeatured);
    return <p>Loading...</p>;
  }

  return (
    <StyledDiv className={props.className}>
      <SectionTitle
        title="Featured Sauces"
        description="Check out some of these unique sauces. Discover flavors you've never tasted before!"
      />
      <StyledCardContainer>
        {sauces.featured && sauces.featured.length > 0
          ? sauces.featured.map((sauce, ind) => {
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
};

function mapStateToProps(state: AppState, myProps: any): any {
  // Find the sauces we will render by first getting the array of slugs
  const sauceSlugs2Render: string[] | undefined = state.sauces.featured
    ? state.sauces.featured
    : [];

  // Make sure we have something to work with
  if (!sauceSlugs2Render || sauceSlugs2Render.length === 0) {
    return { sauces: {} };
  }

  // Make sure our store has content
  const bySlug = state.sauces.bySlug ? state.sauces.bySlug : {};
  if (!bySlug) return { sauces: {} };

  // Find actual sauces
  const featured = sauceSlugs2Render
    ? sauceSlugs2Render.map(slug => {
        return bySlug[slug];
      })
    : [];

  // Make sure we found the sauces
  if (featured.length === 0) return { sauces: {} };

  return {
    sauces: { featured }
  };
}

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  getSaucesByFeatured: () => dispatch(getSaucesByFeatured())
});
export default FeaturedSauces;
// export default connect(mapStateToProps, mapDispatchToProps)(FeaturedSauces);
