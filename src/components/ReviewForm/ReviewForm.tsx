import * as React from "react";
import { connect, useDispatch } from "react-redux";
import Rating from "react-rating";
import queryString from "query-string";

import { IReviewSection, IReview } from "../../redux/reviews/types";
import { addReview } from "../../redux/reviews/actions";
import { getSauceBySlug } from "../../redux/sauces/actions";
import ArrowRight from "../../images/icons/ArrowRight";
import Auth from "../../utils/Auth/Auth";
import Article from "../Article/Article";
import { AppState, MyThunkDispatch } from "../../redux/configureStore";
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
import { API } from "../../utils/api/API";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { Overlay } from "../Overlay/Overlay";
import { IErrReturn } from "../../utils/Err/Err";
import { useRouter, Router } from "next/router";
import { reduxStore } from "../../redux/with-redux-store";

export interface ReviewFormProps {}

const ReviewForm: React.FunctionComponent<ReviewFormProps> = props => {
  // assign state
  const [enabled, setEnabled] = React.useState(true);
  const [overall, setOverall] = React.useState<IReviewSection>({
    rating: 0,
    txt: ""
  });
  const [label, setLabel] = React.useState<IReviewSection>({
    rating: 0,
    txt: ""
  });
  const [aroma, setAroma] = React.useState<IReviewSection>({
    rating: 0,
    txt: ""
  });
  const [taste, setTaste] = React.useState<IReviewSection>({
    rating: 0,
    txt: ""
  });
  const [heat, setHeat] = React.useState<IReviewSection>({
    rating: 0,
    txt: ""
  });
  const [note, setNote] = React.useState<IReviewSection>({
    rating: 0,
    txt: ""
  });
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  // assign router
  const router = useRouter();

  // assign dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();

  React.useEffect(() => {
    const slug = router.query.s;

    // Sauce slug is whack, redirect user
    if (!slug || Array.isArray(slug)) {
      // Get user outta here
      router.push("/sauces");

      return;
    }

    // Make sure we are at top of page
    window.scrollTo(0, 0);

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
        setEnabled(true);
      })
      .catch((err: IErrReturn) => {
        // 401 === unauthorized, 403 === forbidden
        if (
          err.response.data.status === 401 ||
          err.response.data.status === 403
        ) {
          // Disable form components and show flashmessage
          setEnabled(false);
          setFlashMessage({
            isVisible: true,
            text: err.response.data.msg
          });
        } else {
          // Redirect user to edit page
          router.replace(`/review/edit?s=${slug}`);
        }
      });
  }, []);

  return (
    <Article>
      <PageTitle>Add Review</PageTitle>
      <StyledFormContainer>
        <form onSubmit={onSubmit} style={{ maxWidth: "100%" }}>
          {flashMessage.isVisible && (
            <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
          )}
          <Overlay enabled={enabled}>
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
                  readonly={!enabled}
                />
                <StyledTextArea
                  onChange={e => setTaste({ ...taste, txt: e.target.value })}
                  label="Description"
                  name="taste"
                  id="taste"
                  showLabel={true}
                  value={taste.txt}
                  disabled={!enabled}
                  readonly={!enabled}
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
                  readonly={!enabled}
                />
                <StyledTextArea
                  onChange={e => setAroma({ ...aroma, txt: e.target.value })}
                  label="Description"
                  name="aroma"
                  id="aroma"
                  showLabel={true}
                  value={aroma ? aroma.txt : ""}
                  disabled={!enabled}
                  readonly={!enabled}
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
                  readonly={!enabled}
                />
                <StyledTextArea
                  onChange={e => setLabel({ ...label, txt: e.target.value })}
                  label="Description"
                  name="label"
                  id="label"
                  showLabel={true}
                  value={label ? label.txt : ""}
                  disabled={!enabled}
                  readonly={!enabled}
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
                  readonly={!enabled}
                />
                <StyledTextArea
                  onChange={e => setHeat({ ...heat, txt: e.target.value })}
                  label="Description"
                  name="heat"
                  id="heat"
                  showLabel={true}
                  value={heat ? heat.txt : ""}
                  disabled={!enabled}
                  readonly={!enabled}
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
                  readonly={!enabled}
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
                  disabled={!enabled}
                  readonly={!enabled}
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
                  value={note ? note.txt : ""}
                  disabled={!enabled}
                  readonly={!enabled}
                />
              </StyledRightSide>
            </StyledRow>

            <StyledButton onClick={() => {}} type="submit" disabled={!enabled}>
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
    if (!enabled) {
      return null;
    }

    // Get sauce from URL
    const slug = router.query.s;

    // Sauce slug is whack, redirect user
    if (!slug || Array.isArray(slug)) {
      router.push("/"); // Maybe display banner too?
      return null;
    }

    // make sure token is still good/not expired
    if (!Auth.isUserAuthenticated()) {
      router.replace(`/account/login?return=${router.asPath}`);
    }

    // Make sure we have token
    const token = Auth.getToken();
    if (!token) {
      router.replace(`/account/login?return=${router.asPath}`);
      return null;
    }

    // construct data object
    const data: {
      user: { token: string };
      review: IReview;
    } = {
      user: { token },
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

    try {
      // add review
      await useThunkDispatch(addReview({ data }));
      // get newest info on sauce
      await useThunkDispatch(getSauceBySlug({ slug }));
      // Take user to sauce page
      router.push(`/sauce/view?s=${slug}`);
    } catch (err) {
      console.log("ERR: ", err);
    }
    return null;
  }
};

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatch2Props = (dispatch: MyThunkDispatch) => ({
  addReview: ({
    data
  }: {
    data: { user: { token: string }; review: IReview };
  }) => dispatch(addReview({ data })),
  getSauceBySlug: ({ slug }: { slug: string }) =>
    dispatch(getSauceBySlug({ slug }))
});

// export default connect(mapStateToProps, mapDispatch2Props)(ReviewForm);
export default ReviewForm;
