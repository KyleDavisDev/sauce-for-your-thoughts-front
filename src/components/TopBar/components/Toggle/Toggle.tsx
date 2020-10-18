import * as React from "react";

import { StyledButton, StyledAvatar } from "./ToggleStyle";
import ChevronDown from "../../../../images/icons/ChevronDown";
import { AppState } from "../../../../redux/configureStore";
import { useSelector } from "react-redux";

interface ToggleProps {
  className?: string;
  onClick?: () => any;
}

const Toggle: React.FC<ToggleProps> = props => {
  const { self } = useSelector((state: AppState) => {
    return state.users;
  });

  const { displayName = "N/A", avatarURL = "" } = self ? self : {};

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
