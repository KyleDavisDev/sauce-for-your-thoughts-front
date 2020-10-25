import * as React from "react";

import { StyledButton, StyledDiv } from "./GroupStyle";
import ArrowRight from "../../../../images/icons/ArrowRight";
import { Link } from "../../../Link/Link";

interface IGroupProps {
  name: string;
  href: string;
}

const Group: React.FC<IGroupProps> = props => {
  return (
    <StyledDiv>
      <h4>{props.name}</h4>
      <Link href={`${props.href}`}>
        <StyledButton type="button">
          {props.name} <ArrowRight />
        </StyledButton>
      </Link>
    </StyledDiv>
  );
};

export default Group;
