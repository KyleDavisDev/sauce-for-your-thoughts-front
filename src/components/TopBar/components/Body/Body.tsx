import * as React from "react";
import styled from "../../../../theme/styled-components";

const StyledDiv = styled.div`
  position: absolute;
  z-index: 1000;
`;

interface BodyProps {
  children:
    | string
    | Element
    | JSX.Element
    | Array<string | Element | JSX.Element>;
  className?: string;
}

const Body: React.SFC<BodyProps> = props => {
  return <StyledDiv className={props.className}>{props.children}</StyledDiv>;
};
Body.displayName = "Body";

export default Body;
