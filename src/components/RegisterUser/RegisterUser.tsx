import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { register } from "../../redux/users/actions";
import { IRegisterUser } from "../../redux/users/types";
import LogoSFYT from "../../images/icons/LogoSFYT";
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
} from "./RegisterUserStyle";
import {
  FlashMessage,
  FlashMessageProps
} from "../../components/FlashMessage/FlashMessage";

export interface RegisterUserProps {}

export interface RegisterUserState {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  flashMessage: FlashMessageProps;
}

const RegisterUser: React.FC<RegisterUserProps> = props => {
  // set state
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [flashMessage, setFlashMessage] = useState<FlashMessageProps>({
    isVisible: false,
    text: "",
    type: undefined
  });

  // assign dispatch
  const dispatch = useDispatch();

  // assign NextJS router
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
        <PageTitle>Register</PageTitle>
        <StyledFormContainer>
          {flashMessage.isVisible && (
            <FlashMessage type={flashMessage.type} isVisible>
              {flashMessage.text}
            </FlashMessage>
          )}
          <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
            <TextInput
              type="email"
              onChange={e => setEmail(e.target.value)}
              showLabel={true}
              label={"Email"}
              name={"email"}
              required={true}
            />
            <TextInput
              type="email"
              onChange={e => setConfirmEmail(e.target.value)}
              showLabel={true}
              label={"Confirm Email"}
              name={"confirmEmail"}
              required={true}
              requirementText={"Must match above."}
            />
            <TextInput
              type="password"
              onChange={e => setPassword(e.target.value)}
              showLabel={true}
              label={"Password"}
              name={"password"}
              required={true}
              requirementText={"Must be at least 9 characters long."}
            />
            <TextInput
              type="password"
              onChange={e => setConfirmPassword(e.target.value)}
              showLabel={true}
              label={"Confirm Password"}
              name={"confirmPassword"}
              required={true}
              requirementText={"Must match above."}
            />
            <TextInput
              type="text"
              onChange={e => setDisplayName(e.target.value)}
              showLabel={true}
              label={"Display Name"}
              name={"displayName"}
              required={true}
              requirementText={"Must be at least 6 characters long."}
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

  async function onSubmit(event: React.FormEvent): Promise<any> {
    event.preventDefault();

    if (email !== confirmEmail) {
      setFlashMessage({
        isVisible: true,
        text: "Your emails do not match. Please fix this before continuing.",
        type: "alert"
      });

      window.scrollTo(0, 0); // Move screen to top

      return;
    }

    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      setFlashMessage({
        isVisible: true,
        text: "Your passwords do not match. Please fix this before continuing.",
        type: "alert"
      });

      window.scrollTo(0, 0); // Move screen to top

      return;
    }

    if (password.length < 8) {
      console.log(password);
      setFlashMessage({
        isVisible: true,
        text:
          "Your password is too weak! Please make your password over 8 characters long.",
        type: "alert"
      });

      window.scrollTo(0, 0); // Move screen to top

      return;
    }

    if (displayName.length < 6) {
      setFlashMessage({
        isVisible: true,
        text:
          "Your display name is not long enough. It must be at least 6 characters long.",
        type: "alert"
      });

      window.scrollTo(0, 0); // Move screen to top

      return;
    }

    // Create credentials obj
    const credentials: IRegisterUser = {
      user: { email, confirmEmail, password, confirmPassword, displayName }
    };
    try {
      // dispatch action which calls API to register user
      await dispatch(register({ credentials }));

      // Redirect user to sauces page -- Maybe take them to user home page instead?
      router.push("/sauces");
    } catch (err) {
      // Create warning flash
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg,
        type: "warning"
      });
      window.scrollTo(0, 0); // Move screen to top
      return;
    }

    // clear flash message if was shown
    setFlashMessage({
      isVisible: false,
      text: "",
      type: undefined
    });
  }
};

export default RegisterUser;
