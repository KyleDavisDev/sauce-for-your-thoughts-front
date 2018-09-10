import * as React from "react";
import * as shortid from "shortid";

import styled from "../../theme/styled-components";

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

interface DropDownProps {
  id?: string;
  options: string[];
  selectedValue: string;
  className?: string;
  onSelect(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const DropDown: React.SFC<DropDownProps> = props => {
  return (
    <SelectContainer>
      <select
        id={props.id}
        onChange={props.onSelect}
        value={props.selectedValue}
        className={props.className}
      >
        {props.options.map(opt => {
          return (
            <option key={shortid.generate()} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </SelectContainer>
  );
};

DropDown.defaultProps = {
  id: shortid.generate()
};

export default DropDown;
