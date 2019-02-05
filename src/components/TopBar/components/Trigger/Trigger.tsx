import * as React from "react";

import styled from "../../../../theme/styled-components";

const StyledButton = styled.button`
  background: none;
  border: 0px;
  padding: 5px;
  outline: none;

  &:hover {
    outline: none;
    cursor: pointer;
  }
`;

interface TriggerProps {
  children:
    | string
    | Element
    | JSX.Element
    | Array<string | Element | JSX.Element>;
  className?: string;
  onClick?: () => any;
}

const Trigger: React.SFC<TriggerProps> = props => {
  return (
    <StyledButton className={props.className} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
};
Trigger.displayName = "Trigger";

export default Trigger;
