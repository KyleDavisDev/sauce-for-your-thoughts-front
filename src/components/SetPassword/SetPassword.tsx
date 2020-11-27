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
import { IUserResetPassword } from "../../redux/users/types";

export interface SetPasswordProps {
  jwt: string;
}

const SetPassword: React.SFC<SetPasswordProps> = (props: SetPasswordProps) => {
  // Set state
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [enableForm, setEnableForm] = React.useState(true);
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  // get jwt form props
  const { jwt } = props;

  return (
    <>
      <PageTitle>Reset Password</PageTitle>
      <StyledFormContainer>
        {flashMessage.isVisible && (
          <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
        )}
        {enableForm && (
          <>
            <StyledText>Enter your updated password.</StyledText>
            <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
              <TextInput
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                showLabel={true}
                label={"Password"}
                name={"password"}
                required={true}
                value={password}
              />
              <TextInput
                type="password"
                id="confirmPassword"
                onChange={e => setConfirmPassword(e.target.value)}
                showLabel={true}
                disabled={password.length < 8}
                label={"Confirm Password"}
                name={"confirmPassword"}
                required={true}
                value={confirmPassword}
              />

              <StyledButton type="submit" disabled={!isSubmitButtonEnabled()}>
                Update
              </StyledButton>
            </form>
          </>
        )}
      </StyledFormContainer>
    </>
  );

  function isSubmitButtonEnabled(): boolean {
    if (password !== confirmPassword) return false;
    if (password.length < 8) return false;
    if (confirmPassword.length < 8) return false;

    return true;
  }

  async function onSubmit(event: React.FormEvent): Promise<any> {
    event.preventDefault();
    if (!enableForm) return;

    try {
      // 1. Call API to reset password
      const data: IUserResetPassword = { jwt, password, confirmPassword };
      const res = await API.user.resetPassword(data);

      // 2. Show flash message
      setFlashMessage({
        isVisible: true,
        text: res.data.msg,
        type: "success",
        slug: "/account/login",
        slugText: "Go to Login"
      });

      // 3. Disable form
      setEnableForm(false);
    } catch (err) {
      // Show flash message
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg,
        type: "alert",
        slug: "/",
        slugText: "Go Home"
      });
    }

    // Remove text from inputs
    setPassword("");
    setConfirmPassword("");

    window.scrollTo(0, 0); // Move screen to top
  }
};

export default SetPassword;
