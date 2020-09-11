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
  const [isOpen, setIsOpen] = React.useState(false);
  const isLoggedIn = useSelector((store: AppState) => !!store.users.self.token);

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
          <StyledLink
            href={
              isLoggedIn ? "/sauce/add" : "/account/login?return=/sauce/add"
            }
          >
            Add Sauce
          </StyledLink>
        </li>
        {/* <li>
            <span>icon here</span>
          </li> */}
      </StyledUl>
    </StyledNav>
  );
};

export default Navigation;
