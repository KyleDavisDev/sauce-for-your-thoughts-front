import * as React from "react";
import { connect } from "react-redux";
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

export interface TopBarProps {
  isLoggedIn?: boolean;
  displayName?: string;
  avatarURL?: string;
}

const TopBar: React.SFC<TopBarProps> = props => {
  return (
    <div>
      {props.isLoggedIn ? (
        <StyledDiv>
          <StyledDropDown>
            <StyledTrigger>
              <ChevronDown />
              {props.displayName}
              <StyledAvatar src={props.avatarURL} />
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
TopBar.defaultProps = {
  isLoggedIn: false
};

const mapState2Props = (state: AppState) => {
  const { self } = state.users;
  if (!self) return {};

  return {
    isLoggedIn: !!state.users.self.token, // will be bool
    displayName: state.users.self.displayName,
    avatarURL: state.users.self.avatarURL
  };
};

const mapDispatch2Props = {};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(TopBar);
