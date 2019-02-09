import * as React from "react";
import Title from "../Title/Title";
import Item from "../Item/Item";

export interface HelpProps {}

class Help extends React.PureComponent<HelpProps, any> {
  public render() {
    return (
      <div>
        <Title>Need Help?</Title>
        <Item to="#quickguide">Quick Guide</Item>
        <Item to="#contactus">Contact Us</Item>
      </div>
    );
  }
}

export default Help;
