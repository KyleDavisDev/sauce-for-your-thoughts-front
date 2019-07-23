import * as React from "react";
import { connect } from "react-redux";
import validator from "validator";

import { AppState, MyThunkDispatch } from "../../../../redux/configureStore";
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
} from "./UpdateEmailStyle";
import {
  FlashMessage,
  FlashMessageProps
} from "../../../../components/FlashMessage/FlashMessage";

export interface UpdateEmailProps {
  history: { push: (location: string) => null };
  user: { token: string; displayName: string };
}

export interface UpdateEmailState {
  email: string;
  confirmEmail: string;
  password: string;
  flashMessage: FlashMessageProps;
}

class UpdateEmail extends React.Component<UpdateEmailProps, UpdateEmailState> {
  constructor(props: UpdateEmailProps) {
    super(props);

    // Init state
    this.state = {
      email: "",
      confirmEmail: "",
      password: "",
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
              <FlashMessage type={this.state.flashMessage.type} isVisible>
                {this.state.flashMessage.text}
              </FlashMessage>
            )}
            <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
              <TextInput
                type="email"
                onChange={this.onTextChange}
                showLabel={true}
                label={"New Email"}
                name={"email"}
                value={this.state.email}
                required={true}
              />
              <TextInput
                type="email"
                onChange={this.onTextChange}
                disabled={!this.toggleConfirmEmail()}
                showLabel={true}
                label={"Confirm New Email"}
                name={"confirmEmail"}
                value={this.state.confirmEmail}
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
                <Button type="submit">Update!</Button>
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

    // Check if we should enable 'confirm email' box
    // const enabledEmail = this.toggleConfirmEmail(name, value);

    // Update local state
    this.setState({
      ...this.state,
      [name]: value,
      password: this.toggleConfirmEmail() ? "" : this.state.password // Reset password if necessary
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

  private toggleConfirmEmail = (): boolean => {
    // If textbox has valid email, enable confirm textbox.
    return validator.isEmail(this.state.email);
  };

  private toggleConfirmPassword = (): boolean => {
    return (
      validator.isEmail(this.state.email) &&
      this.state.email === this.state.confirmEmail
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
  //     // dispatch action which calls API to UpdateEmail user
  //     const { token } = await this.props.UpdateEmail({ credentials });

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
const mapDispatch2Props = (dispatch: MyThunkDispatch) => ({});

export default connect(
  mapState2Props,
  mapDispatch2Props
)(UpdateEmail);
