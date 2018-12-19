import * as React from "react";
import { connect } from "react-redux";
import LogoSFYT from "../../images/icons/LogoSFYT";
import styled from "styled-components";
import Article from "../../components/Article/Article";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import { Button } from "../../components/Button/Button";
import { Link } from "../../components/Link/Link";

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

export interface LoginProps {}

export interface LoginState {
  email: string;
  password: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    // Init state
    this.state = {
      email: "",
      password: ""
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
                type="text"
                onChange={this.onTextChange}
                showLabel={true}
                label={"Password"}
                name={"password"}
                value={this.state.password}
                required={true}
              />
              <StyledButton type="button" onClick={() => {}}>
                Login
              </StyledButton>

              <StyledText>
                <Link to="#">Forgot your username or password?</Link>
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

  private onSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
  };
}

const mapState2Props = state => {
  return {};
};

export default connect(
  mapState2Props,
  null
)(Login);
