import * as React from "react";

import { API } from "../../utils/api/API";
import PageTitle from "../PageTitle/PageTitle";
import { TextInput } from "../TextInput/TextInput";
import {
  StyledFormContainer,
  StyledText,
  StyledButton
} from "./RequestPasswordResetStyle";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";

export interface RequestPasswordResetProps {}

const RequestPasswordReset: React.SFC<RequestPasswordResetProps> = () => {
  // Set state
  const [email, setEmail] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

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
            value={email}
            required={true}
            id={"email"}
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
      const res = await API.user.requestPasswordReset(
        email.trim().toLowerCase()
      );

      // 2. Show flash message
      setFlashMessage({
        isVisible: true,
        text: res.data.msg,
        type: "success",
        slug: "/",
        slugText: "Go Home"
      });
    } catch (err) {
      // Show flash message
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg,
        type: "alert"
      });
    }

    // reset textbox
    setEmail("");

    window.scrollTo(0, 0); // Move screen to top
  }
};

export default RequestPasswordReset;
