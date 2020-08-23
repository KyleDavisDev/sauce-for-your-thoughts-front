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
import Auth from "../../utils/Auth/Auth";
import { useRouter } from "next/router";
import HeaderSimple from "../HeaderSimple/HeaderSimple";
import { Article } from "../Article/Article";
import { AppState } from "../../redux/configureStore";

export interface UpdatePasswordProps {}

export interface UpdatePasswordState {}

const UpdatePassword: React.FC<UpdatePasswordProps> = props => {
  // Init state
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  // grab token from redux
  const token = useSelector((store: AppState) => store.users.self.token);

  // init router
  const router = useRouter();
  // init dispatch
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Quick sanity check on token
    if (!token) {
      router.push("/account/login?return=/account/update/password");
      return;
    }
  }, []);

  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <PageTitle>Update Password</PageTitle>
        <StyledFormContainer>
          {flashMessage.isVisible && (
            <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
          )}
          <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
            <TextInput
              type="password"
              onChange={e => setNewPassword(e.target.value)}
              value={newPassword}
              showLabel={true}
              label={"New Password"}
              name={"newPassword"}
              required={true}
              requirementText={"Must be at least 9 characters long."}
            />
            <TextInput
              type="password"
              onChange={e => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
              disabled={!toggleConfirmNewPassword()}
              showLabel={true}
              label={"Confirm New Password"}
              name={"confirmNewPassword"}
              required={true}
              requirementText={"Must match above."}
            />
            <TextInput
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              disabled={!toggleConfirmPassword()}
              showLabel={true}
              label={"Old Password"}
              name={"password"}
              required={true}
            />

            <StyledButtonHolder>
              <Link to="/account/settings">
                <Button type="button" displayType="outline">
                  <ArrowLeft /> Settings
                </Button>
              </Link>
              <Button type="submit" disabled={!toggleUpdateButton()}>
                Update!
              </Button>
            </StyledButtonHolder>
          </form>
        </StyledFormContainer>
      </Article>
    </>
  );

  function toggleConfirmNewPassword(): boolean {
    // If password is long enough, return true
    return newPassword.length > 8;
  }

  function toggleConfirmPassword(): boolean {
    return toggleConfirmNewPassword() && newPassword === confirmNewPassword;
  }

  function toggleUpdateButton(): boolean {
    return toggleConfirmPassword() && password.length > 8;
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
      router.push("/account/login?return=/account/settings/password");
      return;
    }

    // Construct data
    const data: IUserUpdatePassword = {
      user: {
        password,
        newPassword,
        confirmNewPassword
      }
    };
    try {
      // dispatch redux action
      await dispatch(updatePassword({ data }));

      // clear input and display flash
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setFlashMessage({
        isVisible: true,
        text: "Success! Password updated.",
        type: "success",
        slug: "/account/settings",
        slugText: "Back to Settings"
      });
    } catch (err) {
      // Password bad or acc locked so going to reset
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg,
        type: "warning"
      });
    }
  }
};

export default UpdatePassword;
