import * as React from "react";
import { connect } from "react-redux";
import { IinitialState } from "../../../../../../redux/configureStore";

export interface SauceAuthorProps {}

class SauceAuthor extends React.Component<SauceAuthorProps, any> {
  public render() {
    return <div>I'm an author!!</div>;
  }
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

export default connect(mapState2Props)(SauceAuthor);
