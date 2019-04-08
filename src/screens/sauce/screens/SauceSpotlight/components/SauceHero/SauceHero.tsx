import * as React from "react";
import { connect } from "react-redux";
import { IinitialState } from "../../../../../../redux/configureStore";
import styled from "styled-components";
import { Link } from "../../../../../../components/Link/Link";
import { Button } from "../../../../../../components/Button/Button";
import { ISauce } from "../../../../../../redux/sauces/types";

const StyledSauceContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 3em;
`;

const StyledImageContainer = styled.div`
  max-width: 33%;
`;

const StyleImg = styled.img`
  width: 100%;
  box-sizing: border-box;
`;

const StyledSauceInfoContainer = styled.div`
  font-family: AvenirNextReg;
  width: 66%;
  box-sizing: border-box;
  padding: 0 1em;
`;

export interface SauceHeroProps {
  sauce: ISauce; // This is sauce's slug that will have to be looked up
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
          <StyleImg src="https://hotsaucefever.com/images/sauces/451/ancho_and_morita_smokey_tamarind_sauce.jpg" />
        </StyledImageContainer>
        <StyledSauceInfoContainer>
          <p>
            <i>Maker:</i> {sauce.maker}
          </p>
          <p>
            <i>Description:</i> {sauce.description}
          </p>
          <p>
            <i>Ingredients:</i> {sauce.ingredients}
          </p>
          <p>
            <i>Type:</i> {sauce.types && sauce.types.join(", ")}
          </p>
          <p>
            <i>Made in:</i> Mexico
          </p>
          <Link to={`/review/add/?s=${sauce.slug}`}>
            <Button displayType="solid">Add Review</Button>
          </Link>
        </StyledSauceInfoContainer>
      </StyledSauceContainer>
    );
  }
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

export default connect(mapState2Props)(SauceHero);
