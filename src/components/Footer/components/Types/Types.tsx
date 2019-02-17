import * as React from "react";
import { connect } from "react-redux";

import List from "../List/List";
import { IinitialState } from "../../../../redux/configureStore";

export interface TypesProps {
  types: string[];
}

class Types extends React.PureComponent<TypesProps, any> {
  private items = this.props.types.map(type => {
    return { link: "#", text: type };
  });

  public render() {
    return <List title="Type of Sauce" items={this.items} />;
  }
}

const mapState2Props = (state: IinitialState) => {
  return { types: state.sauces.types };
};

export default connect(mapState2Props)(Types);
