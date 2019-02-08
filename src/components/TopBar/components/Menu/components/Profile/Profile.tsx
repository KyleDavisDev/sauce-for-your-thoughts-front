import * as React from "react";

import {
  StyledLink,
  StyledHead,
  StyledImage,
  StyledFoot
} from "./ProfileStyle";
import { Button } from "../../../../../Button/Button";
import { connect } from "react-redux";
import { IinitialState } from "../../../../../../redux/configureStore";

interface ProfileProps {
  displayName?: string;
}

class Profile extends React.PureComponent<ProfileProps, any> {
  public render() {
    return (
      <StyledLink href="#PathToProfile">
        <StyledHead>
          <div>
            <StyledImage
              src="https://images.catsolonline.com/cache/uzyl82mxhzrvloeffavq-500x500.jpg"
              alt={this.props.displayName}
              height="50"
              width="50"
            />
          </div>

          <div>
            <h3>{this.props.displayName || "Me"}</h3>
            <h4>Sauce Fanatic</h4>
          </div>
        </StyledHead>

        <StyledFoot>
          <Button displayType="outline">View profile</Button>
        </StyledFoot>
      </StyledLink>
    );
  }
}

const mapState2Props = (state: IinitialState) => {
  return { displayName: state.users.self.displayName };
};

export default connect(mapState2Props)(Profile);
