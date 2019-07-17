import * as React from "react";
import { connect } from "react-redux";

import { register } from "../../../redux/users/actions";
import { IRegisterUser } from "../../../redux/users/types";
import LogoSFYT from "../../../images/icons/LogoSFYT";
import PageTitle from "../../../components/PageTitle/PageTitle";
import TextInput from "../../../components/TextInput/TextInput";
import { Link } from "../../../components/Link/Link";
import { AppState } from "../../../redux/configureStore";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledText,
  StyledButton
} from "./RegisterStyle";
import {
  FlashMessage,
  FlashMessageProps
} from "../../../components/FlashMessage/FlashMessage";
import Err from "../../../utils/Err/Err";
import Auth from "../../../utils/Auth/Auth";

export interface RegisterProps {
  register: any;
  history: { push: (location: string) => null };
}

export interface RegisterState {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  flashMessage: FlashMessageProps;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
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
          <PageTitle>Register</PageTitle>
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
                value={this.state.email}
                required={true}
              />
              <TextInput
                type="email"
                onChange={this.onTextChange}
                showLabel={true}
                label={"Confirm Email"}
                name={"confirmEmail"}
                value={this.state.confirmEmail}
                required={true}
              />
              <TextInput
                type="password"
                onChange={this.onTextChange}
                showLabel={true}
                label={"Password"}
                name={"password"}
                value={this.state.password}
                required={true}
              />
              <TextInput
                type="password"
                onChange={this.onTextChange}
                showLabel={true}
                label={"Confirm Password"}
                name={"confirmPassword"}
                value={this.state.confirmPassword}
                required={true}
              />
              <TextInput
                type="text"
                onChange={this.onTextChange}
                showLabel={true}
                label={"Display Name"}
                name={"displayName"}
                value={this.state.displayName}
                required={true}
              />
              <StyledText>
                By clicking 'Register', you agree to Sauce For Your Thoughts{" "}
                <Link to="#">Terms and Conditions</Link>
              </StyledText>
              <StyledButton type="submit">Register</StyledButton>
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
      [name]: value
    });
  };

  private onSubmit = async (event: React.FormEvent): Promise<any> => {
    event.preventDefault();

    if (this.state.email !== this.state.confirmEmail) {
      this.setState({
        flashMessage: {
          isVisible: true,
          text: "Your emails do not match. Please fix this before continuing.",
          type: "alert"
        }
      });
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        flashMessage: {
          isVisible: true,
          text:
            "Your passwords do not match. Please fix this before continuing.",
          type: "alert"
        }
      });
      return;
    }

    if (this.state.password.length < 8) {
      this.setState({
        flashMessage: {
          isVisible: true,
          text:
            "Your password is too weak! Please make your password over 8 characters long.",
          type: "alert"
        }
      });
      return;
    }

    // Grab values from state
    const {
      email,
      confirmEmail,
      password,
      confirmPassword,
      displayName
    } = this.state;

    // Create credentials obj
    const credentials: IRegisterUser = {
      user: { email, confirmEmail, password, confirmPassword, displayName }
    };
    try {
      // dispatch action which calls API to register user
      const { token } = await this.props.register({ credentials });

      // Set user to be remembered
      Auth.authenticateUser({ token, displayName });

      // Redirect user to sauces page -- Maybe take them to user home page instead?
      this.props.history.push("/sauces");
    } catch (err) {
      const text = Err.getError({ err });
      // Create warning flash
      this.setState({
        flashMessage: {
          isVisible: true,
          text,
          type: "warning"
        }
      });
    }
  };
}

const mapState2Props = (state: AppState) => {
  return {};
};

const mapDispatch2Props = {
  register
};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(Register);
