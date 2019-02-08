import * as React from "react";
import { connect } from "react-redux";

import styled from "../../../../theme/styled-components";
import { IinitialState } from "../../../../redux/configureStore";

const StyledUL = styled.ul`
  background-color: ${props => props.theme.white};
`;

export interface MenuProps {}

class Menu extends React.Component<MenuProps, any> {
  public render() {
    return (
      <StyledUL>
        <li>something</li>
        <li>something2</li>
        <li>something3</li>
      </StyledUL>
    );
  }
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

export default connect(mapState2Props)(Menu);
