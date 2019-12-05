import * as React from "react";
import { connect } from "react-redux";
import validator from "validator";
import queryString from "query-string";

import LogoSFYT from "../../../images/icons/LogoSFYT";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { TextInput } from "../../../components/TextInput/TextInput";
import { Link } from "../../../components/Link/Link";
import { AppState } from "../../../redux/configureStore";
import { ILoginUser } from "../../../redux/users/types";
import { login } from "../../../redux/users/actions";
import {
  FlashMessageProps,
  FlashMessage
} from "../../../components/FlashMessage/FlashMessage";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledButton,
  StyledText,
  StyledFooterDivs
} from "./LoginStyle";

export interface LoginProps {
  login: ({ credentials }: { credentials: ILoginUser }) => any;
  history: { push: (location: string) => null };
  location: { search: string };
}

export interface LoginState {
  email: string;
  password: string;
  flashMessage: FlashMessageProps;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    // Init state
    this.state = {
      email: "",
      password: "",
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
          <PageTitle>Login</PageTitle>
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
                type="password"
                onChange={this.onTextChange}
                showLabel={true}
                label={"Password"}
                name={"password"}
                value={this.state.password}
                required={true}
              />
              <StyledFooterDivs>
                <StyledButton type="submit">Login</StyledButton>
              </StyledFooterDivs>
              <StyledText>
                <Link to="/reset">Forgot your username or password?</Link>
              </StyledText>

              <StyledText>
                Don't have an account yet?{" "}
                <Link to="/account/register">Sign up!</Link>
              </StyledText>
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

    // If not email don't even send network request
    if (!validator.isEmail(this.state.email)) {
      this.setState({
        flashMessage: {
          isVisible: true,
          text: "An email must be used.",
          type: "alert"
        }
      });
      return;
    }

    // If password too short, don't send network request
    if (this.state.password.length < 8) {
      this.setState({
        flashMessage: {
          isVisible: true,
          text: "Password must be longer than 8 characters",
          type: "alert"
        }
      });
      return;
    }

    const credentials: ILoginUser = {
      user: { email: this.state.email, password: this.state.password }
    };
    try {
      // dispatch action which calls API to login user
      await this.props.login({ credentials });

      const returnURL: string | null = this.getReturnFromPath(
        this.props.location.search
      );

      // Redirect user to where they were or to sauces page
      if (returnURL) {
        this.props.history.push(returnURL);
      } else {
        this.props.history.push("/sauces");
      }
    } catch (err) {
      // Create warning flash
      this.setState({
        flashMessage: {
          isVisible: true,
          text: err.response.data.msg,
          type: "warning"
        }
      });
    }
  };

  private getReturnFromPath(path: string): string | null {
    // Get s from string
    const values = queryString.parse(path);

    // Make sure return is defined, not an array
    if (!values.return || Array.isArray(values.return)) {
      return null;
    }

    return values.return;
  }
}

const mapState2Props = (state: AppState) => {
  return {};
};

const mapDispatch2Props = {
  login
};

export default connect(mapState2Props, mapDispatch2Props)(Login);
