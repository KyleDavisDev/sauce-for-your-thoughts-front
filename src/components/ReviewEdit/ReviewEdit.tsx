import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating";

import {
  IReviewSection,
  IReviewToServer,
  IReview,
  IReviewRequestFromServer
} from "../../redux/reviews/types";
import { editReview, getReview } from "../../redux/reviews/actions";
import ArrowRight from "../../images/icons/ArrowRight";
import { Article } from "../Article/Article";
import Label from "../Label/Label";
import PageTitle from "../PageTitle/PageTitle";
import {
  StyledFormContainer,
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledButton,
  StyledEmptyStar,
  StyledFullStar,
  StyledTextArea
} from "./ReviewEditStyle";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { Overlay } from "../Overlay/Overlay";
import { useRouter } from "next/router";
import { reduxStore } from "../../redux/with-redux-store";
import { useCanUserEditReview } from "../../utils/hooks/useCanUserEditReview";
import { AppState } from "../../redux/configureStore";

export interface ReviewEditProps {}

const ReviewEdit: React.FunctionComponent<ReviewEditProps> = props => {
  // assign router
  const router = useRouter();

  // assign state
  const initRating = { rating: 0, txt: "" };
  const [overall, setOverall] = React.useState<IReviewSection>(initRating);
  const [label, setLabel] = React.useState<IReviewSection>(initRating);
  const [aroma, setAroma] = React.useState<IReviewSection>(initRating);
  const [taste, setTaste] = React.useState<IReviewSection>(initRating);
  const [heat, setHeat] = React.useState<IReviewSection>(initRating);
  const [note, setNote] = React.useState<IReviewSection>(initRating);
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });
  const slug = router.query.s;
  const [review, token]:[review: IReview|null, token: string|null] = useSelector((store: AppState) => {
    // 1. Grab user's token. If not found, we will be redirected soon.
    const _token = store.users.self?.token;
    if (!_token) {
      return [null, null];
    }

    // 2. Make sure we have a displayName for lookups and reviews to search through
    const _displayName = store.users.self?.displayName;
    const _byReviewID = store.reviews.byReviewID;
    if (!_displayName || !_byReviewID) {
      return [null, _token];
    }

    // 3. Grab the ID that matches this specific sauce and user
    const _reviewID = Object.keys(_byReviewID).find(key => {
      // Match author and sauce
      if (
        _byReviewID[key].author === _displayName &&
        _byReviewID[key].sauce === slug
      ) {
        return true;
      }
      return false;
    });
    if (!_reviewID) {
      return [null, _token];
    }

    // 4. Use the ID to grab the total review
    const _review = _byReviewID[_reviewID];

    return [_review, _token];
  });

  // Update local state when we found the review
  React.useEffect(() => {
    if (!review) return;
    // Update state with review data
    setOverall(review.overall);
    setLabel(review.label || initRating);
    setAroma(review.aroma || initRating);
    setTaste(review.taste || initRating);
    setHeat(review.heat || initRating);
    setNote(review.note || initRating);
  }, [review]);

  // Find out if user is eligible to submit a review to this sauce or not
  const [canUserEditReview, error] = useCanUserEditReview();
  if (!error.isGood && !flashMessage.isVisible) {
    setFlashMessage({ isVisible: true, text: error.msg, type: "warning" });
  }

  // assign dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();

  // Go looking for the review if we don't have it
  React.useEffect(() => {
    async function populateReduxStoreFromAPI() {
      try {
        // sanity check
        if (!token) {
          router.push(`/account/login?redirect=${router.asPath}`);
          return;
        }

        // sanity check
        if (!slug || Array.isArray(slug)) {
          router.push(`/account/login?redirect=${router.asPath}`);
          return;
        }

        const data: IReviewRequestFromServer = {
          user: { token },
          sauce: { slug }
        };
        await useThunkDispatch(getReview(data));
      } catch (err) {}
    }

    if (!review && canUserEditReview) {
      populateReduxStoreFromAPI();
    }
  }, [review, canUserEditReview]);

  return (
    <Article>
      <PageTitle>Edit Review</PageTitle>
      <StyledFormContainer>
        <form onSubmit={onSubmit} style={{ maxWidth: "100%" }}>
          {flashMessage.isVisible && (
            <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
          )}
          <Overlay enabled={canUserEditReview}>
            {/* Taste */}
            <StyledRow>
              <StyledDescriptor title="Taste">
                Can you taste garlic? Are there hints of thyme? Describe what
                you taste in the sauce.
              </StyledDescriptor>
              <StyledRightSide>
                <Label>Taste Rating</Label>
                <Rating
                  emptySymbol={<StyledEmptyStar />}
                  fullSymbol={<StyledFullStar />}
                  onClick={e => setTaste({ ...taste, rating: e })}
                  initialRating={taste.rating}
                  readonly={!canUserEditReview}
                />
                <StyledTextArea
                  onChange={e => setTaste({ ...taste, txt: e.target.value })}
                  label="Description"
                  name="taste"
                  id="taste"
                  showLabel={true}
                  value={taste.txt}
                  disabled={!canUserEditReview}
                  readOnly={!canUserEditReview}
                />
              </StyledRightSide>
            </StyledRow>

            {/* Aroma */}
            <StyledRow>
              <StyledDescriptor title="Aroma">
                What can you smell in the sauce? Try closing your eyes and
                wafting the aroma towards your nose? What accents do you pick
                up?
              </StyledDescriptor>
              <StyledRightSide>
                <Label>Aroma Rating</Label>
                <Rating
                  emptySymbol={<StyledEmptyStar />}
                  fullSymbol={<StyledFullStar />}
                  onClick={e => setAroma({ ...aroma, rating: e })}
                  initialRating={aroma.rating}
                  readonly={!canUserEditReview}
                />
                <StyledTextArea
                  onChange={e => setAroma({ ...aroma, txt: e.target.value })}
                  label="Description"
                  name="aroma"
                  id="aroma"
                  showLabel={true}
                  value={aroma.txt}
                  disabled={!canUserEditReview}
                  readOnly={!canUserEditReview}
                />
              </StyledRightSide>
            </StyledRow>

            {/* Label */}
            <StyledRow>
              <StyledDescriptor title="Label">
                How do you feel about the design? Does it speak to you? Does it
                remind you of anything? How effective does the design convey
                what the sauce is/is not.
              </StyledDescriptor>
              <StyledRightSide>
                <Label>Label Rating</Label>
                <Rating
                  emptySymbol={<StyledEmptyStar />}
                  fullSymbol={<StyledFullStar />}
                  onClick={e => setLabel({ ...label, rating: e })}
                  initialRating={label.rating}
                  readonly={!canUserEditReview}
                />
                <StyledTextArea
                  onChange={e => setLabel({ ...label, txt: e.target.value })}
                  label="Description"
                  name="label"
                  id="label"
                  showLabel={true}
                  value={label.txt}
                  disabled={!canUserEditReview}
                  readOnly={!canUserEditReview}
                />
              </StyledRightSide>
            </StyledRow>

            {/* Heat */}
            <StyledRow>
              <StyledDescriptor title="Heat">
                How spicy is this sauce? Did you have to run for water? Was it
                the perfect amount of heat?
              </StyledDescriptor>
              <StyledRightSide>
                <Label>Heat Rating</Label>
                <Rating
                  emptySymbol={<StyledEmptyStar />}
                  fullSymbol={<StyledFullStar />}
                  onClick={e => setHeat({ ...heat, rating: e })}
                  initialRating={heat.rating}
                  readonly={!canUserEditReview}
                />
                <StyledTextArea
                  onChange={e => setHeat({ ...heat, txt: e.target.value })}
                  label="Description"
                  name="heat"
                  id="heat"
                  showLabel={true}
                  value={heat.txt}
                  disabled={!canUserEditReview}
                  readOnly={!canUserEditReview}
                />
              </StyledRightSide>
            </StyledRow>

            {/* Overall */}
            <StyledRow>
              <StyledDescriptor title="Overall">
                What are you overall impressions? What did the sauce get right?
                What can it improve on?
              </StyledDescriptor>
              <StyledRightSide>
                <Label>Overall Rating</Label>
                <Rating
                  emptySymbol={<StyledEmptyStar />}
                  fullSymbol={<StyledFullStar />}
                  onClick={e => setOverall({ ...overall, rating: e })}
                  initialRating={overall.rating}
                  readonly={!canUserEditReview}
                />
                <StyledTextArea
                  onChange={e =>
                    setOverall({ ...overall, txt: e.target.value })
                  }
                  required={true}
                  label="Description"
                  name="overall"
                  id="overall"
                  showLabel={true}
                  value={overall.txt}
                  disabled={!canUserEditReview}
                  readOnly={!canUserEditReview}
                />
              </StyledRightSide>
            </StyledRow>

            {/* Note */}
            <StyledRow>
              <StyledDescriptor title="Note">
                Have any fleeting thoughts that you would like to add? Include
                it here!
              </StyledDescriptor>
              <StyledRightSide>
                <StyledTextArea
                  onChange={e => setNote({ ...note, txt: e.target.value })}
                  label="Description"
                  name="note"
                  id="note"
                  showLabel={true}
                  value={note.txt}
                  disabled={!canUserEditReview}
                  readOnly={!canUserEditReview}
                />
              </StyledRightSide>
            </StyledRow>

            <StyledButton
              onClick={() => {}}
              type="submit"
              disabled={!canUserEditReview}
            >
              Update
              <ArrowRight />
            </StyledButton>
          </Overlay>
        </form>
      </StyledFormContainer>
    </Article>
  );

  async function onSubmit(event: React.FormEvent): Promise<null> {
    event.preventDefault();

    // if user unable to edit, stop
    if (!canUserEditReview) {
      return null;
    }

    // sanity check or get out
    if (!slug || Array.isArray(slug)) {
      router.push("/");
      return null;
    }

    // Make sure we have token
    if (!token) {
      router.replace(`/account/login?return=${router.asPath}`);
      return null;
    }

    try {
      // construct data object
      const data: IReviewToServer = {
        review: {
          heat,
          taste,
          aroma,
          overall,
          label,
          note,
          author: "", // Server will overwrite this
          sauce: slug,
          created: 0 // Server will overwrite this
        }
      };

      // update review
      await useThunkDispatch(editReview(data));

      // Take user to sauce page
      router.push(`/sauce/view?s=${slug}`);
    } catch (err) {
      setFlashMessage({ isVisible: true, text: error.msg, type: "warning" });
    }
    return null;
  }
};

export default ReviewEdit;
