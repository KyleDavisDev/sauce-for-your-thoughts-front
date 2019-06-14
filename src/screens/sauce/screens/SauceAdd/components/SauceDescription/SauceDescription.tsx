import * as React from "react";

import {
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledTextArea
} from "../../SauceAddStyle";

export interface ISauceDescriptionProps {
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
}

export default class SauceDescription extends React.PureComponent<
  ISauceDescriptionProps,
  any
> {
  public render() {
    return (
      <StyledRow>
        <StyledDescriptor title="Official Description">
          How does the maker describe the suace and/or flavor? This might be
          found directly on the bottle, a website, in an email, etc. This is NOT
          your review.
        </StyledDescriptor>
        <StyledRightSide>
          <StyledTextArea
            onChange={this.props.onTextChange}
            label="Description"
            name="description"
            id="description"
            showLabel={true}
            value={this.props.description}
            required={true}
          />
        </StyledRightSide>
      </StyledRow>
    );
  }
}
