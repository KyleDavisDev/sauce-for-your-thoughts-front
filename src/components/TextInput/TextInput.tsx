import * as React from "react";
import * as shortid from "shortid";

import styled from "../../theme/styled-components";

const Label = styled.label`
  text-transform: uppercase;
  color: ${props => props.theme.grey};
  text-decoration: underline;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ababab;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
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

interface TextInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  type?: string; // Need to somehow limit this to only "text" and "textarea"
  value: string | number;
  onChange(): void;
  parentRef(): void;
}

const TextInput: React.SFC<TextInputProps> = props => {
  TextInput.defaultProps = {
    id: shortid.generate(),
    showLabel: false,
    required: false,
    type: "text"
  };
  return (
    <Div>
      {props.showLabel &&
        props.label && (
          <Label htmlFor={props.id}>
            {props.label}
            {props.required && "*"}
          </Label>
        )}

      {props.type && props.type.toLowerCase() === "text" ? (
        <Input
          type={props.type}
          id={props.id}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          required={props.required}
          ref={props.parentRef}
        />
      ) : (
        <TextArea
          id={props.id}
          name={props.name}
          cols={30}
          rows={10}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          required={props.required}
          ref={props.parentRef}
        />
      )}
    </Div>
  );
};

export default TextInput;
