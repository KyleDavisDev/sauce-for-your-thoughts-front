import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../../../../redux/configureStore";
import { ISauce } from "../../../../../../redux/sauces/types";

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

class SauceHero extends React.PureComponent<SauceHeroProps, any> {
  public constructor(props: SauceHeroProps) {
    super(props);
  }

  public render() {
    const { sauce } = this.props;

    return (
      <StyledSauceContainer>
        <StyledImageContainer>
          {sauce && sauce.photo ? (
            <StyleImg src={`${sauce.photo}`} />
          ) : (
            <StyleImg src="https://res.cloudinary.com/sfyt/image/upload/v1565275178/sauces/ra1o7bsr9v2eurosoo5y.png" />
          )}
        </StyledImageContainer>
        <StyledSauceInfoContainer>
          <StyledH2>{(sauce && sauce.name) || "Loading..."}</StyledH2>
          <p>
            <i>Maker:</i> {(sauce && sauce.maker) || "Loading..."}
          </p>
          <p>
            <i>Description:</i> {(sauce && sauce.description) || "Loading..."}
          </p>
          <p>
            <i>Ingredients:</i> {(sauce && sauce.ingredients) || "Loading..."}
          </p>
          <p>
            <i>Type:</i> {this.RenderType()}
          </p>
          {sauce && sauce.shu && (
            <p>
              <i>SHU:</i> {sauce.shu} scoville
            </p>
          )}
          <p>
            <i>Made in:</i> {(sauce && sauce.country) || "Loading..."}
          </p>
        </StyledSauceInfoContainer>
      </StyledSauceContainer>
    );
  }

  // Renders the type of sauce
  private RenderType = () => {
    const { sauce } = this.props;

    if (!sauce) return "Loading...";

    if (sauce.types && sauce.types.length > 0) return sauce.types.join(", ");

    return "N/A";
  };
}

const mapState2Props = (state: AppState) => {
  return {};
};

export default connect(mapState2Props)(SauceHero);
