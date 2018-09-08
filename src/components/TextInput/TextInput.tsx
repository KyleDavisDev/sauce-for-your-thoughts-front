import * as React from "react";
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
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  type?: string;
  value: string | number;
  onChange(): void;
  parentRef(): void;
}

interface TextInputState {}

class TextInput extends React.Component<TextInputProps, TextInputState> {
  private defaultProps = {
    showLabel: false,
    required: false,
    type: "text"
  };

  constructor(props: TextInputProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const {
      id,
      name,
      onChange,
      parentRef,
      placeholder,
      required,
      label,
      showLabel,
      type,
      value
    } = this.props;
    return (
      <Div>
        {showLabel &&
          label && (
            <Label htmlFor={id}>
              {label}
              {required && "*"}
            </Label>
          )}

        {type && type.toLowerCase() === "text" ? (
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
        ) : (
          <TextArea
            id={id}
            name={name}
            cols={30}
            rows={10}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required={required}
            ref={parentRef}
          />
        )}
      </Div>
    );
  }
}

export default TextInput;
