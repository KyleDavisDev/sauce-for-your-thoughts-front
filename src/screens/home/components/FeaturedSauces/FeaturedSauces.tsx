import * as React from "react";

import styled from "../../../../theme/styled-components";
import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledCard = styled(Card)`
  width: 33%;
`;
interface FeaturedSaucesProps {}

const FeaturedSauces: React.SFC<FeaturedSaucesProps> = props => {
  return (
    <StyledDiv>
      <SectionTitle
        title="Newest Sauces"
        description="We are always adding new sauces to our knowledgebase!"
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
