import * as React from "react";
import { connect } from "react-redux";

import { IinitialState } from "../../redux/configureStore";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import { Link } from "../../components/Link/Link";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledText,
  StyledButton
} from "./ResetStyle";
import LogoSFYT from "../../images/icons/LogoSFYT";

export interface RegisterProps {
  register: any;
  history: { push: (location: string) => null };
}

export interface RegisterState {
  email: string;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);

    // Init state
    this.state = {
      email: ""
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
          <PageTitle>Password Reset</PageTitle>
          <StyledFormContainer>
            <StyledText>
              Enter your <b>email address</b> that you used to register. We'll
              send you an email with your username and a link to reset your
              password.
            </StyledText>
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
              <StyledButton type="submit">Send</StyledButton>
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

    try {
      // dispatch action which calls API to register user
      // await this.props.register({ credentials });

      // Redirect user to sauces page -- Maybe take them to user home page instead?
      this.props.history.push("/sauces");
    } catch (err) {}
  };
}

const mapDispatch2Props = {};

export default connect(
  null,
  mapDispatch2Props
)(Register);
