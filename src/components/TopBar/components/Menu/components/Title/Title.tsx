import * as React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 12px;
  // background-color: ${x => x.theme.primaryLightThemeColor};
  text-transform: uppercase;
  font-size: 14px;
  color: ${x => x.theme.black};
`;

interface TitleProps {
  children: string;
}

const Title: React.SFC<TitleProps> = props => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

export default Title;
