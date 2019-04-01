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
    required: false
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
      </StyledDiv>
    );
  }
}
