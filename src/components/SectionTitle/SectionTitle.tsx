import * as React from "react";

import { StyledDiv, StyledH2, StyledH6 } from "./SectionTitleStyle";

export interface SectionTitleProps {
  title: string;
  description: string;
}

const SectionTitle: React.FC<SectionTitleProps> = props => {
  return (
    <StyledDiv>
      <StyledH2>{props.title}</StyledH2>
      <StyledH6>{props.description}</StyledH6>
    </StyledDiv>
  );
};

export default SectionTitle;
