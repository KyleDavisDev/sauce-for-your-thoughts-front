import * as React from "react";
import Article from "../../components/Article/Article";
import PageTitle from "../../components/PageTitle/PageTitle";

export interface SauceProps {}

export interface SauceState {}

export default class Sauce extends React.Component<SauceProps, SauceState> {
  constructor(props: SauceProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <Article>
        <PageTitle>Sauces</PageTitle>
      </Article>
    );
  }
}
