import * as React from "react";
import * as shortid from "shortid";

import styled from "../../../../../../theme/styled-components";

const SelectContainer = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  color: #4b4b4b;
  display: inline-block;
  position: relative;
  background-color: #f5f5f5;
  border-color: #eaeaea;
  border-bottom: 0;
  border-bottom-right-radius: 0;
  border-left: 0;
  border-top: 0;
  border-top-right-radius: 0;

  &:after {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    content: url("../../../../../../images/icons/chevron-down.svg");
    pointer-events: none;
    right: 15px;
  }
`;

const Select = styled.select`
  background-color: transparent;
  appearance: none;
  border: 0;
  cursor: pointer;
  display: inline-block;
  min-height: 30px;
  position: relative;
  transition: background-color 0.3s, color 0.3s, border 0.3s;
  vertical-align: middle;
  height: 58px;
  padding: 0px 40px 0 15px;
  font-size: 1rem;
`;

interface DropDownProps {
  id?: string;

  options: string[];
  selectedValue: string;
  onSelect(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const DropDown: React.SFC<DropDownProps> = props => {
  return (
    <SelectContainer>
      <Select
        id={props.id}
        onChange={props.onSelect}
        value={props.selectedValue}
      >
        {props.options.map(opt => {
          return (
            <option key={shortid.generate()} value={opt}>
              {opt}
            </option>
          );
        })}
      </Select>
    </SelectContainer>
  );
};

DropDown.defaultProps = {
  id: shortid.generate()
};

export default DropDown;
