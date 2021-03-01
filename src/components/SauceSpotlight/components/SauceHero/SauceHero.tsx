import * as React from "react";

import FlashMessage, {
  FlashMessageProps
} from "../../../FlashMessage/FlashMessage";

import {
  StyledSauceContainer,
  ImageContainer,
  StyleImg,
  StyledSauceInfoContainer,
  StyledH2
} from "./SauceHeroStyle";
import { ISauce } from "../../../../redux/sauces/types";

export interface SauceHeroProps {
  loading: boolean;
  sauce?: ISauce;
  error: FlashMessageProps;
}

const SauceHero: React.FunctionComponent<SauceHeroProps> = props => {
  // defaults
  const _loadingTxt = "loading...";
  const _noSauceTxt = "Could not find sauce!";
  const _defaultImagePath =
    "https://res.cloudinary.com/foryourthoughts/image/upload/v1565275178/sauces/ra1o7bsr9v2eurosoo5y.png";

  const { loading, sauce, error } = props;

  if (loading) {
    return <p>{_loadingTxt}</p>;
  }

  if (error.isVisible) {
    return <p>{error.text}</p>;
  }

  if (!sauce) {
    return <p>{_noSauceTxt}</p>;
  }

  return (
    <>
      {!sauce.isAdminApproved ?? (
        <FlashMessage
          isVisible={true}
          text={
            "This sauce has not been approved by an admin yet and, as a result, will not appear listed with the other sauces."
          }
          type="warning"
        />
      )}

      <StyledSauceContainer>
        <ImageContainer>
          {sauce.photo ? (
            <StyleImg src={`${sauce.photo}`} />
          ) : (
            <StyleImg src={_defaultImagePath} />
          )}
        </ImageContainer>
        <StyledSauceInfoContainer>
          <StyledH2>{sauce.name}</StyledH2>
          <p data-test-id="maker">
            <i>Maker:</i> {sauce.maker}
          </p>
          <p>
            <i>Description:</i> {sauce.description}
          </p>

          {sauce.ingredients && (
            <p data-test-id="ingredients">
              <i>Ingredients:</i> {sauce.ingredients}
            </p>
          )}

          {sauce.types && sauce.types.length > 0 && (
            <p data-test-id="type">
              <i>Type:</i> {sauce.types.join(", ")}
            </p>
          )}

          {sauce.shu && (
            <p data-test-id="shu">
              <i>SHU:</i> {sauce.shu} scoville
            </p>
          )}

          {sauce.country && (
            <p data-test-id="country">
              <i>Made in:</i> {sauce.country}
            </p>
          )}
        </StyledSauceInfoContainer>
      </StyledSauceContainer>
    </>
  );
};

export default SauceHero;
