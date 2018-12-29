import * as React from "react";
import { connect } from "react-redux";
import { IinitialState } from "../../../../redux/configureStore";
import TopBar from "../../../../components/TopBar/TopBar";

import Article from "../../../../components/Article/Article";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Navigation from "../../../../components/Navigation/Navigation";
import styled from "../../../../theme/styled-components";
import { Link } from "../../../../components/Link/Link";
import { Button } from "../../../../components/Button/Button";
import Footer from "../../../../components/Footer/Footer";

const StyledArticle = styled(Article)`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const StyledLeftContainer = styled.div`
  width: 66%;
  box-sizing: border-box;
  padding: 0 1em;
`;
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

export interface SauceSingleProps {}

class SauceSingle extends React.Component<SauceSingleProps, any> {
  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <StyledArticle>
          <StyledLeftContainer>
            <PageTitle>Chalulu hot sauce</PageTitle>

            <StyledSauceContainer>
              <StyledImageContainer>
                <StyleImg src="https://hotsaucefever.com/images/sauces/451/ancho_and_morita_smokey_tamarind_sauce.jpg" />
              </StyledImageContainer>
              <StyledSauceInfoContainer>
                <p>
                  <i>Maker:</i> Cholula
                </p>
                <p>
                  <i>Description:</i> Cholula Chipotle Hot Sauce...featuring a
                  savory blend of Cholula's original "Flavorful Fire" and the
                  smokey and slightly sweet flavor notes or real Chipotle
                  peppers. It brings sensational new flavor to soups, ranch
                  dressing, steaks, chicken and more
                </p>
                <p>
                  <i>Ingredients:</i> Water, Vinegar (white And Apple), Sugar,
                  Peppers (chipotle, Guajillo, Arbol And Piquin), Salt, Natural
                  Flavors, Spices, Xanthan Gum, Silicon Dioxide, Citric
                  Acid,caramel
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
          </StyledLeftContainer>
        </StyledArticle>
        <Footer />
      </div>
    );
  }
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

export default connect(mapState2Props)(SauceSingle);
