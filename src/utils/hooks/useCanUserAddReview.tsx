import React from "react";
import { useRouter } from "next/router";
import Auth from "../Auth/Auth";
import { API } from "../api/API";
import { IErrReturn } from "../Err/Err";

export function useCanUserAddReview(): [boolean, string] {
  // assign values
  const [canUserAddReview, setCanUserAddReview] = React.useState(false);
  const [error, setError] = React.useState("");

  // assign router
  const router = useRouter();

  React.useEffect(() => {
    // Make sure user can add review or not
    const token = Auth.getToken();
    if (!token || token.length === 0) {
      // Redirect user to login w/ appropriate return address
      router.replace(`/account/login?return=${router.asPath}`);

      return;
    }

    // Construct data obj
    const data = { user: { token }, sauce: { slug } };

    // Find out if user is eligible to submit a review for this sauce or not
    API.review
      .canUserSubmit({ data })
      .then(res => {
        setCanUserAddReview(true);
      })
      .catch((err: IErrReturn) => {
        // 401 === unauthorized, 403 === forbidden
        if (
          err.response.data.status === 401 ||
          err.response.data.status === 403
        ) {
          // Disable form components and show flashmessage
          setCanUserAddReview(false);
          setError(err.response.data.msg);
        } else {
          // Redirect user to edit page
          router.replace(`/review/edit?s=${slug}`);
        }
      });
  }, []);

  return [canUserAddReview, error];
}
