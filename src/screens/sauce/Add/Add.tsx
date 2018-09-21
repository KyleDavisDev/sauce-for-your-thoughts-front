import * as React from "react";

export interface AddProps {}

export interface AddState {}

class Add extends React.Component<AddProps, AddState> {
  constructor(props: AddProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div />;
  }
}

export default Add;
