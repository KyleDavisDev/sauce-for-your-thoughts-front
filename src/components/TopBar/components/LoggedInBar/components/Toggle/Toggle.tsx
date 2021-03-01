import * as React from "react";

import { StyledButton, StyledAvatar } from "./ToggleStyle";
import ChevronDown from "../../../../../../images/icons/ChevronDown";
import { AppState } from "../../../../../../redux/configureStore";
import { useSelector } from "react-redux";

export interface ToggleProps {
  className?: string;
  onClick?: (e: any) => void;
}

const Toggle: React.FC<ToggleProps> = props => {
  const _defaultDisplayName = "N/A";
  const _defaultAvatarURL = "";

  const { self } = useSelector((state: AppState) => {
    return state.users;
  });

  const displayName =
    self && self.displayName ? self.displayName : _defaultDisplayName;
  const avatarURL = self && self.avatarURL ? self.avatarURL : _defaultAvatarURL;

  return (
    <StyledButton className={props.className} onClick={props.onClick}>
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
    </StyledButton>
  );
};
Toggle.displayName = "Toggle";

export default Toggle;
