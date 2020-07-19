import * as React from "react";
import { useRouter } from "next/router";

import { API } from "../../utils/api/API";
import PageTitle from "../PageTitle/PageTitle";
import { TextInput } from "../TextInput/TextInput";
import { Link } from "../Link/Link";
import { Article } from "../Article/Article";
import HeaderSimple from "../HeaderSimple/HeaderSimple";
import {
  StyledFormContainer,
  StyledText,
  StyledButton
} from "./RequestPasswordResetStyle";
import LogoSFYT from "../../images/icons/LogoSFYT";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";

export interface RequestPasswordResetProps {}

const RequestPasswordReset: React.SFC<RequestPasswordResetProps> = () => {
  // Set state
  const [email, setEmail] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  // Set router
  const router = useRouter();

  return (
    <>
      <PageTitle>Password Reset</PageTitle>
      <StyledFormContainer>
        {flashMessage.isVisible && (
          <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
        )}
        <StyledText>
          Enter your <b>email address</b>. We will send you an email with a link
          to reset your password.
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
    </>
  );

  async function onSubmit(event: React.FormEvent): Promise<any> {
    event.preventDefault();

    try {
      // 1. Call API to reset password
      const res = await API.user.passwordReset(email.trim().toLowerCase());

      // 2. Show flash message
      setFlashMessage({
        isVisible: true,
        text: res.data.msg,
        type: "success"
      });

      // 3. Remove text from input
      setEmail("");
    } catch (err) {
      // 1. show flash message
      setFlashMessage({
        isVisible: true,
        text: err.data.msg,
        type: "success"
      });

      // 2. remove text from input
      setEmail("");
    }

    window.scrollTo(0, 0); // Move screen to top
  }
};

export default RequestPasswordReset;
