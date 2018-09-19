import * as React from "react";
import * as shortid from "shortid";

import styled from "../../../../theme/styled-components";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import UserCube from "../../../../components/UserCube/UserCube";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
`;

const StyledUserCube = styled(UserCube)`
  width: 10%;
`;

interface FeaturedUsersProps {
  className?: string;
}

const FeaturedUsers: React.SFC<FeaturedUsersProps> = props => {
  return (
    <StyledDiv className={props.className}>
      <SectionTitle
        title="Featured Users"
        description="These people have either contributed the most, or are the newest to the site. SFYT's thanks them!"
      />
      {/* Loop over empty array for testing */}
      {new Array(27).fill(undefined).map(x => {
        return (
          <StyledUserCube
            key={shortid.generate()}
            src="../../../../images/avatars/boy-10.png"
            name="Test"
          />
        );
      })}
    </StyledDiv>
  );
};

export default FeaturedUsers;
