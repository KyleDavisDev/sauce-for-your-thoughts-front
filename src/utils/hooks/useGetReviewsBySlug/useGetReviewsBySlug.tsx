import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../../redux/configureStore";
import { FlashMessageProps } from "../../../components/FlashMessage/FlashMessage";
import { IReview } from "../../../redux/reviews/types";
import { getReviewsBySlug } from "../../../redux/reviews/actions";

export interface IuseGetReviewsBySlug {
  loading: boolean;
  reviews: IReview[];
  error: FlashMessageProps;
  getReviews: () => Promise<void>;
}

export function useGetReviewsBySlug(slug?: string): IuseGetReviewsBySlug {
  // init defaults
  const _defaultIsLoading = false;
  const _defaultReviews: IReview[] = [];
  const _defaultFlashState = { isVisible: false };
  const _defaultErrorMsg =
    "Could not find a sauce corresponding to this page. Please refresh and try again.";

  // get sauces from redux store
  const { sauces: reduxSauces, reviews: reduxReviews } = useSelector(
    (state: AppState) => state
  );
  // assign reviews
  const [reviews, setReviews] = React.useState<IReview[]>(_defaultReviews);
  // assign loading
  const [loading, setLoading] = React.useState(_defaultIsLoading);
  const [error, setError] = React.useState<FlashMessageProps>(
    _defaultFlashState
  );

  // assign dispatch
  const dispatch = useDispatch();
  // assign router
  const router = useRouter();

  // define function
  const getReviews = async () => {
    // Prevent calling multiple times if already loading or if we already found reviews
    if (reviews.length > 0) return;
    if (loading) return;

    try {
      setLoading(true);

      // use specific slug if passed else look at URL
      const s = slug ? slug : router.query?.s;
      if (!s || Array.isArray(s)) {
        return;
      }

      // Go look for sauces
      dispatch(getReviewsBySlug({ slug: s }));
    } catch (err) {
      setError({
        type: "warning",
        isVisible: true,
        text: err.response.data.msg || _defaultErrorMsg
      });
    } finally {
      // finish loading
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // use specific slug if passed else look at URL
    const s = slug ? slug : router.query?.s;
    if (!s || Array.isArray(s)) return;

    const { bySlug } = reduxSauces;
    if (!bySlug || Object.keys(bySlug).length === 0) return;

    // Find actual sauces
    const sauceOfInterest = bySlug[s];

    const { byReviewID } = reduxReviews;
    if (!byReviewID || Object.keys(byReviewID).length === 0) return;

    // Grab specific reviews from redux
    const _reviews = sauceOfInterest.reviews
      ? sauceOfInterest.reviews.map(review => {
          return byReviewID[review];
        })
      : [];

    setReviews(_reviews);
  }, [slug, router.asPath, reduxReviews.allReviewIDs]);

  return { loading, reviews, getReviews, error };
}
