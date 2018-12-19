import * as React from "react";

import styled from "../../../../theme/styled-components";

const StyledDiv = styled.div`
  max-width: ${props => props.theme.footerMaxWidth};
`;

const StyledH5 = styled.h5`
  margin: 0.5em 0;
  font-weight: 400;
  padding: 0;
  text-transform: uppercase;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.scaleH5};
  font-family: FuturaMedium;
`;
StyledH5.displayName = "StyledH5";

const StyledP = styled.p`
  margin: 0.5em 0;
  padding: 0;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.scaleP};
  font-family: AvenirNextReg;
`;
StyledP.displayName = "StyledP";

interface AboutProps {
  className?: string;
}

class About extends React.PureComponent<AboutProps> {
  public render() {
    return (
      <StyledDiv className={this.props.className}>
        <StyledH5>About</StyledH5>

        <StyledP>
          Ever wonder what a sauce tastes like <em>before</em> buying it? Sauce
          For Your Thoughts can help! Add, or review, sauces and help out your
          fellow saucies! Never be blind-sides by a sauce again!
        </StyledP>
      </StyledDiv>
    );
  }
}

export default About;
