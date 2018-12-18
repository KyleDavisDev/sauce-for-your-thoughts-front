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
  type?: "text" | "textarea" | string; // have to allow 'string' or else styled components complains
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

        {this.props.type && this.props.type.toLowerCase() === "text" ? (
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
