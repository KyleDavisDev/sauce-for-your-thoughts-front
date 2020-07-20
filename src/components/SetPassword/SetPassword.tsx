import * as React from "react";

import { API } from "../../utils/api/API";
import PageTitle from "../PageTitle/PageTitle";
import { TextInput } from "../TextInput/TextInput";
import {
  StyledFormContainer,
  StyledText,
  StyledButton
} from "./SetPasswordStyle";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";

export interface SetPasswordProps {}

const SetPassword: React.SFC<SetPasswordProps> = () => {
  // Set state
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  return (
    <>
      <PageTitle>Reset Password</PageTitle>
      <StyledFormContainer>
        {flashMessage.isVisible && (
          <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
        )}
        <StyledText>Enter your updated password.</StyledText>
        <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
          <TextInput
            type="text"
            onChange={e => setPassword(e.target.value)}
            showLabel={true}
            label={"Password"}
            name={"password"}
            required={true}
          />
          <TextInput
            type="text"
            onChange={e => setConfirmPassword(e.target.value)}
            showLabel={true}
            disabled={password.length < 8}
            label={"Confirm Password"}
            name={"confirmPassword"}
            required={true}
          />
          <StyledButton type="submit" disabled={password === confirmPassword}>
            Update
          </StyledButton>
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

export default SetPassword;
