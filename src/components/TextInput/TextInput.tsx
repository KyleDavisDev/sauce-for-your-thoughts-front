import * as React from "react";
import * as shortid from "shortid";

import Label from "../Label/Label";
import { StyledDiv, StyledInput } from "./TextInputStyle";
import styled from "../../theme/styled-components";

interface TextInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  type?: "text" | "textarea" | "password" | string; // have to allow 'string' or else styled components complains
  value?: string | number;
  className?: string;
  disabled?: boolean;
  requirementText?: string;
  onChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void;
}

interface TextInputState {
  id: string;
}

class TextInput extends React.PureComponent<TextInputProps, TextInputState> {
  public static defaultProps = {
    showLabel: false,
    required: false,
    type: "text",
    disabled: false
  };

  public componentWillMount() {
    // Either accept id from parent or generate unique id
    this.setState({ id: !this.props.id ? shortid.generate() : this.props.id });
  }

  public render() {
    return (
      <StyledDiv className={this.props.className}>
        {this.props.showLabel && this.props.label && (
          <Label htmlFor={this.state.id}>
            {this.props.label}
            {this.props.required ? (
              <span style={{ color: "#B20000" }}>*</span>
            ) : (
              ""
            )}
          </Label>
        )}

        {/* Make sure prop passed and is either 'text' or 'password' */}
        {this.props.type && (
          <StyledInput
            type={this.props.type}
            id={this.state.id}
            name={this.props.name}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
            required={this.props.required}
            aria-required={this.props.required}
            disabled={this.props.disabled}
            aria-disabled={this.props.disabled}
            style={{
              marginBottom: this.props.requirementText && "0px"
            }}
          />
        )}
        {this.props.requirementText ? (
          <p
            style={{
              fontSize: ".85rem",
              marginTop: "1px",
              marginBottom: "15px"
            }}
          >
            {this.props.requirementText}
          </p>
        ) : (
          ""
        )}
      </StyledDiv>
    );
  }
}

const StyledTextInput = styled(TextInput)`
  input {
    background-color: ${props => (props.disabled ? "#eee" : props.theme.white)};
    box-shadow: none;

    :hover,
    :focus {
      cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    }
  }
`;

export { StyledTextInput as TextInput };
