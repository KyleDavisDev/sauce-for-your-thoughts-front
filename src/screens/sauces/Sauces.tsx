import * as React from "react";
import Article from "../../components/Article/Article";
import PageTitle from "../../components/PageTitle/PageTitle";
import TopBar from "../../components/TopBar/TopBar";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import FilterBar from "./components/FilterBar/FilterBar";

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
        </Article>
        <Footer />
      </div>
    );
  }
}
