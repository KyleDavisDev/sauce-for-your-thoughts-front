import * as React from "react";
import styled from "../../theme/styled-components";

export interface TextInputProps {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  title?: string;
  type?: string;
  value: string | number;
  theme?: any;
  onChange(): void;
  parentRef(): void;
}

const Label = styled.label`
  text-transform: uppercase;
  color: ${props => props.theme.primaryColor || "blue"};
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

export class TextInput extends React.Component<TextInputProps, {}> {
  public render() {
    const {
      id,
      name,
      onChange,
      parentRef,
      placeholder,
      required,
      title,
      type,
      value,
      theme
    } = this.props;
    return (
      <Div>
        <Label htmlFor={id} theme={theme}>
          {title}
          {required && "*"}
        </Label>

        {type && type.toLowerCase() === "textarea" ? (
          <TextArea
            id={id}
            name={name}
            cols="30"
            rows="10"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required={required}
            ref={parentRef}
          />
        ) : (
          <Input
            type={type || "text"}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            ref={parentRef}
          />
        )}
      </Div>
    );
  }
}
