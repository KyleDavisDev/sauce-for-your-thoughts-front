import * as React from "react";
import styled from "../../../../../../theme/styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: row;
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
