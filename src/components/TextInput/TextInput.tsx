import * as React from "react";
import * as shortid from "shortid";

import styled from "../../theme/styled-components";
import Label from "../Label/Label";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ababab;
  margin-top: 5px;
  margin-bottom: 15px;
`;
StyledInput.displayName = "StyledInput";

const StyledTextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ababab;
  margin-top: 5px;
  margin-bottom: 15px;
  min-width: 100%;
  min-height: 35px;
  max-height: 220px;
`;
StyledTextArea.displayName = "StyledTextArea";

interface TextInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  type?: "text" | "textarea";
  value?: string | number;
  className?: string;
  onChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void;
}

const TextInput: React.SFC<TextInputProps> = props => {
  return (
    <StyledDiv className={props.className}>
      {props.showLabel &&
        props.label && (
          <Label htmlFor={props.id}>
            {props.label}
            {props.required ? "*" : ""}
          </Label>
        )}

      {props.type && props.type.toLowerCase() === "text" ? (
        <StyledInput
          type={props.type}
          id={props.id}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          required={props.required}
        />
      ) : (
        <StyledTextArea
          id={props.id}
          name={props.name}
          cols={30}
          rows={10}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          required={props.required}
        />
      )}
    </StyledDiv>
  );
};
TextInput.defaultProps = {
  id: shortid.generate(),
  showLabel: false,
  required: false,
  type: "text"
};

export default TextInput;
