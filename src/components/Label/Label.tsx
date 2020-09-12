import * as React from "react";

import styled from "../../theme/styled-components";

export interface LabelProps {
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

const Label: React.FC<LabelProps> = props => {
  const { htmlFor, className, key, children } = props;

  return (
    <StyledLabel htmlFor={htmlFor} className={className} key={key}>
      {children}
    </StyledLabel>
  );
};

export default Label;
