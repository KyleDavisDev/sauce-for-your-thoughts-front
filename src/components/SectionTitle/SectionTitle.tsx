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
  font-size: ${props => props.theme.scaleH2};
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 5px 15px;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.primaryThemeColor};
  font-family: FuturaMedium;
  position: relative;

  &:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    right: -20px;
    border-style: solid;
    border-width: 51px 20px 0 0;
    border-color: ${props => props.theme.primaryThemeColor} transparent
      transparent transparent;
    z-index: 3;
  }
`;
StyledH2.displayName = "StyledH2";

const StyledH6 = styled.h6`
  font-family: AvenirNextReg;
  margin-top: 0;
  margin-bottom: 1rem;
  max-width: 66%;
  color: ${props => props.theme.grey};
  font-size: ${props => props.theme.scaleH6};
  font-weight: 400;
`;
StyledH6.displayName = "StyledH6";

interface SectionTitleProps {
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
