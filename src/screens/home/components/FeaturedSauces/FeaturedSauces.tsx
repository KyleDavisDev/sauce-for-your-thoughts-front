import React, { useEffect, useState, Dispatch } from "react";
import { useSelector, useDispatch } from "react-redux";

import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { ISauce } from "../../../../redux/sauces/types";
import { AppState, ISaucesState } from "../../../../redux/configureStore";
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
  // find our suaces
  const [featuredSauces, loading] = useFeatedSauces();

  return (
    <StyledDiv className={props.className}>
      <SectionTitle
        title="Featured Sauces"
        description="Check out some of these unique sauces. Discover flavors you've never tasted before!"
      />
      <StyledCardContainer>
        {loading ? (
          <p>Loading...</p>
        ) : featuredSauces && featuredSauces.length > 0 ? (
          featuredSauces.map((sauce, ind) => {
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
          "No sauces found..."
        )}
      </StyledCardContainer>
    </StyledDiv>
  );
};

function useFeatedSauces(): [ISauce[] | null, boolean] {
  // get sauces from redux store
  const { sauces } = useSelector((state: AppState) => state);
  // assign results
  const [results, setResults] = useState([]);
  // assign loading
  const [loading, setLoading] = useState(false);
  console.log(loading);
  // assign dispatch
  const dispatch = useDispatch();
  console.log(1);

  // check if we need to dispatch redux action or not
  if (sauces.featured.length === 0 && !loading) {
    console.log(2);
    // emmit redux action
    dispatch(getSaucesByFeatured());
  }

  useEffect(() => {
    async function getData() {
      try {
        console.log(4);
        // set loading
        setLoading(true);

        // Find the sauces we will render by first getting the array of slugs
        const sauceSlugs2Render: string[] | undefined = sauces.featured
          ? sauces.featured
          : [];
        console.log(5);
        // Make sure we have something to work with
        if (!sauceSlugs2Render || sauceSlugs2Render.length === 0) {
          return null;
        }
        console.log(6);
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
        console.log(7);
        setResults(featured);
        return null;
      } catch {
      } finally {
        console.log(8);
        // finish loading
        setLoading(true);
      }
      return null;
    }

    if (results.length === 0) {
      console.log(3);
      getData();
    }
  }, [sauces.featured]);

  return [results, loading];
}

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
// const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
//   getSaucesByFeatured: () => dispatch(getSaucesByFeatured())
// });
export default FeaturedSauces;
// export default connect(mapStateToProps, mapDispatchToProps)(FeaturedSauces);
