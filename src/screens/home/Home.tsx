import * as React from "react";
import styled from "../../theme/styled-components";

import LandingImage from "./components/landingImage/LandingImage";
import Card from "../../components/Card/Card";

const Article = styled.article`
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  width: 33%;
`;

const Home = ({}) => (
  <div>
    <LandingImage />
    <h1>New submissions</h1>
    <Article>
      <StyledCard
        title="test"
        imageLink="https://as.ftcdn.net/r/v1/pics/2fd8819a419c4245e5429905770db4b570661f48/home/discover_collections/Images.jpg"
        description="description here"
      />
    </Article>
  </div>
);

export default Home;
