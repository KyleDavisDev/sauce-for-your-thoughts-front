import * as React from "react";
import styled from "styled-components";

interface CheckBoxProps {
  checked: boolean;
  id: string;
  value: string;
  label: string;
  className?: string;
}

const CheckBox: React.SFC<CheckBoxProps> = props => {
  return (
    <div className={props.className}>
      <input type="checkbox" value={props.value} id={props.id} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

const StyledCheckbox = styled(CheckBox)`
  position: relative;
  left: 25px;

  input {
    z-index: 5;
    position: absolute;
    top: 10px;
    left: -10px;
  }

  label {
    position: absolute;
    padding: 10px 10px 10px 30px;
    left: -20px;

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
