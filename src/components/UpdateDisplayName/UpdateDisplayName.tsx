import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { AppState } from "../../redux/configureStore";
import { updateDisplayName } from "../../redux/users/actions";
import { IUserUpdateDisplayName } from "../../redux/users/types";
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
} from "./UpdateDisplayNameStyle";
import Auth from "../../utils/Auth/Auth";

export interface UpdateDisplayNameProps {}

const UpdateDisplayName: React.FC<UpdateDisplayNameProps> = () => {
  // Init state
  const [displayName, setDisplayName] = React.useState("");
  const oldDisplayName =
    useSelector((store: AppState) => store.users.self.displayName) || "";
  const [confirmDisplayName, setConfirmDisplayName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  // assign router
  const router = useRouter();
  // assign dispatch
  const dispatch = useDispatch();

  // run on mount
  React.useEffect(() => {
    // Get token or else redirect
    const token = Auth.getToken();
    if (!token) {
      router.push("/account/login?return=/account/settings/email");
      return;
    }
  }, []);

  return (
    <StyledDiv>
      <StyledLogoContainer>
        <Link to="/">
          <LogoSFYT />
        </Link>
      </StyledLogoContainer>
      <hr />
      <StyledArticle>
        <PageTitle>Update Display Name</PageTitle>
        <StyledFormContainer>
          {flashMessage.isVisible && (
            <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
          )}
          <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
            <TextInput
              type="text"
              onChange={e => setDisplayName(e.target.value)}
              showLabel={true}
              label={"New Display Name"}
              name={"displayName"}
              required={true}
              requirementText={"Must be at least 6 characters long."}
            />
            <TextInput
              type="text"
              onChange={e => setConfirmDisplayName(e.target.value)}
              disabled={!toggleConfirmDisplayName()}
              showLabel={true}
              label={"Confirm New Display Name"}
              name={"confirmDisplayName"}
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
              <Button type="submit" disabled={!isSubmittable()}>
                Update!
              </Button>
            </StyledButtonHolder>
          </form>
        </StyledFormContainer>
      </StyledArticle>
    </StyledDiv>
  );

  function toggleConfirmDisplayName(): boolean {
    // If textbox has valid email, enable confirm textbox.
    return displayName.length > 5;
  }

  function toggleConfirmPassword(): boolean {
    return toggleConfirmDisplayName() && displayName === confirmDisplayName;
  }

  function isSubmittable(): boolean {
    return toggleConfirmPassword() && password.length > 8;
  }

  async function onSubmit(event: React.FormEvent): Promise<any> {
    // Prevent normal form submission
    event.preventDefault();

    // Confirm one last time that the values are the same.
    if (displayName !== confirmDisplayName) {
      setFlashMessage({
        isVisible: true,
        text: "Your emails do not match. Please fix this before continuing.",
        type: "alert"
      });
      return;
    }

    // Confirm password is longer than 8 characters
    if (password.length < 8) {
      setFlashMessage({
        isVisible: true,
        text:
          "Your password is too short! Password length must be at least 8 characters.",
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
    const data: IUserUpdateDisplayName = {
      user: { token, displayName, confirmDisplayName, password }
    };
    try {
      // dispatch redux action-emitter
      dispatch(
        updateDisplayName({
          data,
          oldDisplayName
        })
      );

      // clear input and display flash
      setDisplayName("");
      setConfirmDisplayName("");
      setPassword("");
      setFlashMessage({
        isVisible: true,
        text: "Success! Display Name updated.",
        type: "success",
        slug: "/account/settings",
        slugText: "Back to Settings"
      });
    } catch (err) {
      // Account locked
      if (err.response.status === 403) {
        router.push("/logout");

        router.push("/account/login");
        return;
      }

      // Password bad or acc locked so going to reset
      setPassword("");
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg,
        type: "warning"
      });
    }
  }
};

export default UpdateDisplayName;
