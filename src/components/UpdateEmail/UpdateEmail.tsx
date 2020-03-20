import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";
import { useRouter } from "next/router";

import { AppState, MyThunkDispatch } from "../../redux/configureStore";
import { updateEmail, logout } from "../../redux/users/actions";
import { IUserUpdateEmail } from "../../redux/users/types";
import LogoSFYT from "../../images/icons/LogoSFYT";
import ArrowLeft from "../../images/icons/ArrowLeft";
import PageTitle from "../PageTitle/PageTitle";
import { TextInput } from "../TextInput/TextInput";
import { Link } from "../Link/Link";
import { Button } from "../Button/Button";
import { FlashMessage, FlashMessageProps } from "../FlashMessage/FlashMessage";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledButtonHolder
} from "./UpdateEmailStyle";
import Auth from "../../utils/Auth/Auth";

export interface UpdateEmailProps {}

export interface UpdateEmailState {
  email: string;
  confirmEmail: string;
  password: string;
  flashMessage: FlashMessageProps;
}

const UpdateEmail: React.SFC<UpdateEmailProps> = props => {
  // Init state
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  // assign router
  const router = useRouter();
  // assign dispatch
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Get token or else redirect
    const token = Auth.getToken();
    if (!token) {
      router.push("/account/login?return=/account/settings/email");
      return;
    }
  });

  return (
    <StyledDiv>
      <StyledLogoContainer>
        <Link to="/">
          <LogoSFYT />
        </Link>
      </StyledLogoContainer>
      <hr />
      <StyledArticle>
        <PageTitle>Update Email</PageTitle>
        <StyledFormContainer>
          {flashMessage.isVisible && (
            <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
          )}
          <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
            <TextInput
              type="email"
              onChange={e => setEmail(e.target.value)}
              showLabel={true}
              label={"New Email"}
              name={"email"}
              required={true}
            />
            <TextInput
              type="email"
              onChange={e => setConfirmEmail(e.target.value)}
              disabled={!toggleConfirmEmail()}
              showLabel={true}
              label={"Confirm New Email"}
              name={"confirmEmail"}
              required={true}
              requirementText={"Must match above."}
            />
            <TextInput
              type="password"
              onChange={e => setPassword(e.target.value)}
              disabled={!toggleConfirmPassword()}
              showLabel={true}
              label={"Password"}
              name={"password"}
              required={true}
            />

            <StyledButtonHolder>
              <Link to="/account/settings">
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
      </StyledArticle>
    </StyledDiv>
  );

  function toggleConfirmEmail(): boolean {
    // If textbox has valid email, enable confirm textbox.
    return validator.isEmail(email);
  }

  function toggleConfirmPassword(): boolean {
    return toggleConfirmEmail() && email === confirmEmail;
  }

  function isSubmitable(): boolean {
    return toggleConfirmPassword() && password.length > 8;
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

    // Get token or else redirect
    const token = Auth.getToken();
    if (!token) {
      router.push("/account/login?return=/account/settings/email");
      return;
    }

    // Construct data
    const data: IUserUpdateEmail = {
      user: { token, email, confirmEmail, password }
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
      // Account locked
      if (err.response.status === 403) {
        router.push("/account/login");
        return;
      }

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
