import { Dictionary } from "lodash";
import * as React from "react";

declare class Rating extends React.Component<RatingComponentProps> {}
declare namespace Rating {

}

export type RatingComponentSymbol =
  | string
  | string[]
  | Dictionary<any>
  | Dictionary<any>[]
  | JSX.Element[]
  | JSX.Element;

export interface RatingComponentProps {
  start?: number;
  stop?: number;
  step?: number;
  fractions?: number;
  initialRating?: number;
  className?: string;
  placeholderRating?: number;
  readonly?: boolean;
  quiet?: boolean;
  direction?: "rtl" | "ltr";
  emptySymbol?: RatingComponentSymbol;
  fullSymbol?: RatingComponentSymbol;
  placeholderSymbol?: RatingComponentSymbol;
  onChange?: (value: number) => any;
  onHover?: (value: number) => any;
  onClick?: (value: number) => any;
}

export default Rating;
