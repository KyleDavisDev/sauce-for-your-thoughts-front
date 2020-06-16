import * as React from "react";

import { Link } from "../Link/Link";
import LogoSFYT from "../../images/icons/LogoSFYT";
import { StyledLogoContainer } from "./HeaderSimpleStyle";

interface IHeaderSimpleProps {}

const HeaderSimple: React.FunctionComponent<IHeaderSimpleProps> = props => {
  return (
    <>
      <StyledLogoContainer>
        <Link to="/">
          <LogoSFYT />
        </Link>
      </StyledLogoContainer>
      <hr />
    </>
  );
};

export default HeaderSimple;
