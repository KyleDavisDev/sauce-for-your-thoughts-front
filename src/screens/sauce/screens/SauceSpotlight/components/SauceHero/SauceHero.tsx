import * as React from "react";
import { connect } from "react-redux";
import { IinitialState } from "../../../../../../redux/configureStore";
import { ISauce } from "../../../../../../redux/sauces/types";

import {
  StyledSauceContainer,
  StyledImageContainer,
  StyleImg,
  StyledSauceInfoContainer,
  StyledH2
} from "./SauceHeroStyle";

const host =
  process.env.API_ENV === "prod"
    ? "https://sauceforyourthoughts.com"
    : "http://localhost:7777";

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
            <StyleImg src={`${host}/public/uploads/${sauce.photo}`} />
          ) : (
            <StyleImg src="https://www.snhrc.com/wp-content/uploads/2018/09/Image-Coming-Soon.png" />
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
            <i>Type:</i>{" "}
            {(sauce && sauce.types && sauce.types.join(", ")) || "Loading..."}
          </p>
          <p>
            <i>Made in:</i> {(sauce && sauce.country) || "Loading..."}
          </p>
        </StyledSauceInfoContainer>
      </StyledSauceContainer>
    );
  }
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

export default connect(mapState2Props)(SauceHero);
