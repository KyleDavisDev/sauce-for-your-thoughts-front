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
import { useSelector } from "react-redux";
import { AppState } from "../../redux/configureStore";

export interface UserSettingsProps {}

const UserSettings: React.FC<UserSettingsProps> = props => {
  // init state
  const [isEmailConfirmed, setEmailConfirmed] = useState(true);
  const [flashMessage, setFlashMessage] = useState<FlashMessageProps>({
    isVisible: false
  });
  const [loading, setLoading] = useState(false);

  // assign router
  const router = useRouter();

  // Grab token from redux
  const token = useSelector((store: AppState) => store.users?.self?.token);

  // Make sure user has a token
  useEffect(() => {
    // Quick sanity check
    if (!token) {
      router.replace(`/account/login?return=${router.asPath}`);
      return;
    }
    window.scrollTo(0, 0); // Move screen to top

    const getEmailConfirmed = async function () {
      // get token
      if (!token) return null;

      // construct data object
      const data = { user: { token } };

      try {
        // hit our API
        const res = await API.user.isEmailConfirmed({ data });
        // Set state so we know if we should display the button or not
        setEmailConfirmed(res.data.isGood);
      } catch (err) {
        // Set state so we know if we should display the button or not
        setEmailConfirmed(err.response.data.isGood);
        // show flash message
        setFlashMessage({
          type: "warning",
          isVisible: true,
          text: err.response.data.msg
        });
      }

      return null;
    };

    // Check if user has their email verified or not
    getEmailConfirmed();
  }, []);

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Quick sanity check
    if (!token) {
      router.replace(`/account/login?return=${router.asPath}`);
      return;
    }

    // Function that calls API to see if email has been verified or not
    const resendVerificationEmail = async function () {
      setLoading(true);
      try {
        const res = await API.user.resendVerificationEmail();
        // Show flash message and update state
        setEmailConfirmed(true);
        setFlashMessage({
          isVisible: true,
          text: res.data.msg,
          type: "success"
        });
        setLoading(false);
      } catch (err) {
        // Show flash message and update state
        setEmailConfirmed(false);
        // show flash message
        setFlashMessage({
          type: "warning",
          isVisible: true,
          text: err.response.data.msg
        });
        setLoading(false);
      }
    };

    // Call function
    resendVerificationEmail();
  };

  return (
    <StyledContainer>
      {flashMessage.isVisible && (
        <FlashMessage type={flashMessage.type} isVisible>
          {flashMessage.text}
        </FlashMessage>
      )}

      <StyledGroup>
        <h4>Update email</h4>
        <Link href="/account/update/email">
          <StyledButton type="button">
            Update email <ArrowRight />
          </StyledButton>
        </Link>
      </StyledGroup>

      <StyledGroup>
        <h4>Update Display Name</h4>
        <Link href="/account/update/displayName">
          <StyledButton type="button">
            Update Display Name <ArrowRight />
          </StyledButton>
        </Link>
      </StyledGroup>

      <StyledGroup>
        <h4>Update Avatar</h4>
        <Link href="/account/update/avatar">
          <StyledButton type="button">
            Update Avatar <ArrowRight />
          </StyledButton>
        </Link>
      </StyledGroup>

      <StyledGroup>
        <h4>Update Password</h4>
        <Link href="/account/update/password">
          <StyledButton type="button">
            Update Password <ArrowRight />
          </StyledButton>
        </Link>
      </StyledGroup>

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

function useOnResendConfirmationEmail() {
  // assign loading
  const [loading, setLoading] = useState(false);
  // assign results
  const [results, setResults] = useState([]);

  useEffect(() => {});
}

export default UserSettings;
