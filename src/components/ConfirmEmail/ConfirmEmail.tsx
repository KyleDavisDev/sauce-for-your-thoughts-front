import * as React from "react";

import LogoSFYT from "../../images/icons/LogoSFYT";
import PageTitle from "../PageTitle/PageTitle";
import { Link } from "../Link/Link";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer
} from "./ConfirmEmailStyle";
import { FlashMessage, FlashMessageProps } from "../FlashMessage/FlashMessage";
import { API } from "../../utils/api/API";
import { IErrReturn } from "../../utils/Err/Err";
import { useRouter } from "next/router";

export interface ConfirmEmailProps {
  jwt?: string | string[];
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = props => {
  // set flashmessage state
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false,
    text: "",
    type: undefined
  });

  // set state
  const [loading, setLoading] = React.useState(false);

  // grab jwt from props
  const { jwt } = props;

  // Assign router
  const router = useRouter();

  React.useEffect(function () {
    // Define our async function
    async function callAPI() {
      // if no jwt passed, get out
      if (!jwt || Array.isArray(jwt)) {
        router.push("/");
        return;
      }

      // update loading
      setLoading(true);

      // Call API to validate email
      await API.user
        .confirmEmail({ data: { jwt } })
        .then(res => {
          setFlashMessage({
            isVisible: true,
            text: res.data.msg,
            type: res.data.isGood ? "success" : "alert",
            slug: "/sauces",
            slugText: "Click here to start finding Sauces!"
          });
        })
        .catch((err: IErrReturn) => {
          setFlashMessage({
            isVisible: true,
            text:
              err.response.data.msg +
              " Please contact SFYT admins at sfytadmin@gmail.com if this continues to occur.",
            type: err.response.data.isGood ? "success" : "alert",
            slug: ""
          });
        })
        .finally(() => {
          // update loading
          setLoading(false);
        });
    }

    // If we are not currently loading, then we can call the function
    if (!loading) {
      callAPI();
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
        <PageTitle>Confirm Email</PageTitle>
        <StyledFormContainer>
          {flashMessage.isVisible && (
            <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
          )}
          {loading && "Loading..."}
        </StyledFormContainer>
      </StyledArticle>
    </StyledDiv>
  );
};

export default ConfirmEmail;
