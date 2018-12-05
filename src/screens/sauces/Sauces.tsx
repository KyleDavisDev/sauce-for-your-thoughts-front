import * as React from "react";

export interface SauceProps {}

export interface SauceState {}

export default class Sauce extends React.Component<SauceProps, SauceState> {
  constructor(props: SauceProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div />;
  }
}
