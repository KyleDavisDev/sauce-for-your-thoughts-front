import * as React from "react";
import { useSauceBySlug } from "../../../../utils/hooks/useSauceBySlug/useSauceBySlug";
import FlashMessage from "../../../FlashMessage/FlashMessage";

import {
  StyledSauceContainer,
  ImageContainer,
  StyleImg,
  StyledSauceInfoContainer,
  StyledH2
} from "./SauceHeroStyle";

export interface SauceHeroProps {}

const SauceHero: React.FunctionComponent<SauceHeroProps> = () => {
  const { loading, sauce, error, getTheSauce } = useSauceBySlug();

  React.useEffect(() => {
    if (!loading && !sauce) getTheSauce();
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error.isVisible) {
    return <p>{error.text}</p>;
  }

  if (!sauce) {
    return <p>Could not find sauce!</p>;
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
            <StyleImg src="https://res.cloudinary.com/foryourthoughts/image/upload/v1565275178/sauces/ra1o7bsr9v2eurosoo5y.png" />
          )}
        </ImageContainer>
        <StyledSauceInfoContainer>
          <StyledH2>{sauce.name}</StyledH2>
          <p>
            <i>Maker:</i> {sauce.maker}
          </p>
          <p>
            <i>Description:</i> {sauce.description}
          </p>

          {sauce.ingredients && (
            <p>
              <i>Ingredients:</i> {sauce.ingredients}
            </p>
          )}

          <p>
            <i>Type:</i> {sauce.types ? sauce.types.join(", ") : "N/A"}
          </p>

          {sauce.shu && (
            <p>
              <i>SHU:</i> {sauce.shu} scoville
            </p>
          )}

          {sauce.country && (
            <p>
              <i>Made in:</i> {sauce.country || "Loading..."}
            </p>
          )}
        </StyledSauceInfoContainer>
      </StyledSauceContainer>
    </>
  );
};

export default SauceHero;
