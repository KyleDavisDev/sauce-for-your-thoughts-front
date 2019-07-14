import * as React from "react";
import styled from "styled-components";

import Title from "../Title/Title";
import Item from "../Item/Item";

const StyledTitle = styled(Title)`
  padding-bottom: 0px;
`;

export interface HelpProps {}

class Help extends React.PureComponent<HelpProps, any> {
  public render() {
    return (
      <div>
        <StyledTitle>Need Help?</StyledTitle>
        <Item to="#quickguide">Quick Guide</Item>
        <Item to="#contactus">Contact Us</Item>
      </div>
    );
  }
}

export default Help;
