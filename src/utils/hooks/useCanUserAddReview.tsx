import React from "react";
import { useRouter } from "next/router";
import { API } from "../api/API";
import { IErrReturn } from "../Err/Err";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/configureStore";
import { IErrParams } from "../../utils/Err/Err";

export function useCanUserAddReview(): [boolean, IErrParams] {
  // assign values
  const [canUserAddReview, setCanUserAddReview] = React.useState(false);
  const [error, setError] = React.useState<IErrParams>({
    isGood: true,
    msg: "",
    status: 0
  });
  const token = useSelector((store: AppState) => store.users.self?.token);

  // assign router
  const router = useRouter();

  React.useEffect(() => {
    // Make sure we have a user's token to use to lookup
    if (!token || token.length === 0) {
      setError({
        isGood: false,
        msg:
          "Oops! Looks like you need to log in first. Redirecting you now...",
        status: 403 // forbidden
      });
      setCanUserAddReview(false);
      return;
    }

    // get sauce from URL and sanity check
    const _slug = router.query.s;

    if (!_slug || Array.isArray(_slug)) {
      setError({
        isGood: false,
        msg:
          "Oops! It looks like your url is invalid. Please verify how you got here.",
        status: 403 // forbidden
      });
      setCanUserAddReview(false);
      return;
    }

    // Construct data obj
    const data = { user: { token }, sauce: { slug: _slug } };

    // Find out if user is eligible to submit a review for this sauce or not
    API.review
      .canUserSubmit({ data })
      .then(res => {
        setCanUserAddReview(true);
      })
      .catch((err: IErrReturn) => {
        // 401 === unauthorized, 403 === forbidden
        setCanUserAddReview(false);
        setError({
          isGood: err.response.data.isGood,
          msg: err.response.data.msg,
          status: err.response.data.status
        });
      });
  }, [router.query]);

  return [canUserAddReview, error];
}
