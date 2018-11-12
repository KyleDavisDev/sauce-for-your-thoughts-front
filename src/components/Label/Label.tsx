import * as React from "react";

import styled from "../../theme/styled-components";

interface LabelProps {
  children: Array<string | JSX.Element>;
  className?: string;
  htmlFor?: string;
}

const StyledLabel = styled.label`
  text-transform: uppercase;
  color: #676767;
  display: block;
  clear: both;
  font-family: FuturaMedium;
`;

const Label: React.SFC<LabelProps> = props => {
  return (
    <StyledLabel htmlFor={props.htmlFor} className={props.className}>
      {props.children}
    </StyledLabel>
  );
};

export default Label;
