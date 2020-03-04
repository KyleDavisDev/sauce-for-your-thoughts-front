import * as React from "react";
import { connect } from "react-redux";

import { updatePassword, logout } from "../../redux/users/actions";
import { IUserUpdatePassword } from "../../redux/users/types";
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
} from "./UpdatePasswordStyle";
import Auth from "../../utils/Auth/Auth";
import { useRouter } from "next/router";

export interface UpdatePasswordProps {}

export interface UpdatePasswordState {}

const UpdatePassword: React.SFC<UpdatePasswordProps> = props => {
  // Init state
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  // init router
  const router = useRouter();

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
        <PageTitle>Update Password</PageTitle>
        <StyledFormContainer>
          {flashMessage.isVisible && (
            <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
          )}
          <form onSubmit={e => onSubmit(e)} style={{ width: "100%" }}>
            <TextInput
              type="password"
              onChange={e => setNewPassword(e.target.value)}
              showLabel={true}
              label={"New Password"}
              name={"newPassword"}
              value={newPassword}
              required={true}
              requirementText={"Must be at least 9 characters long."}
            />
            <TextInput
              type="password"
              onChange={e => setConfirmNewPassword(e.target.value)}
              disabled={!toggleConfirmNewPassword()}
              showLabel={true}
              label={"Confirm New Password"}
              name={"confirmNewPassword"}
              value={confirmNewPassword}
              required={true}
              requirementText={"Must match above."}
            />
            <TextInput
              type="password"
              onChange={e => setPassword(e.target.value)}
              disabled={!toggleConfirmPassword()}
              showLabel={true}
              label={"Old Password"}
              name={"password"}
              value={password}
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
      </StyledArticle>
    </StyledDiv>
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

    // Get token or else redirect
    const token = Auth.getToken();
    if (!token) {
      router.push("/account/login?return=/account/settings/email");
      return;
    }

    // Construct data
    const data: IUserUpdatePassword = {};
    try {
      //   await this.props.updatePassword({ data });
      // // clear input and display flash
      // this.setState({
      //   ...
      //   password: "",
      //   newPassword: "",
      //   confirmNewPassword: "",
      //   flashMessage: {
      //     isVisible: true,
      //     text: "Success! Password updated.",
      //     type: "success",
      //     slug: "/account/settings",
      //     slugText: "Back to Settings"
      //   }
      // });
    } catch (err) {
      // Account locked
      if (err.response.status === 403) {
        // router.push("/logout")

        router.push("/account/login");
        return;
      }

      // Password bad or acc locked so going to reset
      // this.setState({
      //   password: "",
      //   flashMessage: {
      //     isVisible: true,
      //     text: err.response.data.msg,
      //     type: "warning"
      //   }
      // });
    }
  }
};

// const mapState2Props = (state: AppState) => {
//   return { user: state.users.self };
// };

// // For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
// const mapDispatch2Props = (dispatch: MyThunkDispatch) => ({
//   updatePassword: ({ data }: { data: IUserUpdatePassword }) =>
//     dispatch(updatePassword({ data })),
//   logout: () => dispatch(logout())
// });

// export default connect(mapState2Props, mapDispatch2Props)(UpdatePassword);
export default UpdatePassword;
