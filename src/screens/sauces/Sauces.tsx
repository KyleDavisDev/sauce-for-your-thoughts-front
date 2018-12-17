import * as React from "react";
import Article from "../../components/Article/Article";
import PageTitle from "../../components/PageTitle/PageTitle";
import TopBar from "../../components/TopBar/TopBar";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

export interface SaucesProps {}

export interface SaucesState {}

export default class Sauces extends React.Component<SaucesProps, SaucesState> {
  constructor(props: SaucesProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <Article>
          <PageTitle>Sauces</PageTitle>
        </Article>
        <Footer />
      </div>
    );
  }
}
