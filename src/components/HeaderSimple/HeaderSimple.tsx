import * as React from "react";

import { Link } from "../Link/Link";
import LogoSFYT from "../../images/icons/LogoSFYT";
import { StyledLogoContainer } from "./HeaderSimpleStyle";

interface IHeaderSimpleProps {}

const HeaderSimple: React.FunctionComponent<IHeaderSimpleProps> = props => {
  return (
    <header>
      <StyledLogoContainer>
        <Link href="/">
          <LogoSFYT />
        </Link>
      </StyledLogoContainer>
      <hr />
    </header>
  );
};

export default HeaderSimple;
