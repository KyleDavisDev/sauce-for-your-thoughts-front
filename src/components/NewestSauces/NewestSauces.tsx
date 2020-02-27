import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SectionTitle from "../SectionTitle/SectionTitle";
import { AppState } from "../../redux/configureStore";
import { ISauce } from "../../redux/sauces/types";
import { getSaucesByNewest } from "../../redux/sauces/actions";
import {
  StyledDiv,
  StyledCard,
  StyledCardHolder,
  StyledCardContainer
} from "./NewestSaucesStyles";

export interface NewestSaucesProps {
  className?: string;
}

export interface NewestSaucesState {}

const NewestSauces: React.SFC<NewestSaucesProps> = props => {
  // find our suaces
  const [newestSauces, loading] = useNewestSauces();

  return (
    <StyledDiv className={props.className}>
      <SectionTitle
        title="Newest Sauces"
        description="We are always adding new sauces to our knowledgebase!"
      />
      <StyledCardContainer>
        {loading ? (
          <p>Loading...</p>
        ) : newestSauces && newestSauces.length > 0 ? (
          newestSauces.map((sauce, ind) => {
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

export function useNewestSauces(): any {
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
    if (sauces.newest.length === 0 && !loading) {
      // emmit redux action to populate sauces.featured
      dispatch(getSaucesByNewest());

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

export default NewestSauces;
