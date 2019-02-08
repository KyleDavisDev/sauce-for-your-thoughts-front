import * as React from "react";

import {
  StyledLink,
  StyledHead,
  StyledImage,
  StyledFoot
} from "./ProfileStyle";
import { Button } from "../../../../../Button/Button";

interface ProfileProps {}

const Profile: React.SFC<ProfileProps> = props => {
  return (
    <StyledLink href="#PathToProfile">
      <StyledHead>
        <div>
          <StyledImage
            src="https://images.catsolonline.com/cache/uzyl82mxhzrvloeffavq-500x500.jpg"
            alt="Kyle Davis"
            height="50"
            width="50"
          />
        </div>

        <div>
          <h3>KyleDavisDev</h3>
          <h4>Sauce Fanatic</h4>
        </div>
      </StyledHead>

      <StyledFoot>
        <Button displayType="outline">View profile</Button>
      </StyledFoot>
    </StyledLink>
  );
};

export default Profile;
