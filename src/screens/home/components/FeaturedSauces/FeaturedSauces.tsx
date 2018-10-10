import * as React from "react";

import styled from "../../../../theme/styled-components";
import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1em;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  width: 33%;
`;

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
      <StyledCard
        anchorLink="#"
        title="test"
        imageLink="https://as.ftcdn.net/r/v1/pics/2fd8819a419c4245e5429905770db4b570661f48/home/discover_collections/Images.jpg"
        description="description here"
      />
      <StyledCard
        anchorLink="#"
        title="test"
        imageLink="https://as.ftcdn.net/r/v1/pics/2fd8819a419c4245e5429905770db4b570661f48/home/discover_collections/Images.jpg"
        description="description here"
      />
      <StyledCard
        anchorLink="#"
        title="test"
        imageLink="https://as.ftcdn.net/r/v1/pics/2fd8819a419c4245e5429905770db4b570661f48/home/discover_collections/Images.jpg"
        description="description here"
      />
    </StyledDiv>
  );
};

export default FeaturedSauces;
