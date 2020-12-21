import * as React from "react";

import { Link } from "../Link/Link";
import { Button } from "../Button/Button";
import SauceHero from "./components/SauceHero/SauceHero";
import SauceRelated from "./components/SauceRelated/SauceRelated";
import SauceReviews from "./components/SauceReviews/SauceReviews";
import {
  StyledLeftContainer,
  StyledRightContainer
} from "./SauceSpotlightStyle";
import { useSauceBySlug } from "../../utils/hooks/useSauceBySlug/useSauceBySlug";
import SauceNewestReviews from "./components/SauceNewestReviews/SauceNewestReviews";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/configureStore";

export interface SauceSpotlightProps {}

const SauceSpotlight: React.FC<SauceSpotlightProps> = () => {
  const { loading, sauce, reviews, error, getTheSauce } = useSauceBySlug();

  const displayName = useSelector(
    (store: AppState) => store.users.self?.displayName
  );

  React.useEffect(() => {
    if (!loading) {
      getTheSauce();
    }
  }, []);

  return (
    <>
      <StyledLeftContainer>
        <SauceHero loading={loading} sauce={sauce} error={error} />

        <SauceReviews loading={loading} reviews={reviews} error={error} />
        {showAppropriateReviewButton()}
      </StyledLeftContainer>

      <StyledRightContainer>
        {showAppropriateReviewButton()}
        <SauceRelated loading={loading} sauce={sauce} error={error} />

        <SauceNewestReviews />
      </StyledRightContainer>
    </>
  );

  // Return appropriate "Edit" or "Add" review button. Or loading text.
  function showAppropriateReviewButton(): JSX.Element {
    // 1) If no sauce, we probably loading so render that button
    if (loading || !sauce || !sauce.slug) return loadingButton();

    // 2) If no reviews or cannot find user, direct user to add review
    if (!reviews || !displayName) return addReviewButton(sauce.slug);

    // 3) Look for a match for the author of the review and our user
    const doesUserHaveReviewToEdit = reviews.some(review => {
      return review.author === displayName;
    });

    // 4) If user has a review, direct them to edit it
    if (doesUserHaveReviewToEdit) return editReviewButton(sauce.slug);

    // 5) Catch-all
    return addReviewButton(sauce.slug);
  }

  function addReviewButton(slug?: string): JSX.Element {
    return (
      <Link href={`/review/add?s=${slug}`}>
        <Button displayType="solid">Add Review</Button>
      </Link>
    );
  }

  function editReviewButton(slug: string): JSX.Element {
    return (
      <Link href={`/review/edit?s=${slug}`}>
        <Button displayType="solid">Edit Your Review</Button>
      </Link>
    );
  }

  function loadingButton(): JSX.Element {
    return (
      <Link href="#">
        <Button displayType="outline">Loading...</Button>
      </Link>
    );
  }
};

export default SauceSpotlight;
