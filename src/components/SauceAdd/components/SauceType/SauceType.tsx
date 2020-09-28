import * as React from "react";

import {
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledDiv2
} from "../../SauceAddStyle";
import Label from "../../../Label/Label";
import { CheckBox } from "../../../CheckBox/CheckBox";

export interface ISauceTypeProps {
  typesOfSauces: {
    [key: string]: { value: string; checked: boolean; key: string };
  };
  onCheckBoxClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const SauceType: React.FC<ISauceTypeProps> = props => {
  // grab types
  const { typesOfSauces } = props;

  // Sanity check
  if (!typesOfSauces) return null;

  return (
    <StyledRow>
      <StyledDescriptor title="Type">
        What type of sauce is this? What is it primarily used for?
      </StyledDescriptor>
      <StyledRightSide>
        <StyledDiv2>
          <Label>Type of Sauce</Label>

          {Object.keys(typesOfSauces).map(type => {
            return (
              <CheckBox
                id={typesOfSauces[type].key}
                key={typesOfSauces[type].key}
                value={typesOfSauces[type].value}
                label={typesOfSauces[type].value}
                checked={typesOfSauces[type].checked}
                onClick={props.onCheckBoxClick}
              />
            );
          })}
        </StyledDiv2>
      </StyledRightSide>
    </StyledRow>
  );
};

export default SauceType;
