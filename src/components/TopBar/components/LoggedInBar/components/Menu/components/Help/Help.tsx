import * as React from "react";

import Title from "../Title/Title";
import Item from "../Item/Item";

export interface HelpProps {}

const Help: React.FC<HelpProps> = props => {
  return (
    <>
      <Title>Need Help?</Title>
      <Item to="#">Quick Guide (Coming Soon)</Item>
      <Item to="#">Contact Us (Coming Soon)</Item>
    </>
  );
};

export default Help;
