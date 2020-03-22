import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { AppState } from "../../redux/configureStore";
import { reduxStore } from "../../redux/with-redux-store";
import { IReview } from "../../redux/reviews/types";
import { getSauceBySlug } from "../../redux/sauces/actions";
import TopBar from "../TopBar/TopBar";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { Link } from "../Link/Link";
import { Button } from "../Button/Button";
import List from "../List/List";
import { FlashMessage } from "../FlashMessage/FlashMessage";
import SauceHero from "./components/SauceHero/SauceHero";
import SauceReviews from "./components/SauceReviews/SauceReviews";
import {
  StyledArticle,
  StyledLeftContainer,
  StyledRightContainer,
  StyledDescriptor
} from "./SauceSpotlightStyle";

export interface SauceSpotlightProps {}

const SauceSpotlight: React.SFC<SauceSpotlightProps> = props => {
  // assign dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();
  // assign slug
  const router = useRouter();
  const [slug, setSlug] = React.useState("");

  // look for page-specific info
  const {
    sauce,
    saucesWithNewestReviews,
    reviews,
    doesUserHaveReviewToEdit = false
  } = useSelector((store: AppState) => {
    // 1. Make sure we have sauces to lookup
    const bySlug = store.sauces.bySlug;
    if (!bySlug) {
      return { sauce: null, saucesWithNewestReviews: null, reviews: null };
    }
    // 2. Grab our sauce and make sure it is full, if not assign null
    const _sauce = bySlug[slug] && bySlug[slug]._full ? bySlug[slug] : null;

    // 3. Grab sauces that have had a review added
    const _saucesWithNewestReviews = store.sauces.saucesWithNewestReviews;

    // 4. Grab the reviews for our sauce
    const byReviewID = store.reviews.byReviewID || {};
    const revs = _sauce && _sauce.reviews ? _sauce.reviews : [];
    const areReviewsGrabbable =
      revs &&
      revs.length > 0 &&
      byReviewID &&
      Object.keys(byReviewID).length > 0;
    if (!areReviewsGrabbable) {
      return {
        sauce: _sauce,
        saucesWithNewestReviews: _saucesWithNewestReviews,
        reviews: null
      };
    }
    // Push all reviews in reviews array
    const _reviews: IReview[] = revs.map(hashID => {
      // push specific review into array
      return byReviewID[hashID];
    });

    // 5. Check if user has a review to edit
    const _doesUserHaveReviewToEdit = store.users.self.displayName
      ? _reviews.some(rev => {
          return rev.author === store.users.self.displayName;
        })
      : false;

    return {
      sauce: _sauce,
      saucesWithNewestReviews: _saucesWithNewestReviews,
      reviews: _reviews,
      doesUserHaveReviewToEdit: _doesUserHaveReviewToEdit
    };
  });

  // everytime url changes
  React.useEffect(() => {
    window.scrollTo(0, 0); // Move screen to top
    // update slug
    const { s } = router.query;
    if (!s || Array.isArray(s)) {
      router.push("/");
      return;
    }
    const tmp = s;
    setSlug(tmp);

    async function findTheSauce() {
      try {
        await useThunkDispatch(getSauceBySlug({ slug: tmp }));
      } catch (err) {}
    }

    // if empty sauce, go looking!
    if (!sauce) {
      findTheSauce();
    }
  }, [router.asPath, sauce]);

  return (
    <>
      <TopBar />
      <Navigation />

      <StyledArticle>
        {sauce ? (
          <>
            <StyledLeftContainer>
              {/* FlashMessage */}
              {sauce && (
                <FlashMessage
                  isVisible={sauce.isAdminApproved ? false : true}
                  text={
                    "This sauce has not been approved by an admin yet and, as a result, will not appear listed with the other sauces."
                  }
                  type="warning"
                ></FlashMessage>
              )}

              {/* Spotlight */}
              <SauceHero sauce={sauce} />

              {/* Reviews */}
              <StyledDescriptor
                title={`Reviews (${reviews ? reviews.length : 0})`}
              >
                The opinions expressed are soley those of the author.
              </StyledDescriptor>

              <SauceReviews
                slug={sauce && sauce.slug ? sauce.slug : undefined}
                reviews={reviews}
                displayEditLink={doesUserHaveReviewToEdit}
              />
            </StyledLeftContainer>

            <StyledRightContainer>
              {sauce && sauce._related && sauce._related.length > 0 && (
                <>
                  {sauce.slug && showAppropriateReviewButton(sauce.slug)}
                  <List
                    items={sauce._related.map(x => {
                      return { link: `/sauce/view?s=${x.slug}`, text: x.name };
                    })}
                    title="Related Sauces"
                  />
                </>
              )}
              {saucesWithNewestReviews && saucesWithNewestReviews.length > 0 && (
                <List
                  items={saucesWithNewestReviews.map(x => {
                    return { link: `/sauce/view?s=${x.slug}`, text: x.name };
                  })}
                  title="Recently Reviewed"
                />
              )}
            </StyledRightContainer>
          </>
        ) : (
          "loading..."
        )}
      </StyledArticle>
      <Footer />
    </>
  );

  // Return appropriate "Edit" or "Add" review button. Or loading text.
  function showAppropriateReviewButton(editSlug: string): JSX.Element {
    // Determine which button to return
    if (doesUserHaveReviewToEdit) {
      return (
        <Link to={`/review/edit?s=${editSlug}`}>
          <Button displayType="solid">Edit Your Review</Button>
        </Link>
      );
    }

    return (
      <Link to={`/review/add?s=${editSlug}`}>
        <Button displayType="solid">Add Review</Button>
      </Link>
    );
  }
};

export default SauceSpotlight;
