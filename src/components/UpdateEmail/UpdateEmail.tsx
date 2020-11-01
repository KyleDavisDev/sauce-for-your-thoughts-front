import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";
import { useRouter } from "next/router";

import { updateEmail, logout } from "../../redux/users/actions";
import { IUserUpdateEmail } from "../../redux/users/types";
import ArrowLeft from "../../images/icons/ArrowLeft";
import PageTitle from "../PageTitle/PageTitle";
import { TextInput } from "../TextInput/TextInput";
import { Link } from "../Link/Link";
import { Button } from "../Button/Button";
import { FlashMessage, FlashMessageProps } from "../FlashMessage/FlashMessage";
import { StyledFormContainer, StyledButtonHolder } from "./UpdateEmailStyle";
import { AppState } from "../../redux/configureStore";

export interface UpdateEmailProps {}

const UpdateEmail: React.FC<UpdateEmailProps> = props => {
  const MIN_PASSWORD_LENGTH = 8;
  const _title = "Update Email";
  const _redirectPath = "/account/login?return=/account/settings/email";

  // Init state
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });
  const token = useSelector((store: AppState) => store.users?.self?.token);

  // assign router
  const router = useRouter();
  // assign dispatch
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!token) {
      router.push(_redirectPath);
      return;
    }
  });

  return (
    <>
      <PageTitle>{_title}</PageTitle>
      <StyledFormContainer>
        {flashMessage.isVisible && (
          <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
        )}

        <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
          <TextInput
            id="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            showLabel={true}
            label={"New Email"}
            name={"email"}
            required={true}
          />
          <TextInput
            id="confirmEmail"
            type="email"
            onChange={e => setConfirmEmail(e.target.value)}
            value={confirmEmail}
            disabled={!toggleConfirmEmail()}
            showLabel={true}
            label={"Confirm New Email"}
            name={"confirmEmail"}
            required={true}
            requirementText={"Must match above."}
          />
          <TextInput
            id="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            disabled={!toggleConfirmPassword()}
            showLabel={true}
            label={"Password"}
            name={"password"}
            required={true}
          />

          <StyledButtonHolder>
            <Link href="/account/settings">
              <Button type="button" displayType="outline">
                <ArrowLeft /> Settings
              </Button>
            </Link>
            <Button type="submit" disabled={!isSubmitable()}>
              Update!
            </Button>
          </StyledButtonHolder>
        </form>
      </StyledFormContainer>
    </>
  );

  function toggleConfirmEmail(): boolean {
    // If textbox has valid email, enable confirm textbox.
    return validator.isEmail(email);
  }

  function toggleConfirmPassword(): boolean {
    return toggleConfirmEmail() && email === confirmEmail;
  }

  function isSubmitable(): boolean {
    return toggleConfirmPassword() && password.length >= MIN_PASSWORD_LENGTH;
  }

  async function onSubmit(event: React.FormEvent): Promise<any> {
    // Prevent normal form submission
    event.preventDefault();

    // Confirm one last time that everything is good
    if (!isSubmitable()) {
      setFlashMessage({
        isVisible: true,
        text: "Your emails do not match. Please fix this before continuing.",
        type: "alert"
      });
      return;
    }

    // Construct data
    const data: IUserUpdateEmail = {
      user: { email, confirmEmail, password }
    };
    try {
      await dispatch(updateEmail({ data }));

      // clear state and display flash
      setEmail("");
      setConfirmEmail("");
      setPassword("");
      setFlashMessage({
        isVisible: true,
        text: "Success! Email updated.",
        type: "success",
        slug: "/account/settings",
        slugText: "Back to Settings"
      });
    } catch (err) {
      // Password bad or acc locked so going to reset
      setEmail("");
      setConfirmEmail("");
      setPassword("");
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg,
        type: "warning"
      });
    }
  }
};

// export default connect(mapState2Props, mapDispatch2Props)(UpdateEmail);
export default UpdateEmail;
