import * as React from "react";
import { connect } from "react-redux";

import { AppState, MyThunkDispatch } from "../../../../redux/configureStore";
import { updateEmail, logout } from "../../../../redux/users/actions";
import LogoSFYT from "../../../../images/icons/LogoSFYT";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { Link } from "../../../../components/Link/Link";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer
} from "./ConfirmEmailStyle";
import {
  FlashMessage,
  FlashMessageProps
} from "../../../../components/FlashMessage/FlashMessage";
import { IUserUpdateEmail } from "../../../../redux/users/types";
import Auth from "../../../../utils/Auth/Auth";

export interface UpdateEmailProps {
  history: { push: (location: string) => null };
  user: { token: string; displayName: string; avatarURL: string };
  updateEmail: ({ data }: { data: IUserUpdateEmail }) => Promise<null>;
  logout: () => null;
}

export interface UpdateEmailState {
  flashMessage: FlashMessageProps;
}

class UpdateEmail extends React.Component<UpdateEmailProps, UpdateEmailState> {
  constructor(props: UpdateEmailProps) {
    super(props);

    // Init state
    this.state = {
      flashMessage: {
        isVisible: false
      }
    };
  }

  public async componentDidMount() {}

  public render() {
    return (
      <StyledDiv>
        <StyledLogoContainer>
          <Link to="/">
            <LogoSFYT />
          </Link>
        </StyledLogoContainer>
        <hr />
        <StyledArticle>
          <PageTitle>Update Email</PageTitle>
          <StyledFormContainer>
            {this.state.flashMessage.isVisible && (
              <FlashMessage {...this.state.flashMessage}>
                {this.state.flashMessage.text}
              </FlashMessage>
            )}
          </StyledFormContainer>
        </StyledArticle>
      </StyledDiv>
    );
  }
}

const mapState2Props = (state: AppState) => {
  return { user: state.users.self };
};

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatch2Props = (dispatch: MyThunkDispatch) => ({
  updateEmail: ({
    data
  }: {
    data: IUserUpdateEmail;
    token: string;
    displayName: string;
    avatarURL: string;
  }) => dispatch(updateEmail({ data })),
  logout: () => dispatch(logout())
});

export default connect(
  mapState2Props,
  mapDispatch2Props
)(UpdateEmail);
