import * as React from "react";
import * as shortid from "shortid";

import styled from "../../theme/styled-components";
import Label from "../Label/Label";

const SelectContainer = styled.div`
  border: 1px solid #e1e1e1;
  color: #4b4b4b;
  display: inline-block;
  position: relative;
  background-color: #f5f5f5;

  &:after {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    content: url("../../../../../../images/icons/chevron-down.svg");
    pointer-events: none;
    right: 15px;
  }
`;

const StyledSelect = styled.select`
  background-color: transparent;
  appearance: none;
  border: 0;
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: background-color 0.3s, color 0.3s, border 0.3s;
  vertical-align: middle;
  height: 58px;
  padding: 0px 40px 0 15px;
  font-size: 1rem;
`;
StyledSelect.displayName = "StyledSelect"; // useful for testing

interface DropDownProps {
  id?: string;
  options: string[];
  selectedValue?: string;
  className?: string;
  showLabel?: boolean;
  label?: string;
  required?: boolean;
  onSelect(event: React.ChangeEvent<HTMLSelectElement>): void;
}

class DropDown extends React.PureComponent<DropDownProps, {}> {
  public static defaultProps = {
    id: shortid.generate(),
    showLabel: false,
    required: false
  };

  public componentWillMount() {
    // Either accept id from parent or generate unique id
    this.setState({ id: !this.props.id ? shortid.generate() : this.props.id });
  }

  public render() {
    return (
      <div className={this.props.className} style={{ width: "100%" }}>
        {this.props.showLabel && this.props.label && (
          <Label htmlFor={this.props.id}>
            {this.props.label}
            {this.props.required ? "*" : ""}
          </Label>
        )}
        <SelectContainer>
          <StyledSelect
            id={this.props.id}
            onChange={this.props.onSelect}
            value={this.props.selectedValue}
            className={this.props.className}
          >
            {this.props.options.map(opt => {
              return (
                <option key={shortid.generate()} value={opt}>
                  {opt}
                </option>
              );
            })}
          </StyledSelect>
        </SelectContainer>
      </div>
    );
  }
}

export default DropDown;
