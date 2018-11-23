import { RatingComponentSymbol, RatingComponentProps } from "react-rating";
import * as React from "react";

declare module "react-rating" {
  // import Rating from "react-rating";
  interface RatingProps extends RatingComponentProps {
    key: number;
    id?: string;
  }
  // export class Rating2 extends React.Component<RatingProps> {}

  // export interface ReactRating {
  //   key: number;
  // }
  export class Rating2 extends React.Component<RatingProps> {
    // key: string;
  }
}
