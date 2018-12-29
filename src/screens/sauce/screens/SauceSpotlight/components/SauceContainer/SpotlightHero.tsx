import * as React from "react";
import { connect } from "react-redux";
import { IinitialState } from "../../../../../../redux/configureStore";
import styled from "styled-components";

const StyledSauceContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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

export interface SpotlightHeroProps {
  id: string; // This is sauce's id that will have to be looked up
}

class SpotlightHero extends React.Component<SpotlightHeroProps, any> {
  public constructor(props: SpotlightHeroProps) {
    super(props);
  }

  public render() {
    return (
      <StyledSauceContainer>
        <StyledImageContainer>
          <StyleImg src="https://hotsaucefever.com/images/sauces/451/ancho_and_morita_smokey_tamarind_sauce.jpg" />
        </StyledImageContainer>
        <StyledSauceInfoContainer>
          <p>
            <i>Maker:</i> Cholula
          </p>
          <p>
            <i>Description:</i> Cholula Chipotle Hot Sauce...featuring a savory
            blend of Cholula's original "Flavorful Fire" and the smokey and
            slightly sweet flavor notes or real Chipotle peppers. It brings
            sensational new flavor to soups, ranch dressing, steaks, chicken and
            more
          </p>
          <p>
            <i>Ingredients:</i> Water, Vinegar (white And Apple), Sugar, Peppers
            (chipotle, Guajillo, Arbol And Piquin), Salt, Natural Flavors,
            Spices, Xanthan Gum, Silicon Dioxide, Citric Acid,caramel
          </p>
          <p>
            <i>Type:</i> Hot Sauce
          </p>
          <p>
            <i>Made in:</i> Mexico
          </p>
          <Link to={`/review/add/?s=${5}`}>
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

export default connect(mapState2Props)(SpotlightHero);
