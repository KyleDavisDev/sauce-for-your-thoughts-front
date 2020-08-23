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

const DropDown: React.FC<DropDownProps> = props => {
  // get info from props and assign defaults if needed
  const {
    className,
    options,
    name,
    label,
    onSelect,
    selectedValue,
    id = shortid.generate(),
    showLabel = false,
    required = false
  } = props;

  return (
    <div className={className}>
      {showLabel && label && (
        <Label htmlFor={id}>
          {label}
          {required ? "*" : ""}
        </Label>
      )}
      <SelectContainer>
        <StyledSelect
          id={id}
          onChange={onSelect}
          value={selectedValue}
          name={name}
        >
          {options.map(opt => {
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
};

export default DropDown;
