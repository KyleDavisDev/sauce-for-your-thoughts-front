import * as React from "react";

import { StyledDiv } from "./TitleStyle";

export interface TitleProps {
  children: string;
  className?: string;
}

const Title: React.FC<TitleProps> = props => {
  return <StyledDiv className={props.className}>{props.children}</StyledDiv>;
};

export default Title;
