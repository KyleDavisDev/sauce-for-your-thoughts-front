import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updatePassword } from "../../redux/users/actions";
import { IUserUpdatePassword } from "../../redux/users/types";
import ArrowLeft from "../../images/icons/ArrowLeft";
import PageTitle from "../PageTitle/PageTitle";
import { TextInput } from "../TextInput/TextInput";
import { Link } from "../Link/Link";
import { Button } from "../Button/Button";
import { FlashMessage, FlashMessageProps } from "../FlashMessage/FlashMessage";
import { StyledFormContainer, StyledButtonHolder } from "./UpdatePasswordStyle";
import { useRouter } from "next/router";
import HeaderSimple from "../HeaderSimple/HeaderSimple";
import { Article } from "../Article/Article";
import { AppState } from "../../redux/configureStore";

export interface UpdatePasswordProps {}

const UpdatePassword: React.FC<UpdatePasswordProps> = props => {
  const MIN_PASSWORD_LENGTH = 8;
  const _pageTitle = "Update Password";
  const _redirectPath = "/account/login?return=/account/update/password";
  const _defaultErrorMsg =
    "There was a problem updating your password. Please verify network connection and try again.";

  // Init state
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  // grab token from redux
  const token = useSelector((store: AppState) => store.users?.self?.token);

  // init router
  const router = useRouter();
  // init dispatch
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Quick sanity check on token
    if (!token) {
      router.push(_redirectPath);
      return;
    }
  });

  return (
    <>
      <PageTitle>{_pageTitle}</PageTitle>
      <StyledFormContainer>
        {flashMessage.isVisible && (
          <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
        )}
        <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
          <TextInput
            type="password"
            id="newPassword"
            onChange={e => setNewPassword(e.target.value)}
            value={newPassword}
            showLabel={true}
            label={"New Password"}
            name={"newPassword"}
            required={true}
            requirementText={"Must be at least 8 characters long."}
          />
          <TextInput
            type="password"
            id="confirmNewPassword"
            onChange={e => setConfirmNewPassword(e.target.value)}
            value={confirmNewPassword}
            disabled={!doesNewPasswordReachMinLength()}
            showLabel={true}
            label={"Confirm New Password"}
            name={"confirmNewPassword"}
            required={true}
            requirementText={"Must match above."}
          />
          <TextInput
            type="password"
            id="oldPassword"
            onChange={e => setPassword(e.target.value)}
            value={password}
            disabled={!doesConfirmReachMinLength()}
            showLabel={true}
            label={"Old Password"}
            name={"password"}
            required={true}
          />

          <StyledButtonHolder>
            <Link href="/account/settings">
              <Button type="button" displayType="outline">
                <ArrowLeft /> Settings
              </Button>
            </Link>
            <Button type="submit" disabled={!isReadyForSubmission()}>
              Update!
            </Button>
          </StyledButtonHolder>
        </form>
      </StyledFormContainer>
    </>
  );

  function doesNewPasswordReachMinLength(): boolean {
    // If password is long enough, return true
    return newPassword.length >= MIN_PASSWORD_LENGTH;
  }

  function doesConfirmReachMinLength(): boolean {
    return (
      doesNewPasswordReachMinLength() && newPassword === confirmNewPassword
    );
  }

  function isReadyForSubmission(): boolean {
    return (
      doesConfirmReachMinLength() && password.length >= MIN_PASSWORD_LENGTH
    );
  }

  async function onSubmit(event: React.FormEvent): Promise<any> {
    // Prevent normal form submission
    event.preventDefault();

    // Confirm one last time that the values are the same.
    if (newPassword !== confirmNewPassword) {
      setFlashMessage({
        isVisible: true,
        text: "Your passwords do not match. Please fix this before continuing.",
        type: "alert"
      });
      return;
    }

    // Confirm password is longer than 8 characters
    if (password.length < 8) {
      setFlashMessage({
        isVisible: true,
        text:
          "Your new password is too short! Password length must be at least 8 characters.",
        type: "alert"
      });
      return;
    }

    // Quick sanity check on password
    if (!token) {
      router.push(_redirectPath);
      return;
    }

    try {
      // Construct data
      const data: IUserUpdatePassword = {
        user: {
          password,
          newPassword,
          confirmNewPassword
        }
      };
      // dispatch redux action
      await dispatch(updatePassword(data));

      // show success
      setFlashMessage({
        isVisible: true,
        text: "Success! Password updated.",
        type: "success",
        slug: "/account/settings",
        slugText: "Back to Settings"
      });
    } catch (err) {
      // Show error
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg || _defaultErrorMsg,
        type: "warning"
      });
    } finally {
      // reset inputs
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  }
};

export default UpdatePassword;
