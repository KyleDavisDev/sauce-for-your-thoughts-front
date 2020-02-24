import * as React from "react";
import shortid from "shortid";

import Label from "../Label/Label";
import { SelectContainer, StyledSelect } from "./DropDownStyle";

interface DropDownProps {
  id?: string;
  options: string[];
  selectedValue?: string;
  name?: string;
  className?: string;
  showLabel?: boolean;
  label?: string;
  required?: boolean;
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface DropDownState {
  id: string;
}

class DropDown extends React.PureComponent<DropDownProps, DropDownState> {
  public static defaultProps = {
    showLabel: false,
    required: false
  };

  state = { id: !this.props.id ? shortid.generate() : this.props.id };

  public render() {
    return (
      <div className={this.props.className}>
        {this.props.showLabel && this.props.label && (
          <Label htmlFor={this.state.id}>
            {this.props.label}
            {this.props.required ? "*" : ""}
          </Label>
        )}
        <SelectContainer>
          <StyledSelect
            id={this.state.id}
            onChange={this.props.onSelect}
            value={this.props.selectedValue}
            name={this.props.name}
          >
            {this.props.options.map(opt => {
              return (
                <option key={shortid.generate()} value={opt.toLowerCase()}>
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
