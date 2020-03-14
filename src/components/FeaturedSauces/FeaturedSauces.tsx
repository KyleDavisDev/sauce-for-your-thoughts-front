import React from "react";

import SectionTitle from "../SectionTitle/SectionTitle";
import { useFeaturedSauces } from "../../utils/hooks/useFeaturedSauces";

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
  const [featuredSauces, loading] = useFeaturedSauces();

  return (
    <StyledDiv className={props.className}>
      <SectionTitle
        title="Featured Sauces"
        description="Check out some of these unique sauces. Discover flavors you've never tasted before!"
      />
      <StyledCardContainer>{renderContent()}</StyledCardContainer>
    </StyledDiv>
  );

  function renderContent() {
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
              to={`/sauce/view?s=${sauce.slug}`}
            />
          </StyledCardHolder>
        );
      });
    }

    return <p> "No sauces found..." </p>;
  }
};

export default FeaturedSauces;
