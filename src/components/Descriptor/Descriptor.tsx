import * as React from "react";
import styled from "styled-components";

const StyledH2 = styled.h2`
  font-family: FuturaMedium;
`;
StyledH2.displayName = "Title";

const StyledP = styled.p`
  font-family: AvenirNextReg;
`;

interface DescriptorProps {
  className?: string;
  children?: string;
  title: string;
}

const Descriptor: React.SFC<DescriptorProps> = props => {
  return (
    <div className={props.className}>
      <StyledH2>{props.title}</StyledH2>
      <StyledP>{props.children}</StyledP>
    </div>
  );
};

export default Descriptor;
