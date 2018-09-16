import * as React from "react";

import styled from "../../../../theme/styled-components";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import UserCube from "../../../../components/UserCube/UserCube";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

interface FeaturedUsersProps {}

const FeaturedUsers: React.SFC<FeaturedUsersProps> = props => {
  return (
    <StyledDiv>
      <SectionTitle
        title="Featured Users"
        description="These people have either contributed the most, or are the newest to the site. SFYT's thanks them!"
      />

      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
      <UserCube src="../../../../images/avatars/boy-10.png" name="Test" />
    </StyledDiv>
  );
};

export default FeaturedUsers;
