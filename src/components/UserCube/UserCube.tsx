import * as React from "react";
import styled from "../../theme/styled-components";

const StyledDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  min-height: 100px;
  border: ${props => props.theme.border};
  padding: 1em;
  margin: 0.25em;
`;

const StyledP = styled.p`
  color: ${props => props.theme.black};
  margin-top: 0.5em;
  margin-bottom: 0;
`;

interface UserCubeProps {
  src: string;
  name: string;
  className?: string;
}

const UserCube: React.FC<UserCubeProps> = props => {
  return (
    <StyledDiv className={props.className}>
      <img src={props.src} alt="fill me out later" />
      <StyledP>{props.name}</StyledP>
    </StyledDiv>
  );
};

export default UserCube;
