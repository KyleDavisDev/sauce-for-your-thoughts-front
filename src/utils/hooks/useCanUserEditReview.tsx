import React from "react";
import { useRouter } from "next/router";
import { API } from "../api/API";
import { IErrReturn } from "../Err/Err";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/configureStore";
import { IErrParams } from "../../utils/Err/Err";

export function useCanUserEditReview(): [boolean, IErrParams] {
  // assign values
  const [canUserEditReview, setCanUserEditReview] = React.useState(false);
  const [error, setError] = React.useState<IErrParams>({
    isGood: true,
    msg: "",
    status: 0
  });
  const token = useSelector((store: AppState) => store.users.self.token);

  // assign router
  const router = useRouter();

  React.useEffect(() => {
    // Make sure we have a user's token to use to lookup
    if (!token || token.length === 0) {
      setError({
        isGood: false,
        msg: "Oops! Looks like we were unable to determine who you are.",
        status: 401 // unauthorized
      });
      setCanUserEditReview(false);
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
      setCanUserEditReview(false);
      return;
    }

    // Construct data obj
    const data = { sauce: { slug: _slug } };

    // Find out if user is eligible to submit a review for this sauce or not
    API.review
      .canUserEdit({ data })
      .then(res => {
        setCanUserEditReview(true);
      })
      .catch((err: IErrReturn) => {
        // 401 === unauthorized, 403 === forbidden
        setCanUserEditReview(false);
        setError({
          isGood: err.response.data.isGood,
          msg: err.response.data.msg,
          status: err.response.data.status
        });
      });
  }, [router.query]);

  return [canUserEditReview, error];
}
