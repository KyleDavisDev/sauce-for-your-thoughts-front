import * as React from "react";
import Link from "next/link";

import LogoSFYT from "../../images/icons/LogoSFYT";
import Bar from "../../images/icons/Bar";
import {
  StyledNav,
  StyledButton,
  StyledUl,
  StyledLink
} from "./NavigationStyle";

const Navigation: React.FunctionComponent<{}> = props => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <StyledNav>
      <Link href="/">
        <a>
          <LogoSFYT />
        </a>
      </Link>
      <StyledButton onClick={e => setIsOpen(!isOpen)}>
        <Bar />
      </StyledButton>
      <StyledUl
        style={{
          maxHeight: isOpen ? "99999px" : "0",
          display: isOpen ? "flex" : "none"
        }}
      >
        <li>
          <StyledLink href="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink href="/sauces">Sauces</StyledLink>
        </li>
        <li>
          <StyledLink href="/sauce/add">Add Sauce</StyledLink>
        </li>
        {/* <li>
            <span>icon here</span>
          </li> */}
      </StyledUl>
    </StyledNav>
  );
};

export default Navigation;
