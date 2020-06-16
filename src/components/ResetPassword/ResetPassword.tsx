import * as React from "react";
import { useRouter } from "next/router";

import PageTitle from "../../components/PageTitle/PageTitle";
import { TextInput } from "../../components/TextInput/TextInput";
import { Link } from "../../components/Link/Link";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledText,
  StyledButton
} from "./ResetPasswordStyle";
import LogoSFYT from "../../images/icons/LogoSFYT";

export interface ResetPasswordProps {
  register: any;
  history: { push: (location: string) => null };
}

export interface ResetPasswordState {
  email: string;
}

const ResetPassword: React.SFC<ResetPasswordProps> = () => {
  // Set state
  const [email, setEmail] = React.useState("");

  // Set router
  const router = useRouter();

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
          <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
            <TextInput
              type="text"
              onChange={e => setEmail(e.target.value)}
              showLabel={true}
              label={"Email"}
              name={"email"}
              required={true}
            />
            <StyledButton type="submit">Send</StyledButton>
          </form>
        </StyledFormContainer>
      </StyledArticle>
    </StyledDiv>
  );

  let onSubmit = async (event: React.FormEvent): Promise<any> => {
    event.preventDefault();

    try {
      // dispatch action which calls API to register user
      // await this.props.register({ credentials });

      // Redirect user to sauces page -- Maybe take them to user home page instead?
      router.push("/");
    } catch (err) {}
  };
};

export default ResetPassword;
