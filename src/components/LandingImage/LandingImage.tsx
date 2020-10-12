import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { AppState } from "../../redux/configureStore";
import { HeroContainer, HeroImage } from "./LandingImageStyle";
import Body from "./Body/Body";

export interface LandingImageProps {
  className?: string;
}

const LandingImage: React.FC<LandingImageProps> = props => {
  return (
    <HeroContainer className={props.className}>
      <HeroImage />
      <Body />
    </HeroContainer>
  );
};

export default LandingImage;
