import * as React from "react";
import Article from "../../components/Article/Article";
import PageTitle from "../../components/PageTitle/PageTitle";
import TopBar from "../../components/TopBar/TopBar";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import FilterBar from "./components/FilterBar/FilterBar";
import Card from "../../components/Card/Card";
import styled from "styled-components";

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const StyledCardHolder = styled.div`
  padding: 1em;
  width: 100%;
  box-sizing: border-box;
  max-width: 300px;
`;

const StyledCard = styled(Card)`
  margin: 0;
`;

export interface SaucesProps {}

export interface SaucesState {}

export default class Sauces extends React.Component<SaucesProps, SaucesState> {
  constructor(props: SaucesProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <Article>
          <PageTitle>Sauces</PageTitle>
          <FilterBar />
          <StyledCardContainer>
            {new Array(9).fill(undefined).map(x => {
              return (
                <StyledCardHolder>
                  <StyledCard
                    anchorLink="#"
                    title="test"
                    imageLink="https://as.ftcdn.net/r/v1/pics/2fd8819a419c4245e5429905770db4b570661f48/home/discover_collections/Images.jpg"
                    description="description here"
                  />
                </StyledCardHolder>
              );
            })}
          </StyledCardContainer>
        </Article>
        <Footer />
      </div>
    );
  }
}
