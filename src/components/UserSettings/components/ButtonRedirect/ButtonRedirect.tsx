import * as React from "react";

import { StyledButton, StyledDiv } from "./ButtonRedirectStyle";
import ArrowRight from "../../../../images/icons/ArrowRight";
import { Link } from "../../../Link/Link";

interface IButtonRedirectProps {
  name: string;
  href: string;
}

const ButtonRedirect: React.FC<IButtonRedirectProps> = props => {
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

export default ButtonRedirect;
