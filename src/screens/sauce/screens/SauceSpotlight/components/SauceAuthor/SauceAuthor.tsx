import * as React from "react";
import { connect } from "react-redux";
import { IinitialState } from "../../../../../../redux/configureStore";
import styled from "../../../../../../theme/styled-components";
import { IUser } from "../../../../../../redux/users/types";

const StyledContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  // font-family: AvenirNextReg;
  margin-bottom: 1em;
  padding: 0.75em;
`;

const StyledContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export interface SauceAuthorProps {
  id: string; // this is sauce's id
  author?: IUser; // Will have to find this through redux
}

class SauceAuthor extends React.Component<SauceAuthorProps, any> {
  public render() {
    return (
      <StyledContainer>
        {this.props.author && (
          <StyledContentContainer>
            <i>Author:</i>
            <span>{this.props.author.name}</span>
          </StyledContentContainer>
        )}
      </StyledContainer>
    );
  }
}

const mapState2Props = (state: IinitialState, ownProps: SauceAuthorProps) => {
  // Want to check that we have sauce, the sauce for the page we are on, and users to find the author
  const sauces = state.sauces.byId;
  const users = state.users.byId;
  if (!sauces || !sauces[ownProps.id] || !users) {
    // Return test data
    return { author: { name: "Testy Davox", reviews: 8 } };
  }

  // Return the author of the sauce
  const authorID = sauces[ownProps.id].author;
  return { author: users[authorID] };
};

export default connect(mapState2Props)(SauceAuthor);
