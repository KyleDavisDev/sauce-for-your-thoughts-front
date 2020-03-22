import * as React from "react";
import * as shortid from "shortid";

import { StyledDiv, StyledTextArea } from "./TextAreaStyle";
import Label from "../Label/Label";

export interface TextAreaProps {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  value?: string | number;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  requirementText?: string;
  onChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void;
}

const TextArea: React.FunctionComponent<TextAreaProps> = props => {
  const {
    showLabel = false,
    required = false,
    disabled = false,
    readOnly = false,
    id = shortid.generate(),
    className,
    label,
    placeholder,
    onChange,
    value,
    maxLength,
    requirementText,
    name
  } = props;

  return (
    <StyledDiv className={className}>
      {showLabel && label && (
        <Label htmlFor={id}>
          {label}
          {required ? <span style={{ color: "#B20000" }}>*</span> : ""}
        </Label>
      )}
      <StyledTextArea
        id={id}
        name={name}
        cols={30}
        rows={10}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        style={{
          marginBottom: requirementText && "0px"
        }}
      />
      {requirementText ? <p>{requirementText}</p> : ""}
    </StyledDiv>
  );
};
export default TextArea;
