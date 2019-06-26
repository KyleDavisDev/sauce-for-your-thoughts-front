import * as React from "react";

import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
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
  return (
    <StyledDiv className={props.className}>
      <SectionTitle
        title="Featured Sauces"
        description="Check out some of these unique sauces. Discover flavors you've never tasted before!"
      />
      <StyledCardContainer />
    </StyledDiv>
  );
};

export default FeaturedSauces;
