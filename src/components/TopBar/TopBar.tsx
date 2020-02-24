import * as React from "react";
import { useSelector } from "react-redux";
import ChevronDown from "../../images/icons/ChevronDown";
import LoginIcon from "../../images/icons/LoginIcon";
import UserIcon from "../../images/icons/UserIcon";
import { AppState } from "../../redux/configureStore";
import Menu from "./components/Menu/Menu";
import {
  StyledAvatar,
  StyledBody,
  StyledDiv,
  StyledDropDown,
  StyledLink,
  StyledTrigger
} from "./TopBarStyle";

const TopBar: React.SFC = () => {
  const { self } = useSelector((state: AppState) => state.users);
  const { displayName, avatarURL } = self;
  const isLoggedIn = !!self.token;

  return (
    <div>
      {isLoggedIn ? (
        <StyledDiv>
          <StyledDropDown>
            <StyledTrigger>
              <ChevronDown />
              {displayName}
              <StyledAvatar src={avatarURL} />
            </StyledTrigger>
            <StyledBody>
              <Menu />
            </StyledBody>
          </StyledDropDown>
        </StyledDiv>
      ) : (
        <StyledDiv>
          <StyledLink to="/account/register">
            <UserIcon />
            Register
          </StyledLink>
          <StyledLink to="/account/login">
            <LoginIcon />
            Log in
          </StyledLink>
        </StyledDiv>
      )}
    </div>
  );
};

export default TopBar;
