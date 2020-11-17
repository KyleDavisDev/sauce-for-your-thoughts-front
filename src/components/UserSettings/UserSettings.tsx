import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { Link } from "../Link/Link";
import { StyledContainer, StyledButton } from "./UserSettingsStyle";

import ArrowLeft from "../../images/icons/ArrowLeft";

import { useIsEmailConfirmed } from "../../utils/hooks/useIsEmailConfirmed/useIsEmailConfirmed";
import ButtonRedirect from "./components/ButtonRedirect/ButtonRedirect";
import RequestConfirmation from "./components/RequestConfirmation/RequestConfirmation";
import { AppState } from "../../redux/configureStore";

export interface UserSettingsProps {}

const UserSettings: React.FC<UserSettingsProps> = props => {
  const _emailBtn = { name: "Update Email", href: "/account/update/email" };
  const _displayNameBtn = {
    name: "Update Display Name",
    href: "/account/update/displayname"
  };
  const _avatarBtn = { name: "Update Avatar", href: "/account/update/avatar" };
  const _passwordBtn = {
    name: "Update Password",
    href: "/account/update/password"
  };

  const _buttonsToRender = [
    _emailBtn,
    _displayNameBtn,
    _avatarBtn,
    _passwordBtn
  ];

  // init state
  const [flashMessage, setFlashMessage] = useState<FlashMessageProps>({
    isVisible: false
  });

  // Grab token from redux
  const token = useSelector((store: AppState) => store.users?.self?.token);

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

    if (!loading) fetchData();
  }, [token]);

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

      {_buttonsToRender.map((buttonInfo, ind) => {
        return (
          <ButtonRedirect {...buttonInfo} key={ind + "-" + buttonInfo.name} />
        );
      })}

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
