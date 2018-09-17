import * as React from "react";
import styled from "../../theme/styled-components";

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledH2 = styled.h2`
  margin-top: 1em;
  margin-bottom: 0.5em;
  padding: 5px 15px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.primaryThemeColor};
  position: relative;

  &:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    right: -20px;
    border-style: solid;
    border-width: 38px 20px 0 0;
    border-color: ${props => props.theme.primaryThemeColor} transparent
      transparent transparent;
    z-index: 3;
  }
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
