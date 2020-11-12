import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { Link } from "../Link/Link";
import { StyledContainer, StyledButton } from "./UserSettingsStyle";

import ArrowRight from "../../images/icons/ArrowRight";
import ArrowLeft from "../../images/icons/ArrowLeft";

import { API } from "../../utils/api/API";
import { useIsEmailConfirmed } from "../../utils/hooks/useIsEmailConfirmed";
import ButtonRedirect from "./components/ButtonRedirect/ButtonRedirect";
import RequestConfirmation from "./components/RequestConfirmation/RequestConfirmation";

export interface UserSettingsProps {}

const UserSettings: React.FC<UserSettingsProps> = props => {
  // init state
  const [flashMessage, setFlashMessage] = useState<FlashMessageProps>({
    isVisible: false
  });

  // check if the email was confirmed
  const {
    loading,
    isEmailConfirmed,
    error,
    getEmailConfirmed
  } = useIsEmailConfirmed();

  useEffect(() => {
    async function fetchData() {
      await getEmailConfirmed();
    }
    fetchData();
  }, []);

  // if we have any errors, let's show em!
  React.useEffect(() => {
    if (error.isVisible) {
      setFlashMessage({ ...error });
    }
  }, [error]);

  // move screen to top when flashMessage changes
  React.useEffect(() => {
    window.moveTo(0, 0);
  }, [flashMessage.text]);

  return (
    <StyledContainer>
      {flashMessage.isVisible && (
        <FlashMessage type={flashMessage.type} isVisible>
          {flashMessage.text}
        </FlashMessage>
      )}

      <ButtonRedirect name="Update Email" href="/account/update/email" />

      <ButtonRedirect
        name="Update Display Name"
        href="/account/update/displayName"
      />

      <ButtonRedirect name="Update Avatar" href="/account/update/avatar" />

      <ButtonRedirect name="Update Password" href="/account/update/password" />

      {!isEmailConfirmed && (
        <RequestConfirmation setFlashMessage={setFlashMessage} />
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
