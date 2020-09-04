import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating";

import { IReviewSection, IReviewToServer } from "../../redux/reviews/types";
import { getSauceBySlug } from "../../redux/sauces/actions";
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
} from "./ReviewFormStyle";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { Overlay } from "../Overlay/Overlay";
import { useRouter } from "next/router";
import { reduxStore } from "../../redux/with-redux-store";
import { useCanUserAddReview } from "../../utils/hooks/useCanUserAddReview";
import { AppState } from "../../redux/configureStore";

export interface ReviewFormProps {
  onSubmit: (data: IReviewToServer) => Promise<null>;
}

const ReviewForm: React.FunctionComponent<ReviewFormProps> = props => {
  // assign router
  const router = useRouter();

  // assign state
  const token = useSelector((store: AppState) => store.users.self.token);
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

  // assign dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();

  // Find out if user is eligible to submit a review to this sauce or not
  const [canUserAddReview, error] = useCanUserAddReview();
  if (!error.isGood && !flashMessage.isVisible) {
    setFlashMessage({ isVisible: true, text: error.msg, type: "warning" });
  }

  return (
    <Article>
      <PageTitle>Add Review</PageTitle>
      <StyledFormContainer>
        <form onSubmit={onSubmit} style={{ maxWidth: "100%" }}>
          {flashMessage.isVisible && (
            <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
          )}
          <Overlay enabled={canUserAddReview}>
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
                  readonly={!canUserAddReview}
                />
                <StyledTextArea
                  onChange={e => setTaste({ ...taste, txt: e.target.value })}
                  label="Description"
                  name="taste"
                  id="taste"
                  showLabel={true}
                  value={taste.txt}
                  disabled={!canUserAddReview}
                  readOnly={!canUserAddReview}
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
                  readonly={!canUserAddReview}
                />
                <StyledTextArea
                  onChange={e => setAroma({ ...aroma, txt: e.target.value })}
                  label="Description"
                  name="aroma"
                  id="aroma"
                  showLabel={true}
                  value={aroma ? aroma.txt : ""}
                  disabled={!canUserAddReview}
                  readOnly={!canUserAddReview}
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
                  readonly={!canUserAddReview}
                />
                <StyledTextArea
                  onChange={e => setLabel({ ...label, txt: e.target.value })}
                  label="Description"
                  name="label"
                  id="label"
                  showLabel={true}
                  value={label ? label.txt : ""}
                  disabled={!canUserAddReview}
                  readOnly={!canUserAddReview}
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
                  readonly={!canUserAddReview}
                />
                <StyledTextArea
                  onChange={e => setHeat({ ...heat, txt: e.target.value })}
                  label="Description"
                  name="heat"
                  id="heat"
                  showLabel={true}
                  value={heat ? heat.txt : ""}
                  disabled={!canUserAddReview}
                  readOnly={!canUserAddReview}
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
                  readonly={!canUserAddReview}
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
                  value={overall ? overall.txt : ""}
                  disabled={!canUserAddReview}
                  readOnly={!canUserAddReview}
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
                  disabled={!canUserAddReview}
                  readOnly={!canUserAddReview}
                />
              </StyledRightSide>
            </StyledRow>

            <StyledButton
              onClick={() => {}}
              type="submit"
              disabled={!canUserAddReview}
            >
              Submit
              <ArrowRight />
            </StyledButton>
          </Overlay>
        </form>
      </StyledFormContainer>
    </Article>
  );

  async function onSubmit(event: React.FormEvent): Promise<null> {
    event.preventDefault();
    // if form disabled, don't do anything.
    if (!canUserAddReview) {
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
          _id: 0, // Server will overwrite this
          author: "", // Server will overwrite this
          sauce: slug,
          created: 0 // Server will overwrite this
        }
      };

      // pass data to parent
      props.onSubmit(data);

      // get newest info on sauce
      await useThunkDispatch(getSauceBySlug({ slug }));

      // Take user to sauce page
      router.push(`/sauce/view?s=${slug}`);
    } catch (err) {
      setFlashMessage({ isVisible: true, text: error.msg, type: "warning" });
    }
    return null;
  }
};

export default ReviewForm;
