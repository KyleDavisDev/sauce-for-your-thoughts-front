import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { ISauce } from "../../../../redux/sauces/types";
import {
  MyThunkDispatch,
  AppState,
  ISauceState
} from "../../../../redux/configureStore";
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
  // get sauces from store
  const { sauces } = useSelector((state: AppState) => state);

  // assign dispatch
  const dispatch = useDispatch();

  // call API on first render only and if no featured sauces already
  useEffect(() => {
    sauces.featured.length === 0 && dispatch(getSaucesByFeatured());
  }, []);

  // find our suaces
  const featuredSauces =
    sauces.featured.length > 0 ? getFeaturedSauces(sauces) : null;

  return (
    <StyledDiv className={props.className}>
      <SectionTitle
        title="Featured Sauces"
        description="Check out some of these unique sauces. Discover flavors you've never tasted before!"
      />
      <StyledCardContainer>
        {featuredSauces && featuredSauces.length > 0
          ? featuredSauces.map((sauce, ind) => {
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

function getFeaturedSauces(sauces: ISauceState): ISauce[] | null {
  // Find the sauces we will render by first getting the array of slugs
  const sauceSlugs2Render: string[] | undefined = sauces.featured
    ? sauces.featured
    : [];

  // Make sure we have something to work with
  if (!sauceSlugs2Render || sauceSlugs2Render.length === 0) {
    return null;
  }

  // Make sure our store has content
  const bySlug = sauces.bySlug ? sauces.bySlug : {};
  if (!bySlug) return null;

  // Find actual sauces
  const featured = sauceSlugs2Render
    ? sauceSlugs2Render.map(slug => {
        return bySlug[slug];
      })
    : [];

  // Make sure we found the sauces
  if (featured.length === 0) return null;

  return featured;
}

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  getSaucesByFeatured: () => dispatch(getSaucesByFeatured())
});
export default FeaturedSauces;
// export default connect(mapStateToProps, mapDispatchToProps)(FeaturedSauces);
