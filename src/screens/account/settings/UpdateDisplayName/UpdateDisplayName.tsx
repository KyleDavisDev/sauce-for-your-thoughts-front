import * as React from "react";
import { connect } from "react-redux";

import { AppState, MyThunkDispatch } from "../../../../redux/configureStore";
import { updateDisplayName, logout } from "../../../../redux/users/actions";
import LogoSFYT from "../../../../images/icons/LogoSFYT";
import ArrowLeft from "../../../../images/icons/ArrowLeft";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { Link } from "../../../../components/Link/Link";
import { Button } from "../../../../components/Button/Button";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledButtonHolder
} from "./UpdateDisplayNameStyle";
import {
  FlashMessage,
  FlashMessageProps
} from "../../../../components/FlashMessage/FlashMessage";
import { IUserUpdateDisplayName } from "../../../../redux/users/types";
import Auth from "../../../../utils/Auth/Auth";

export interface UpdateDisplayNameProps {
  history: { push: (location: string) => null };
  user: { token: string; displayName: string };
  updateDisplayName: ({
    data,
    oldDisplayName
  }: {
    data: IUserUpdateDisplayName;
    oldDisplayName: string;
  }) => Promise<null>;
  logout: () => null;
}

export interface UpdateDisplayNameState {
  displayName: string;
  confirmDisplayName: string;
  password: string;
  flashMessage: FlashMessageProps;
}

class UpdateDisplayName extends React.Component<
  UpdateDisplayNameProps,
  UpdateDisplayNameState
> {
  constructor(props: UpdateDisplayNameProps) {
    super(props);

    // Init state
    this.state = {
      displayName: "",
      confirmDisplayName: "",
      password: "",
      flashMessage: {
        isVisible: false
      }
    };
  }

  public async componentDidMount() {
    // Get token or else redirect
    const token = Auth.getToken();
    if (!token) {
      this.props.history.push("/account/login?return=/account/settings/email");
      return;
    }
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
          <PageTitle>Update Display Name</PageTitle>
          <StyledFormContainer>
            {this.state.flashMessage.isVisible && (
              <FlashMessage {...this.state.flashMessage}>
                {this.state.flashMessage.text}
              </FlashMessage>
            )}
            <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
              <TextInput
                type="text"
                onChange={this.onTextChange}
                showLabel={true}
                label={"New Display Name"}
                name={"displayName"}
                value={this.state.displayName}
                required={true}
              />
              <TextInput
                type="text"
                onChange={this.onTextChange}
                disabled={!this.toggleConfirmDisplayName()}
                showLabel={true}
                label={"Confirm New Display Name"}
                name={"confirmDisplayName"}
                value={this.state.confirmDisplayName}
                required={true}
              />
              <TextInput
                type="password"
                onChange={this.onPasswordChange}
                disabled={!this.toggleConfirmPassword()}
                showLabel={true}
                label={"Password"}
                name={"password"}
                value={this.state.password}
                required={true}
              />

              <StyledButtonHolder>
                <Link to="/account/settings">
                  <Button type="button" displayType="outline">
                    <ArrowLeft /> Settings
                  </Button>
                </Link>
                <Button type="submit" disabled={!this.toggleUpdateButton()}>
                  Update!
                </Button>
              </StyledButtonHolder>
            </form>
          </StyledFormContainer>
        </StyledArticle>
      </StyledDiv>
    );
  }

  private onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event || !event.target) {
      return;
    }
    // Grab the name and value
    const { name, value }: { name: string; value: string } = event.target;

    // Update local state
    this.setState({
      ...this.state,
      [name]: value,
      password: this.toggleConfirmDisplayName() ? "" : this.state.password // Reset password if necessary
    });
  };

  private onPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!event || !event.target) {
      return;
    }
    // Grab the name and value
    const { value }: { value: string } = event.target;

    // Update local state
    this.setState({
      ...this.state,
      password: value
    });
  };

  private toggleConfirmDisplayName = (): boolean => {
    // If textbox has valid email, enable confirm textbox.
    return this.state.displayName.length > 5;
  };

  private toggleConfirmPassword = (): boolean => {
    return (
      this.toggleConfirmDisplayName() &&
      this.state.displayName === this.state.confirmDisplayName
    );
  };

  private toggleUpdateButton = (): boolean => {
    return this.toggleConfirmPassword() && this.state.password.length > 8;
  };

  private onSubmit = async (event: React.FormEvent): Promise<any> => {
    // Prevent normal form submission
    event.preventDefault();

    // Grab variables
    const { displayName, confirmDisplayName, password } = this.state;

    // Confirm one last time that the values are the same.
    if (displayName !== confirmDisplayName) {
      this.setState({
        flashMessage: {
          isVisible: true,
          text: "Your emails do not match. Please fix this before continuing.",
          type: "alert"
        }
      });
      return;
    }

    // Confirm password is longer than 8 characters
    if (password.length < 8) {
      this.setState({
        flashMessage: {
          isVisible: true,
          text:
            "Your password is too short! Password length must be at least 8 characters.",
          type: "alert"
        }
      });
      return;
    }

    // Get token or else redirect
    const token = Auth.getToken();
    if (!token) {
      this.props.history.push("/account/login?return=/account/settings/email");
      return;
    }

    // Construct data
    const data: IUserUpdateDisplayName = {
      user: { token, displayName, confirmDisplayName, password }
    };
    try {
      await this.props.updateDisplayName({
        data,
        oldDisplayName: this.props.user.displayName
      });

      // clear input and display flash
      this.setState({
        ...this.state,
        displayName: "",
        confirmDisplayName: "",
        password: "",
        flashMessage: {
          isVisible: true,
          text: "Success! Display Name updated.",
          type: "success",
          slug: "/account/settings",
          slugText: "Back to Settings"
        }
      });
    } catch (err) {
      // Account locked
      if (err.response.status === 403) {
        this.props.logout();

        this.props.history.push("/account/login");
        return;
      }

      // Password bad or acc locked so going to reset
      this.setState({
        ...this.state,
        password: "",
        flashMessage: {
          isVisible: true,
          text: err.response.data.msg,
          type: "warning"
        }
      });
    }
  };
}

const mapState2Props = (state: AppState) => {
  return { user: state.users.self };
};

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatch2Props = (dispatch: MyThunkDispatch) => ({
  updateDisplayName: ({
    data,
    oldDisplayName
  }: {
    data: IUserUpdateDisplayName;
    oldDisplayName: string;
  }) => dispatch(updateDisplayName({ data, oldDisplayName })),
  logout: () => dispatch(logout())
});

export default connect(
  mapState2Props,
  mapDispatch2Props
)(UpdateDisplayName);
