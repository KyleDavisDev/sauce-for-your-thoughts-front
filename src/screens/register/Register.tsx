import * as React from "react";
import { connect } from "react-redux";

export interface RegisterProps {}

class Register extends React.Component<RegisterProps, any> {
  public render() {
    return <div>hello!</div>;
  }
}

const mapState2Props = state => {
  return {};
};

export default connect(mapState2Props)(Register);
