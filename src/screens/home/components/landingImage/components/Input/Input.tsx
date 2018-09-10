import * as React from "react";
import styled from "../../../../../../theme/styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled.input`
  width: 100%;
  min-width: 20em;
  max-width: 100%;
  padding: 0.66em;
  box-sizing: border-box;
  border: 0px;
  font-size: 1em;
`;

interface InputProps {
  id: string;
  name: string;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Input: React.SFC<InputProps> = props => {
  return (
    <Div>
      <StyledInput
        type={"text"}
        id={props.id}
        name={props.name}
        value={props.value}
        placeholder="Search..."
        onChange={props.onChange}
      />
    </Div>
  );
};

export default Input;
