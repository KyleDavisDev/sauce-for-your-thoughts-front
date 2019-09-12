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
  readonly?: boolean;
  requirementText?: string;
  onChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void;
}

interface TextAreaState {
  id: string;
}

export default class TextArea extends React.PureComponent<
  TextAreaProps,
  TextAreaState
> {
  public static defaultProps = {
    showLabel: false,
    required: false,
    disabled: false,
    readOnly: false
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
        <StyledTextArea
          id={this.state.id}
          name={this.props.name}
          cols={30}
          rows={10}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          value={this.props.value}
          required={this.props.required}
          disabled={this.props.disabled}
          readOnly={this.props.readonly}
          style={{
            marginBottom: this.props.requirementText && "0px"
          }}
        />
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
