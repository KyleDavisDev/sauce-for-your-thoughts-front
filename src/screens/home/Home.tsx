import * as React from "react";
import styled from "../../theme/styled-components";

import LandingImage from "./components/LandingImage/LandingImage";
import NewestSauces from "./components/NewestSauces/NewestSauces";
import FeaturedSauces from "./components/FeaturedSauces/FeaturedSauces";
import FeaturedUsers from "./components/FeaturedUsers/FeaturedUsers";

const Article = styled.article`
  max-width: 1200px;
  margin: 0 auto;
`;

const Home = ({}) => (
  <div>
    <LandingImage />
    <Article>
      <NewestSauces />
      <FeaturedSauces />
      <FeaturedUsers />
    </Article>
  </div>
);

export default Home;
