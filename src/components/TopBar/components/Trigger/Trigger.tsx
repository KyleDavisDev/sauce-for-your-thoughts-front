import * as React from "react";

import styled from "../../../../theme/styled-components";

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: FuturaMedium;
  color: ${x => x.theme.grey};
  fill: ${x => x.theme.grey};
  background: none;
  border: 0px;
  padding: 5px;
  outline: none;

  &:hover,
  &:focus {
    outline: none;
    cursor: pointer;
    text-decoration: none;
    color: ${x => x.theme.primaryThemeColor};
    fill: ${x => x.theme.primaryThemeColor};
  }
`;

interface TriggerProps {
  children:
    | string
    | Element
    | JSX.Element
    | Array<string | Element | JSX.Element | undefined>;
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
