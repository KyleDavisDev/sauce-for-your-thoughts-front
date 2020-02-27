import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SectionTitle from "../SectionTitle/SectionTitle";
import { ISauce } from "../../redux/sauces/types";
import { AppState } from "../../redux/configureStore";
import { getSaucesByFeatured } from "../../redux/sauces/actions";

import {
  StyledDiv,
  StyledCard,
  StyledCardHolder,
  StyledCardContainer
} from "./FeaturedSaucesStyles";

interface FeaturedSaucesProps {
  className?: string;
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
        {renderContent(loading, featuredSauces)}
      </StyledCardContainer>
    </StyledDiv>
  );

  function renderContent(loading: boolean, featuredSauces: ISauce[] | null) {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (featuredSauces && featuredSauces.length > 0) {
      return featuredSauces.map((sauce, ind) => {
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
      });
    }

    return <p> "No sauces found..." </p>;
  }
};

export function useFeatedSauces(): [ISauce[] | null, boolean] {
  // get sauces from redux store
  const { sauces } = useSelector((state: AppState) => state);
  // assign results
  const [results, setResults] = useState<ISauce[]>([]);
  // assign loading
  const [loading, setLoading] = useState(false);

  // assign dispatch
  const dispatch = useDispatch();

  // run once
  useEffect(() => {
    // check if we need to dispatch redux action or not
    if (sauces.featured.length === 0 && !loading) {
      // emmit redux action to populate sauces.featured
      dispatch(getSaucesByFeatured());

      // update loading
      setLoading(true);
    }
  }, []);

  // run when sauces.featured changes
  useEffect(() => {
    async function getData() {
      try {
        // Find the sauces we will render by first getting the array of slugs
        const sauceSlugs2Render = sauces.featured;

        // Make sure our store has content
        const bySlug = sauces.bySlug ? sauces.bySlug : {};
        if (!bySlug) return [null, loading];

        // Find actual sauces
        const featured = sauceSlugs2Render
          ? sauceSlugs2Render.map(slug => {
              return bySlug[slug];
            })
          : [];

        // Make sure we found the sauces
        if (featured.length === 0) return [null, loading];

        setResults(featured);
      } catch {
      } finally {
        // finish loading
        setLoading(false);
      }
      return [null, loading];
    }

    if (results.length === 0 && sauces.featured.length > 0) {
      getData();
    }
  }, [sauces.featured]);

  return [results, loading];
}

export default FeaturedSauces;
