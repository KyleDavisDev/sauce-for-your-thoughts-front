import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import ArrowRight from "../../../../images/icons/ArrowRight";
import { AppState } from "../../../../redux/configureStore";
import { API } from "../../../../utils/api/API";
import { FlashMessageProps } from "../../../FlashMessage/FlashMessage";

import { StyledDiv, StyledButton } from "../ButtonRedirect/ButtonRedirectStyle";

interface IRequestConfirmationProps {
  setFlashMessage: React.Dispatch<React.SetStateAction<FlashMessageProps>>;
}

const RequestConfirmation: React.FunctionComponent<IRequestConfirmationProps> = props => {
  const [loading, setLoading] = React.useState(false);
  const [shouldShowSelf, setShouldShowSelf] = React.useState(true);

  // get router
  const router = useRouter();

  // get token from redux
  const token = useSelector((store: AppState) => store.users?.self?.token);

  const onButtonClick = () => {
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
        if (res.data.isGood) {
          // hide button and show flashmessage
          setShouldShowSelf(false);
          props.setFlashMessage({
            isVisible: true,
            text: "Verification email has been sent!",
            type: "success"
          });
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    // Call function if we aren't already loading
    if (!loading) {
      resendVerificationEmail();
    }
  };

  // Don't need to render anything
  if (!shouldShowSelf) return null;

  // render button
  return (
    <StyledDiv>
      <h4>Request Email Confirmation</h4>
      <StyledButton
        type="button"
        onClick={() => onButtonClick()}
        disabled={loading}
      >
        Request{loading ? "ing..." : ""} Email Confirmation <ArrowRight />
      </StyledButton>
    </StyledDiv>
  );
};

export default RequestConfirmation;
