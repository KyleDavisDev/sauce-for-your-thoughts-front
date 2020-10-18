import * as React from "react";
import styled from "styled-components";

import Title from "../Title/Title";
import Item from "../Item/Item";

const StyledTitle = styled(Title)`
  padding-bottom: 0px;
`;

export interface HelpMenuItemProps {}

class HelpMenuItem extends React.PureComponent<HelpMenuItemProps, any> {
  public render() {
    return (
      <div>
        <StyledTitle>Need Help?</StyledTitle>
        <Item to="#">Quick Guide (Coming Soon)</Item>
        <Item to="#">Contact Us (Coming Soon)</Item>
      </div>
    );
  }
}

export default HelpMenuItem;
