import * as React from "react";
import * as shortid from "shortid";

import Label from "../Label/Label";
import { StyledDiv, StyledInput, StyledTextArea } from "./TextInputStyle";

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
    type: "text"
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
            {this.props.required ? "*" : ""}
          </Label>
        )}

        {/* Make sure prop passed and is either 'text' or 'password' */}
        {this.props.type &&
        (this.props.type.toLowerCase() === "text" ||
          this.props.type.toLowerCase() === "password") ? (
          <StyledInput
            type={this.props.type}
            id={this.state.id}
            name={this.props.name}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
            required={this.props.required}
          />
        ) : (
          <StyledTextArea
            id={this.state.id}
            name={this.props.name}
            cols={30}
            rows={10}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
            value={this.props.value}
            required={this.props.required}
          />
        )}
      </StyledDiv>
    );
  }
}

export default TextInput;
