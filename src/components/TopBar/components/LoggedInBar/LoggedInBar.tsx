import * as React from "react";

import ChevronDown from "../../../../images/icons/ChevronDown";

import Menu from "../Menu/Menu";
import { StyledAvatar, StyledDiv, StyledDropDown } from "../../TopBarStyle";
import Trigger from "../Trigger/Trigger";
import Body from "../Body/Body";

interface ILoggedInBarProps {
  displayName: string;
  avatarURL: string;
}

const LoggedInBar: React.FunctionComponent<ILoggedInBarProps> = props => {
  const { displayName, avatarURL } = props;

  return (
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
  );
};

export default LoggedInBar;
