import * as React from "react";
import { connect } from "react-redux";

import LogoSFYT from "../../images/icons/LogoSFYT";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import { Link } from "../../components/Link/Link";
import { IinitialState } from "../../redux/configureStore";
import { register } from "../../redux/users/actions";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledText,
  StyledButton
} from "./RegisterStyle";
import { IRegisterUser } from "../../redux/users/types";

export interface RegisterProps {
  register: any;
}

export interface RegisterState {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  displayName: string;
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
      displayName: ""
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
      window.alert("Your emails do not match. Please correct.");
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      window.alert("Your passwords do not match. Please correct.");
      return;
    }

    const credentials: IRegisterUser = { user: this.state };
    try {
      await this.props.register({ credentials });
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };
}

const mapState2Props = (state: IinitialState) => {
  return {};
};

const mapDispatch2Props = {
  register
};

export default connect(
  mapState2Props,
  mapDispatch2Props
)(Register);
