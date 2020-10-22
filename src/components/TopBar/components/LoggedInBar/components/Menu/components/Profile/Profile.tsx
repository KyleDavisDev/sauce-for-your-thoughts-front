import * as React from "react";
import { useSelector } from "react-redux";

import {
  StyledLink,
  StyledHead,
  StyledImage,
  StyledFoot
} from "./ProfileStyle";
import { Button } from "../../../../../../../Button/Button";
import { AppState } from "../../../../../../../../redux/configureStore";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = props => {
  const _defaultDisplayName = "N/A";
  const _defaultAvatarURL = "";

  const { self } = useSelector((state: AppState) => {
    return state.users;
  });

  const {
    displayName = _defaultDisplayName,
    avatarURL = _defaultAvatarURL
  } = self ? self : {};

  return (
    <StyledLink href="#">
      <StyledHead>
        <div>
          <StyledImage
            src={avatarURL}
            alt={displayName}
            height="50"
            width="50"
            onError={e => {
              const elem = e.target as HTMLImageElement;
              elem.src =
                "https://res.cloudinary.com/foryourthoughts/image/upload/v1575867983/avatars/r0pnn1izbqm6wopt8lvq_lgq9q6.png";
            }}
          />
        </div>

        <div>
          <h3>{displayName || "Me"}</h3>
          <h4>Sauce Fanatic</h4>
        </div>
      </StyledHead>

      <StyledFoot>
        <Button displayType="outline">View profile (Coming Soon)</Button>
      </StyledFoot>
    </StyledLink>
  );
};

const mapState2Props = (state: AppState) => {
  const { self } = state.users;
  if (!self) return {};

  const { displayName, avatarURL } = self;
  if (!displayName || !avatarURL) return {};

  return {
    displayName,
    avatarURL
  };
};

export default Profile;
