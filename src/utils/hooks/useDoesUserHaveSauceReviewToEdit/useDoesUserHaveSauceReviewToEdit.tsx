import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/configureStore";

export interface IuseDoesUserHaveSauceReviewToEdit {
  doesUserHaveSauceReviewToEdit: boolean;
  findUserSauceReviewMatch: (slug?: string, user?: string) => void;
}

export function useDoesUserHaveSauceReviewToEdit(
  slug?: string,
  user?: string
): IuseDoesUserHaveSauceReviewToEdit {
  // defaults
  const _defaultUserHasReview = false;

  const [doesUserHaveSauceReviewToEdit, setDoesUserHaveReview] = React.useState<
    boolean
  >(_defaultUserHasReview);

  const { sauces, reviews, users } = useSelector((state: AppState) => state);

  // assign router
  const router = useRouter();

  const findUserSauceReviewMatch = (slug?: string, user?: string) => {
    // 1) use parameter user else grab from redux
    const person = user ? user : users.self?.displayName;
    if (!person) return noMatch();

    // 2) use parameter slug if passed else look at URL
    const sauceSlug = slug ? slug : router.query?.s;
    if (!sauceSlug || Array.isArray(sauceSlug)) return noMatch();

    // 3) Get the sauce's reviews
    const sauceReviews = sauces.bySlug ? sauces.bySlug[sauceSlug].reviews : [];
    if (!sauceReviews || sauceReviews.length === 0) return noMatch();

    // 4) Make sure we have reviews in our store
    if (!reviews.byReviewID || Object.keys(reviews.byReviewID).length === 0)
      return noMatch();

    // 5) Check if any of the reviews have an author of our person
    const isThereAMatch = sauceReviews.some(review => {
      return reviews.byReviewID?.[review].author === person;
    });

    // 6) Last update!
    setDoesUserHaveReview(isThereAMatch);
  };

  function noMatch() {
    // Couldn't find a match, return
    setDoesUserHaveReview(false);
    return;
  }

  React.useEffect(() => {
    findUserSauceReviewMatch(slug, user);
  }, [slug, user]);

  return { doesUserHaveSauceReviewToEdit, findUserSauceReviewMatch };
}
