import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import PageTitle from "../PageTitle/PageTitle";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { Link } from "../Link/Link";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledContainer,
  StyledButton,
  StyledGroup
} from "./UserSettingsStyle";

import LogoSFYT from "../../images/icons/LogoSFYT";
import ArrowRight from "../../images/icons/ArrowRight";
import ArrowLeft from "../../images/icons/ArrowLeft";

import Auth from "../../utils/Auth/Auth";
import { API } from "../../utils/api/API";
import { IErrReturn } from "../../utils/Err/Err";

export interface UserSettingsProps {}

export interface UserSettingsState {
  isEmailConfirmed: boolean;
  flashMessage: FlashMessageProps;
}

const UserSettings: React.FC<UserSettingsProps> = props => {
  // init sate
  const [isEmailConfirmed, setEmailConfirmed] = useState(true);
  const [flashMessage, setFlashMessage] = useState<FlashMessageProps>({
    isVisible: false
  });
  const [loading, setLoading] = useState(false);

  // assign router
  const router = useRouter();

  // Make sure user has a token
  useEffect(() => {
    // get token or redirect to login
    const token = Auth.getToken();
    if (!token) {
      router.replace(`/account/login?return=${router.asPath}`);
      return;
    }
    window.scrollTo(0, 0); // Move screen to top
  }, []);

  // Check if user has their email verified or not
  useEffect(() => {
    async function getEmailConfirmed() {
      // get token
      const token = Auth.getToken();
      if (!token) return null;

      // construct data object
      const data = { user: { token } };

      // hit our API
      return await API.user
        .isEmailConfirmed({ data })
        .then(res => {
          // Set state so we know if we should display the button or not
          setEmailConfirmed(res.data.isGood);
        })
        .catch((err: IErrReturn) => {
          // Set state so we know if we should display the button or not
          setEmailConfirmed(err.response.data.isGood);
        });
    }

    getEmailConfirmed();
  }, []);

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // get token or redirect to login
    const token = Auth.getToken();
    if (!token) {
      router.replace(`/account/login?return=${router.asPath}`);
      return;
    }

    // Call API to see if email has been verified or not
    const data = { user: { token } };
    setLoading(true);
    API.user.resendVerificationEmail({ data }).then(res => {
      // Show flash message and update state
      setEmailConfirmed(true);
      setFlashMessage({ isVisible: true, text: res.data.msg, type: "success" });
      setLoading(false);
    });
  };

  return (
    <StyledDiv>
      <StyledLogoContainer>
        <Link to="/">
          <LogoSFYT />
        </Link>
      </StyledLogoContainer>
      <hr />
      <StyledArticle>
        <PageTitle>Manage your account</PageTitle>
        <StyledContainer>
          {flashMessage.isVisible && (
            <FlashMessage type={flashMessage.type} isVisible>
              {flashMessage.text}
            </FlashMessage>
          )}

          <StyledGroup>
            <h4>Update email</h4>
            <Link to="/account/update/email">
              <StyledButton type="button">
                Update email <ArrowRight />
              </StyledButton>
            </Link>
          </StyledGroup>

          <StyledGroup>
            <h4>Update Display Name</h4>
            <Link to="/account/update/displayname">
              <StyledButton type="button">
                Update Display Name <ArrowRight />
              </StyledButton>
            </Link>
          </StyledGroup>

          <StyledGroup>
            <h4>Update Avatar</h4>
            <Link to="/account/update/avatar">
              <StyledButton type="button">
                Update Avatar <ArrowRight />
              </StyledButton>
            </Link>
          </StyledGroup>

          <StyledGroup>
            <h4>Update Password</h4>
            <Link to="/account/update/password">
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
                Request{loading ? "ing..." : ""} Email Confirmation{" "}
                <ArrowRight />
              </StyledButton>
            </StyledGroup>
          )}

          <Link to="/">
            <StyledButton type="button" displayType="outline">
              <ArrowLeft /> Return Home
            </StyledButton>
          </Link>
        </StyledContainer>
      </StyledArticle>
    </StyledDiv>
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
