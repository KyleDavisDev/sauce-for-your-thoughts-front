import * as React from "react";

import LogoSFYT from "../../images/icons/LogoSFYT";
import PageTitle from "../PageTitle/PageTitle";
import { Link } from "../Link/Link";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledContainer,
  StyledButton,
  StyledGroup
} from "./UserSettingsStyle";

import ArrowRight from "../../images/icons/ArrowRight";
import ArrowLeft from "../../images/icons/ArrowLeft";

import Auth from "../../utils/Auth/Auth";
import { API } from "../../utils/api/API";
import { IErrReturn } from "../../utils/Err/Err";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";

export interface UserSettingsProps {
  history: {
    replace: (location: string) => null;
  };
  location: { pathname: string };
}

export interface UserSettingsState {
  isEmailConfirmed: boolean;
  flashMessage: FlashMessageProps;
}

class UserSettings extends React.Component<
  UserSettingsProps,
  UserSettingsState
> {
  constructor(props: UserSettingsProps) {
    super(props);

    // Init state
    this.state = {
      isEmailConfirmed: true,
      flashMessage: {
        isVisible: false
      }
    };
  }

  public async componentDidMount() {
    // get token or redirect to login
    const token = Auth.getToken();
    if (!token) {
      this.props.history.replace(
        `/account/login?return=${this.props.location.pathname}`
      );
      return;
    }

    // Call API to see if email has been verified or not
    const data = { user: { token } };
    API.user
      .isEmailConfirmed({ data })
      .then(res => {
        // Set state so we know if we should display the button or not
        this.setState({ isEmailConfirmed: res.data.isGood });
      })
      .catch((err: IErrReturn) => {
        // Set state so we know if we should display the button or not
        this.setState({ isEmailConfirmed: err.response.data.isGood });
      });
    window.scrollTo(0, 0); // Move screen to top
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
          <PageTitle>Manage your account</PageTitle>
          <StyledContainer>
            {this.state.flashMessage.isVisible && (
              <FlashMessage type={this.state.flashMessage.type} isVisible>
                {this.state.flashMessage.text}
              </FlashMessage>
            )}

            <StyledGroup>
              <h4>Update email</h4>
              <Link to="/account/UserSettings/email">
                <StyledButton type="button">
                  Update email <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            <StyledGroup>
              <h4>Update Display Name</h4>
              <Link to="/account/UserSettings/displayname">
                <StyledButton type="button">
                  Update Display Name <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            <StyledGroup>
              <h4>Update Avatar</h4>
              <Link to="/account/UserSettings/avatar">
                <StyledButton type="button">
                  Update Avatar <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            <StyledGroup>
              <h4>Update Password</h4>
              <Link to="/account/UserSettings/password">
                <StyledButton type="button">
                  Update Password <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            {!this.state.isEmailConfirmed && (
              <StyledGroup>
                <h4>Request Email Confirmation</h4>
                <StyledButton type="button" onClick={this.onButtonClick}>
                  Request Email Confirmation <ArrowRight />
                </StyledButton>
              </StyledGroup>
            )}

            <Link to="/">
              <StyledButton type="button" displayType="outline">
                <ArrowLeft /> Return Home
              </StyledButton>
            </Link>
          </StyledContainer>
        </StyledArticle>
      </StyledDiv>
    );
  }

  private onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // get token or redirect to login
    const token = Auth.getToken();
    if (!token) {
      this.props.history.replace(
        `/account/login?return=${this.props.location.pathname}`
      );
      return;
    }

    // Call API to see if email has been verified or not
    const data = { user: { token } };
    API.user.resendVerificationEmail({ data }).then(res => {
      // Show flash message and update state
      this.setState({
        ...this.state,
        isEmailConfirmed: true,
        flashMessage: { isVisible: true, text: res.data.msg, type: "success" }
      });
    });
  };
}

export default UserSettings;
