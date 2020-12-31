import * as React from "react";
import { Link } from "../Link/Link";

import LogoSFYT from "../../images/icons/LogoSFYT";
import Bar from "../../images/icons/Bar";
import {
  StyledNav,
  StyledButton,
  StyledUl,
  StyledLink
} from "./NavigationStyle";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/configureStore";

const Navigation: React.FunctionComponent<{}> = () => {
  // defaults
  const _sauceRedirect = "/account/login?return=/sauce/add";
  const _sauceAdd = "/sauce/add";

  const [isOpen, setIsOpen] = React.useState(false);
  const isLoggedIn = useSelector(
    (store: AppState) => !!store.users.self?.token
  );

  return (
    <StyledNav>
      <Link href="/">
        <LogoSFYT />
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
          {isLoggedIn ? (
            <StyledLink href={_sauceAdd}>Add Sauce</StyledLink>
          ) : (
            <StyledLink href={_sauceRedirect}>Add Sauce</StyledLink>
          )}
        </li>
      </StyledUl>
    </StyledNav>
  );
};

export default Navigation;
