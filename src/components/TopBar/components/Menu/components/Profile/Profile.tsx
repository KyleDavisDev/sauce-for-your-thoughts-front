import * as React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  padding: 12px;
  display: inline-block;
`;

const StyledHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-top;
`;

const StyledImage = styled.img`
  border-radius: 50%;
`;

interface ProfileProps {}

const Profile: React.SFC<ProfileProps> = props => {
  return (
    <StyledLink href="#PathToProfile">
      <StyledHead>
        <div>
          <StyledImage
            src="https://images.catsolonline.com/cache/uzyl82mxhzrvloeffavq-500x500.jpg"
            alt="Kyle Davis"
            height="70"
            width="70"
          />
        </div>

        <div>
          <h3>KyleDavisDev</h3>
          <h4>Sauce Fanatic</h4>
        </div>
      </StyledHead>

      <div>
        <span>View profile</span>
      </div>
    </StyledLink>
  );
};

export default Profile;
