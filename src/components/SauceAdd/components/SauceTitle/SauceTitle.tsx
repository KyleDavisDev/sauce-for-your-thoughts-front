import * as React from "react";

import {
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledTextInput
} from "../../SauceAddStyle";

export interface ISauceTitleProps {
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  maker: string;
}

export class SauceTitle extends React.PureComponent<ISauceTitleProps, any> {
  public render() {
    return (
      <StyledRow>
        <StyledDescriptor title="Title">
          What is the name of the sauce? Who is the maker? This is required.
        </StyledDescriptor>
        <StyledRightSide>
          <StyledTextInput
            onChange={this.props.onTextChange}
            label="Name"
            name="name"
            id="name"
            showLabel={true}
            value={this.props.name}
            required={true}
          />
          <StyledTextInput
            onChange={this.props.onTextChange}
            label="Maker"
            name="maker"
            id="maker"
            showLabel={true}
            value={this.props.maker}
            required={true}
          />
        </StyledRightSide>
      </StyledRow>
    );
  }
}
