import * as React from "react";
import { connect } from "react-redux";

import LogoSFYT from "../../../images/icons/LogoSFYT";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Link } from "../../../components/Link/Link";
import { AppState } from "../../../redux/configureStore";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledContainer,
  StyledButton,
  StyledGroup
} from "./SettingsStyle";

import ArrowRight from "../../../images/icons/ArrowRight";
import ArrowLeft from "../../../images/icons/ArrowLeft";

import Auth from "../../../utils/Auth/Auth";
import { API } from "../../../utils/api/API";
import { IErrReturn } from "../../../utils/Err/Err";

export interface SettingsProps {
  history: {
    replace: (location: string) => null;
  };
  location: { pathname: string };
}

export interface SettingsState {
  isEmailConfirmed: boolean;
}

class Settings extends React.Component<SettingsProps, SettingsState> {
  constructor(props: SettingsProps) {
    super(props);

    // Init state
    this.state = {
      isEmailConfirmed: true
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
          <PageTitle>Settings</PageTitle>
          <StyledContainer>
            <StyledGroup>
              <h4>Update email</h4>
              <Link to="/account/settings/email">
                <StyledButton type="button">
                  Update email <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            <StyledGroup>
              <h4>Update Display Name</h4>
              <Link to="/account/settings/displayname">
                <StyledButton type="button">
                  Update Display Name <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            <StyledGroup>
              <h4>Update Avatar</h4>
              <Link to="/account/settings/avatar">
                <StyledButton type="button">
                  Update Avatar <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            <StyledGroup>
              <h4>Update Password</h4>
              <Link to="/account/settings/password">
                <StyledButton type="button">
                  Update Password <ArrowRight />
                </StyledButton>
              </Link>
            </StyledGroup>

            {!this.state.isEmailConfirmed && (
              <StyledGroup>
                <h4>Request Email Confirmation</h4>
                <Link to="/account/settings/password">
                  <StyledButton type="button">
                    Request Email Confirmation <ArrowRight />
                  </StyledButton>
                </Link>
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
}

export default Settings;
