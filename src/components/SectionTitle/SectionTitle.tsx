import * as React from "react";
import styled from "../../theme/styled-components";

const StyledDiv = styled.div`
  width: 100%;
  text-align: center;
`;

const StyledH2 = styled.h2`
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: ${props => props.theme.black};
`;

const StyledH6 = styled.h6`
  margin-top: 1em;
  margin-bottom: 1em;
  color: ${props => props.theme.grey};
  font-weight: 400;
`;

interface SectionTitleProps {
  title: string;
  description: string;
}

const SectionTitle: React.SFC<SectionTitleProps> = props => {
  return (
    <StyledDiv>
      <StyledH2>{props.title}</StyledH2>
      <StyledH6>{props.description}</StyledH6>
    </StyledDiv>
  );
};

export default SectionTitle;
