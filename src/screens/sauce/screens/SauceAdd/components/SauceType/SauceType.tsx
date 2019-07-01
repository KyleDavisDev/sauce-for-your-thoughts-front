import * as React from "react";

import {
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledDiv2
} from "../../SauceAddStyle";
import Label from "../../../../../../components/Label/Label";
import { CheckBox } from "../../../../../../components/CheckBox/CheckBox";

export interface ISauceTypeProps {
  typesOfSauces: {
    [key: string]: { value: string; checked: boolean; key: string };
  };
  onCheckBoxClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export default class SauceType extends React.PureComponent<
  ISauceTypeProps,
  {}
> {
  public render() {
    return (
      <StyledRow>
        <StyledDescriptor title="Type">
          What type of sauce is this? What is it primarily used for?
        </StyledDescriptor>
        <StyledRightSide>
          <StyledDiv2>
            <Label>Type of Sauce</Label>

            {Object.keys(this.props.typesOfSauces).map(type => {
              return (
                <CheckBox
                  id={this.props.typesOfSauces[type].key}
                  key={this.props.typesOfSauces[type].key}
                  value={this.props.typesOfSauces[type].value}
                  label={this.props.typesOfSauces[type].value}
                  checked={this.props.typesOfSauces[type].checked}
                  onClick={this.props.onCheckBoxClick}
                />
              );
            })}
          </StyledDiv2>
        </StyledRightSide>
      </StyledRow>
    );
  }
}
