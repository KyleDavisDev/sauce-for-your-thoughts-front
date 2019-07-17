import * as React from "react";
import { connect } from "react-redux";

import { Settings } from "../../../redux/users/actions";
import { ISettingsUser } from "../../../redux/users/types";
import LogoSFYT from "../../../images/icons/LogoSFYT";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Link } from "../../../components/Link/Link";
import { AppState } from "../../../redux/configureStore";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledButton
} from "./SettingsStyle";
import {
  FlashMessage,
  FlashMessageProps
} from "../../../components/FlashMessage/FlashMessage";
import ArrowRight from "../../../images/icons/ArrowRight";

export interface SettingsProps {
  Settings: any;
  history: { push: (location: string) => null };
}

export interface SettingsState {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  flashMessage: FlashMessageProps;
}

class Settings extends React.Component<SettingsProps, SettingsState> {
  constructor(props: SettingsProps) {
    super(props);

    // Init state
    this.state = {
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      displayName: "",
      flashMessage: {
        isVisible: false
      }
    };
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
          <StyledFormContainer>
            <p>Edit Profile</p>

            <Link to="/account/settings/profile">
              <StyledButton type="button">
                Edit Profile <ArrowRight />
              </StyledButton>
            </Link>
          </StyledFormContainer>
        </StyledArticle>
      </StyledDiv>
    );
  }
}

const mapState2Props = (state: AppState) => {
  return {};
};

const mapDispatch2Props = {};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(Settings);
