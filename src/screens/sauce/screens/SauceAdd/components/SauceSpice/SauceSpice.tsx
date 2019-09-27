import * as React from "react";

import {
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledTextInput
} from "../../SauceAddStyle";

export interface ISauceSpiceProps {
  shu?: number | string;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class SauceSpice extends React.PureComponent<
  ISauceSpiceProps,
  any
> {
  public render() {
    return (
      <StyledRow>
        <StyledDescriptor title="Spice">
          Is this sauce spicy? How spicy is it? What does the maker say the
          Scoville Heat Unit (SHU) rating is? Note: this may only be applicable
          to Hot Sauces.
        </StyledDescriptor>
        <StyledRightSide>
          <StyledTextInput
            onChange={this.props.onTextChange}
            label="SHU"
            name="shu"
            id="shu"
            showLabel={true}
            value={this.props.shu || ""}
          />
        </StyledRightSide>
      </StyledRow>
    );
  }
}
