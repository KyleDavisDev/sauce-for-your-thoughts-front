import * as React from "react";

import styled from "../../theme/styled-components";

interface LabelProps {
  children: string | JSX.Element | Array<string | JSX.Element>;
  className?: string;
  htmlFor?: string;
  key?: string;
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
    <StyledLabel
      htmlFor={props.htmlFor}
      className={props.className}
      key={props.key}
    >
      {props.children}
    </StyledLabel>
  );
};

export default Label;
