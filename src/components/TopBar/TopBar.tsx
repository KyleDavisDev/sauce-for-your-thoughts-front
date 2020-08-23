import * as React from "react";
import { useSelector } from "react-redux";
import ChevronDown from "../../images/icons/ChevronDown";
import LoginIcon from "../../images/icons/LoginIcon";
import UserIcon from "../../images/icons/UserIcon";
import { AppState } from "../../redux/configureStore";
import Menu from "./components/Menu/Menu";
import {
  StyledAvatar,
  StyledDiv,
  StyledDropDown,
  StyledLink
} from "./TopBarStyle";
import Trigger from "./components/Trigger/Trigger";
import Body from "./components/Body/Body";

const TopBar: React.FC = () => {
  const { self } = useSelector((state: AppState) => {
    return state.users;
  });
  const { displayName, avatarURL } = self;
  const isLoggedIn = !!self.token;

  return (
    <header>
      {isLoggedIn && displayName && avatarURL ? (
        <StyledDiv>
          <StyledDropDown>
            <Trigger>
              <ChevronDown />
              {displayName}
              <StyledAvatar
                src={avatarURL}
                onError={e => {
                  const elem = e.target as HTMLImageElement;
                  elem.src =
                    "https://res.cloudinary.com/foryourthoughts/image/upload/v1575867983/avatars/r0pnn1izbqm6wopt8lvq_lgq9q6.png";
                }}
              />
            </Trigger>
            <Body>
              <Menu />
            </Body>
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
    </header>
  );
};

export default TopBar;
