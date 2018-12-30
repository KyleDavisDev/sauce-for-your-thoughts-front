import * as React from "react";

export interface SauceReviewBlockProps {}

export interface SauceReviewBlockState {}

export default class SauceReviewBlock extends React.Component<
  SauceReviewBlockProps,
  SauceReviewBlockState
> {
  constructor(props: SauceReviewBlockProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>I'm a review!</div>;
  }
}
