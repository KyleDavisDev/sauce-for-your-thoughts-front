import * as React from "react";
import { connect } from "react-redux";
import validator from "validator";

import styled from "styled-components";
import LogoSFYT from "../../images/icons/LogoSFYT";
import Article from "../../components/Article/Article";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import { Button } from "../../components/Button/Button";
import { Link } from "../../components/Link/Link";
import { IinitialState } from "../../redux/configureStore";
import { ILoginUser } from "../../redux/users/types";
import { login } from "../../redux/users/actions";
import {
  FlashMessageProps,
  FlashMessage
} from "../../components/FlashMessage/FlashMessage";
import { CheckBox } from "../../components/CheckBox/CheckBox";
import Auth from "../../utils/Auth/Auth";

const StyledDiv = styled.div`
  height: 100vh;
`;

const StyledLogoContainer = styled.div`
  max-width: 150px;
  margin: 0 auto;
  padding: 1em;
`;

const StyledArticle = styled(Article)`
  max-width: 600px;
`;
const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
  text-align: center;
`;

const StyledText = styled.p`
  text-align: center;
  width: 100%;
  max-width: 80%;
  margin: 0.5em auto;
`;

const StyledFooterDivs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  > div > label {
    font-size: 0.85rem;
    text-transform: inherit;
  }
`;

export interface LoginProps {
  login: ({ credentials }: { credentials: ILoginUser }) => any;
  history: { push: (location: string) => null };
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
                type="text"
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
                Don't have an account yet? <Link to="/register">Sign up!</Link>
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

  private onClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    // Update stae
    this.setState({ rememberMe: !this.state.rememberMe });
  };

  private onSubmit = async (event: React.FormEvent): Promise<any> => {
    event.preventDefault();

    // If not email or password is too short, don't even send network request
    if (
      !validator.isEmail(this.state.email) ||
      this.state.password.length < 8
    ) {
      this.setState({
        flashMessage: {
          isVisible: true,
          text: "Invalid username or password.",
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
      const { token, displayName } = await this.props.login({ credentials });

      // If user wants to be remembered, we need to set localstorage items
      Auth.authenticateUser({ token, displayName });

      // Redirect user to sauces page -- Maybe take them to user home page instead?
      this.props.history.push("/sauces");
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
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

const mapDispatch2Props = {
  login
};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(Login);
