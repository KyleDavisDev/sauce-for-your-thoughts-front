import * as React from "react";
import styled from "styled-components";
import Label from "../Label/Label";

interface RadioButtonProps {
  checked: boolean;
  id: string;
  value: string;
  label: string | JSX.Element;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
  key?: string;
}

const RadioButton: React.SFC<RadioButtonProps> = props => {
  return (
    <div className={props.className} key={props.key}>
      <Label htmlFor={props.id}>
        <input
          defaultChecked={props.checked}
          type="radio"
          name={props.name}
          value={props.value}
          id={props.id}
          onClick={props.onClick}
        />
        {props.label}
      </Label>
    </div>
  );
};

const StyledRadioButton = styled(RadioButton)`
  display: inline-block;
  padding: 5px 1rem 5px 0;
  box-sizing: border-box;

  input {
    margin-right: 5px;
  }

  label {
    padding: 10px 10px 10px 10px;
    background-color: ${props =>
      props.checked
        ? props.theme.radioButtonActiveBackgroundColor
        : props.theme.radioButtonInActiveBackgroundColor};
    color: ${props =>
      props.checked
        ? props.theme.radioButtonActiveTextColor
        : props.theme.radioButtonInActiveTextColor};
  }
`;

export { StyledRadioButton as RadioButton };
