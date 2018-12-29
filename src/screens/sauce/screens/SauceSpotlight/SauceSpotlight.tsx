import * as React from "react";
import { connect } from "react-redux";
import { IinitialState } from "../../../../redux/configureStore";

export interface SauceSingleProps {}

class SauceSingle extends React.Component<SauceSingleProps, any> {
  public render() {
    return <div>Hello World!</div>;
  }
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

export default connect(mapState2Props)(SauceSingle);
