import * as React from "react";
import * as shortid from "shortid";

import styled from "../../theme/styled-components";

const StyledLabel = styled.label`
  text-transform: uppercase;
  color: ${props => props.theme.grey};
  text-decoration: underline;
`;
StyledLabel.displayName = "StyledLabel";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
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
          <StyledLabel htmlFor={props.id}>
            {props.label}
            {props.required && "*"}
          </StyledLabel>
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
          className={props.className}
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
          className={props.className}
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
