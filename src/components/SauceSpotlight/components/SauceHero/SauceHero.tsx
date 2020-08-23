import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../../redux/configureStore";
import { ISauce } from "../../../../redux/sauces/types";

import {
  StyledSauceContainer,
  StyledImageContainer,
  StyleImg,
  StyledSauceInfoContainer,
  StyledH2
} from "./SauceHeroStyle";

export interface SauceHeroProps {
  sauce?: ISauce; // This is sauce's slug that will have to be looked up
}

const SauceHero: React.FunctionComponent<SauceHeroProps> = props => {
  // grab sauce from pops and sanity check
  const { sauce } = props;
  if (!sauce) {
    return <p>loading...</p>;
  }

  // break down sauce
  const {
    name,
    maker,
    description,
    ingredients,
    types,
    shu,
    country,
    photo
  } = sauce;

  return (
    <StyledSauceContainer>
      <StyledImageContainer>
        {photo ? (
          <StyleImg src={`${photo}`} />
        ) : (
          <StyleImg src="https://res.cloudinary.com/foryourthoughts/image/upload/v1565275178/sauces/ra1o7bsr9v2eurosoo5y.png" />
        )}
      </StyledImageContainer>
      <StyledSauceInfoContainer>
        <StyledH2>{name}</StyledH2>
        <p>
          <i>Maker:</i> {maker}
        </p>
        <p>
          <i>Description:</i> {description}
        </p>
        <p>
          <i>Ingredients:</i> {ingredients}
        </p>
        <p>
          <i>Type:</i> {types ? types.join(", ") : "N/A"}
        </p>
        {shu && (
          <p>
            <i>SHU:</i> {shu} scoville
          </p>
        )}
        <p>
          <i>Made in:</i> {country || "Loading..."}
        </p>
      </StyledSauceInfoContainer>
    </StyledSauceContainer>
  );
};

export default SauceHero;
