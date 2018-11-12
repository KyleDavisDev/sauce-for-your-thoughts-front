import * as React from "react";
import styled from "styled-components";
import Label from "../Label/Label";

interface CheckBoxProps {
  checked: boolean;
  id: string;
  value: string;
  label: string;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  className?: string;
}

const CheckBox: React.SFC<CheckBoxProps> = props => {
  return (
    <div className={props.className}>
      <Label htmlFor={props.id}>
        <input
          defaultChecked={props.checked}
          type="checkbox"
          value={props.value}
          id={props.id}
          onClick={props.onClick}
        />
        {props.label}
      </Label>
    </div>
  );
};

const StyledCheckbox = styled(CheckBox)`
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
        ? props.theme.checkBoxActiveBackgroundColor
        : props.theme.checkBoxInActiveBackgroundColor};
    color: ${props =>
      props.checked
        ? props.theme.checkBoxActiveTextColor
        : props.theme.checkBoxInActiveTextColor};
  }
`;

export default StyledCheckbox;
