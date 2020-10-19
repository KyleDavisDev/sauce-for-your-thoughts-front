import * as React from "react";

import Title from "../Title/Title";
import Item from "../Item/Item";

export interface HelpMenuItemProps {}

class HelpMenuItem extends React.PureComponent<HelpMenuItemProps, any> {
  public render() {
    return (
      <div>
        <Title>Need Help?</Title>
        <Item to="#">Quick Guide (Coming Soon)</Item>
        <Item to="#">Contact Us (Coming Soon)</Item>
      </div>
    );
  }
}

export default HelpMenuItem;
