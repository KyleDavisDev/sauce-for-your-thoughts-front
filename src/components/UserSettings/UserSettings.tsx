import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { Link } from "../Link/Link";
import {
  StyledContainer,
  StyledButton,
  StyledGroup
} from "./UserSettingsStyle";

import ArrowRight from "../../images/icons/ArrowRight";
import ArrowLeft from "../../images/icons/ArrowLeft";

import { API } from "../../utils/api/API";
import { useIsEmailConfirmed } from "../../utils/hooks/useIsEmailConfirmed";
import Group from "./components/Group/Group";

export interface UserSettingsProps {}

const UserSettings: React.FC<UserSettingsProps> = props => {
  // init state
  const [flashMessage, setFlashMessage] = useState<FlashMessageProps>({
    isVisible: false
  });

  // assign router
  const router = useRouter();

  // check if the email was confirmed
  const { loading, isEmailConfirmed, error } = useIsEmailConfirmed();

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // // Quick sanity check
    // if (!token) {
    //   router.replace(`/account/login?return=${router.asPath}`);
    //   return;
    // }
    // // Function that calls API to see if email has been verified or not
    // const resendVerificationEmail = async function () {
    //   setLoading(true);
    //   try {
    //     const res = await API.user.resendVerificationEmail();
    //     // Show flash message and update state
    //     setEmailConfirmed(true);
    //     setFlashMessage({
    //       isVisible: true,
    //       text: res.data.msg,
    //       type: "success"
    //     });
    //   } catch (err) {
    //     // Show flash message and update state
    //     setEmailConfirmed(false);
    //     // show flash message
    //     setFlashMessage({
    //       type: "warning",
    //       isVisible: true,
    //       text: err.response.data.msg
    //     });
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // // Call function
    // resendVerificationEmail();
  };

  // if we have any errors, let's show em!
  React.useEffect(() => {
    // console.log(error);
    if (error.isVisible) {
      setFlashMessage({ ...error });
    }
  }, [error]);

  return (
    <StyledContainer>
      {flashMessage.isVisible && (
        <FlashMessage type={flashMessage.type} isVisible>
          {flashMessage.text}
        </FlashMessage>
      )}

      <Group name="Update Email" href="/account/update/email" />

      <Group name="Update Display Name" href="/account/update/displayName" />

      <Group name="Update Avatar" href="/account/update/avatar" />

      <Group name="Update Password" href="/account/update/password" />

      {!isEmailConfirmed && (
        <StyledGroup>
          <h4>Request Email Confirmation</h4>
          <StyledButton
            type="button"
            onClick={e => onButtonClick(e)}
            disabled={loading}
          >
            Request{loading ? "ing..." : ""} Email Confirmation <ArrowRight />
          </StyledButton>
        </StyledGroup>
      )}

      <Link href="/">
        <StyledButton type="button" displayType="outline">
          <ArrowLeft /> Return Home
        </StyledButton>
      </Link>
    </StyledContainer>
  );
};

export default UserSettings;
