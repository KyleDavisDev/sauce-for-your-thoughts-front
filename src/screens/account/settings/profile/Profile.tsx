import * as React from "react";
import { connect } from "react-redux";
import validator from "validator";

// import { Profile } from "../../../../redux/users/actions";
// import { IRegisterUser } from "../../../../redux/users/types";
import LogoSFYT from "../../../../images/icons/LogoSFYT";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { Link } from "../../../../components/Link/Link";
import { AppState, MyThunkDispatch } from "../../../../redux/configureStore";
import { getInfo } from "../../../../redux/users/actions";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledButton
} from "./ProfileStyle";
import {
  FlashMessage,
  FlashMessageProps
} from "../../../../components/FlashMessage/FlashMessage";

export interface ProfileProps {
  history: { push: (location: string) => null };
  getInfo: ({
    data
  }: {
    data: { user: { token: string }; displayName: string };
  }) => Promise<null>;
  user: { token: string; displayName: string };
}

export interface ProfileState {
  original: {
    email: string;
    displayName: string;
  };
  updated: {
    email: string;
    confirmEmail: string;
    displayName: string;
  };
  password: string;
  enabled: {
    password: boolean;
    email: boolean;
  };
  flashMessage: FlashMessageProps;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);

    // Init state
    this.state = {
      original: {
        email: "",
        displayName: ""
      },
      updated: {
        email: "",
        confirmEmail: "",
        displayName: ""
      },
      password: "",
      enabled: {
        email: false,
        password: false
      },
      flashMessage: {
        isVisible: false
      }
    };
  }

  public async componentDidMount() {
    const { token, displayName } = this.props.user;
    const data = { user: { token }, displayName };
    await this.props.getInfo({ data });
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
          <PageTitle>Profile</PageTitle>
          <StyledFormContainer>
            {this.state.flashMessage.isVisible && (
              <FlashMessage type={this.state.flashMessage.type} isVisible>
                {this.state.flashMessage.text}
              </FlashMessage>
            )}
            <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
              <TextInput
                type="email"
                onChange={this.onTextChange}
                showLabel={true}
                label={"Email"}
                name={"email"}
                value={this.state.updated.email}
                required={true}
              />
              <TextInput
                type="email"
                onChange={this.onTextChange}
                disabled={!this.state.enabled.email}
                showLabel={true}
                label={"Confirm Email"}
                name={"confirmEmail"}
                value={this.state.updated.confirmEmail}
                required={true}
              />
              <TextInput
                type="text"
                onChange={this.onTextChange}
                showLabel={true}
                label={"Display Name"}
                name={"displayName"}
                value={this.state.updated.displayName}
                required={true}
              />
              <TextInput
                type="password"
                onChange={this.onPasswordChange}
                disabled={!this.toggleConfirmPassword()}
                showLabel={true}
                label={"Password"}
                name={"password"}
                value={this.state.enabled.password ? this.state.password : ""}
                required={true}
              />

              <StyledButton type="submit">Update</StyledButton>
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

    // Check if we should enable 'confirm email' box
    const enabledEmail = this.toggleConfirmEmail(name, value);

    // Check if we should enable 'confirm password' box
    const enabledPassword = enabledEmail;
    // Update local state
    this.setState({
      ...this.state,
      updated: { ...this.state.updated, [name]: value },
      enabled: { ...this.state.enabled, email: enabledEmail }
    });
  };

  private onPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!event || !event.target) {
      return;
    }
    // Grab the name and value
    let { value }: { name: string; value: string } = event.target;

    // Check if we should enable 'confirm password' box
    const enabledPassword = enabledEmail;
    // Update local state
    this.setState({
      ...this.state,
      password: this.state.password
    });
  };

  private toggleConfirmEmail = (name: string, value: string): boolean => {
    // Will only consider when the email textbox is being used
    if (name === "email") {
      // If textbox has valid email, enable confirm textbox.
      return validator.isEmail(value) ? true : false;
    }

    // Return whichever value is already there
    return this.state.enabled.email;
  };

  private toggleConfirmPassword = (): boolean => {
    return (
      validator.isEmail(this.state.updated.email) &&
      this.state.updated.email === this.state.updated.confirmEmail
    );
  };

  private onSubmit = async (event: React.FormEvent): Promise<any> => {
    return;
  };
  //   event.preventDefault();

  //   if (this.state.email !== this.state.confirmEmail) {
  //     this.setState({
  //       flashMessage: {
  //         isVisible: true,
  //         text: "Your emails do not match. Please fix this before continuing.",
  //         type: "alert"
  //       }
  //     });
  //     return;
  //   }

  //   if (this.state.password !== this.state.confirmPassword) {
  //     this.setState({
  //       flashMessage: {
  //         isVisible: true,
  //         text:
  //           "Your passwords do not match. Please fix this before continuing.",
  //         type: "alert"
  //       }
  //     });
  //     return;
  //   }

  //   if (this.state.password.length < 8) {
  //     this.setState({
  //       flashMessage: {
  //         isVisible: true,
  //         text:
  //           "Your password is too weak! Please make your password over 8 characters long.",
  //         type: "alert"
  //       }
  //     });
  //     return;
  //   }

  //   // Grab values from state
  //   const {
  //     email,
  //     confirmEmail,
  //     password,
  //     confirmPassword,
  //     displayName
  //   } = this.state;

  //   // Create credentials obj
  //   const credentials: IRegisterUser = {
  //     user: { email, confirmEmail, password, confirmPassword, displayName }
  //   };
  //   try {
  //     // dispatch action which calls API to Profile user
  //     const { token } = await this.props.Profile({ credentials });

  //     // Set user to be remembered
  //     Auth.authenticateUser({ token, displayName });

  //     // Redirect user to sauces page -- Maybe take them to user home page instead?
  //     this.props.history.push("/sauces");
  //   } catch (err) {
  //     const text = Err.getError({ err });
  //     // Create warning flash
  //     this.setState({
  //       flashMessage: {
  //         isVisible: true,
  //         text,
  //         type: "warning"
  //       }
  //     });
  //   }
  // };
}

const mapState2Props = (state: AppState) => {
  return { user: state.users.self };
};

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatch2Props = (dispatch: MyThunkDispatch) => ({
  getInfo: ({
    data
  }: {
    data: { user: { token: string }; displayName: string };
  }) => dispatch(getInfo({ data }))
});

export default connect(
  mapState2Props,
  mapDispatch2Props
)(Profile);
