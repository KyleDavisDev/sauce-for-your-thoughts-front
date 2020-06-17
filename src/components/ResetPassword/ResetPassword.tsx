import * as React from "react";
import { useRouter } from "next/router";

import PageTitle from "../PageTitle/PageTitle";
import { TextInput } from "../TextInput/TextInput";
import { Link } from "../Link/Link";
import { Article } from "../Article/Article";
import HeaderSimple from "../HeaderSimple/HeaderSimple";
import {
  StyledFormContainer,
  StyledText,
  StyledButton
} from "./ResetPasswordStyle";
import LogoSFYT from "../../images/icons/LogoSFYT";

export interface ResetPasswordProps {}

const ResetPassword: React.SFC<ResetPasswordProps> = () => {
  // Set state
  const [email, setEmail] = React.useState("");

  // Set router
  const router = useRouter();

  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <PageTitle>Password Reset</PageTitle>
        <StyledFormContainer>
          <StyledText>
            Enter your <b>email address</b>. We will send you an email with your
            username and a link to reset your password.
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
      </Article>
    </>
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
