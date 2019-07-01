import * as React from "react";

import {
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledTextArea
} from "../../SauceAddStyle";

export interface ISauceIngredientsProps {
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ingredients: string;
}

export default class SauceIngredients extends React.PureComponent<
  ISauceIngredientsProps,
  {}
> {
  public render() {
    return (
      <StyledRow>
        <StyledDescriptor title="Ingredients">
          Which ingredients make up the sauce? This should be a comma seperated
          list found somewhere on the sauce label.
        </StyledDescriptor>
        <StyledRightSide>
          <StyledTextArea
            onChange={this.props.onTextChange}
            label="Ingredients"
            name="ingredients"
            id="ingredients"
            showLabel={true}
            value={this.props.ingredients}
            required={true}
          />
        </StyledRightSide>
      </StyledRow>
    );
  }
}
