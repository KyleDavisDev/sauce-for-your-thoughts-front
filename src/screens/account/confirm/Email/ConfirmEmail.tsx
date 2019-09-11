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
import { API } from "../../../../utils/api/API";
import { IErrReturn } from "../../../../utils/Err/Err";

export interface UpdateEmailProps {
  history: { push: (location: string) => null };
  match?: { params?: { email?: string } };
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

  public async componentDidMount() {
    // Make sure we have something to work with
    if (
      !this.props.match ||
      !this.props.match.params ||
      !this.props.match.params.email
    ) {
      this.props.history.push("/");
      return;
    }

    // Grab email
    const email = this.props.match.params.email;

    // Call API to validate email
    await API.user
      .confirmEmail({ data: { email } })
      .then(res => {
        this.setState({
          flashMessage: {
            isVisible: true,
            text: res.data.msg,
            type: res.data.isGood ? "success" : "alert",
            slug: "/sauces",
            slugText: "Click here to start finding Sauces!"
          }
        });
      })
      .catch((err: IErrReturn) => {
        this.setState({
          flashMessage: {
            isVisible: true,
            text:
              err.response.data.msg +
              " Please contact SFYT admins at sfytadmin@gmail.com if this continues to occur.",
            type: err.response.data.isGood ? "success" : "alert",
            slug: ""
          }
        });
      });
  }

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
          <PageTitle>Confirm Email</PageTitle>
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
