import * as React from "react";
import "@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css";
import { connect } from "react-redux";
import Rating from "react-rating";
import queryString, { OutputParams } from "query-string";

import { IReviewSection, IReview } from "../../redux/reviews/types";
import { addReview } from "../../redux/reviews/actions";
import { getSauceBySlug } from "../../redux/sauces/actions";
import ArrowRight from "../../images/icons/ArrowRight";
import Auth from "../../utils/Auth/Auth";
import Article from "../../components/Article/Article";
import Footer from "../../components/Footer/Footer";
import { AppState, MyThunkDispatch } from "../../redux/configureStore";
import Label from "../../components/Label/Label";
import Navigation from "../../components/Navigation/Navigation";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextArea from "../../components/TextArea/TextArea";
import TopBar from "../../components/TopBar/TopBar";
import {
  StyledFormContainer,
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledButton,
  StyledEmptyStar,
  StyledFullStar,
  StyledTextArea
} from "./ReviewAddStyle";
import { API } from "../../utils/api/API";

export interface ReviewAddProps {
  addReview: ({
    data
  }: {
    data: { user: { token: string }; review: IReview };
  }) => Promise<null>;
  getSauceBySlug: ({ slug }: { slug: string }) => Promise<null>;
  history: { push: (location: string) => any };
  user: { token?: string };
  location: { search: string };
}

export interface ReviewAddState {
  overall: IReviewSection;
  label: IReviewSection;
  aroma: IReviewSection;
  taste: IReviewSection;
  heat: IReviewSection;
  note: IReviewSection;
  [key: string]: IReviewSection;
}

class ReviewAdd extends React.Component<ReviewAddProps, ReviewAddState> {
  constructor(props: ReviewAddProps) {
    super(props);

    this.state = {
      overall: { rating: 3, txt: "overall here", disabled: true },
      label: { rating: 3, txt: "label here   ", disabled: true },
      aroma: { rating: 3, txt: "aroma here", disabled: true },
      taste: { rating: 2, txt: "taste here", disabled: true },
      heat: { rating: 2, txt: "heat hereeeee", disabled: true },
      note: { rating: 0, txt: "We got an extra note too", disabled: true }
    };
  }

  public componentDidMount() {
    const slug: string | null = this.getPageFromPath(
      this.props.location.search
    );

    // Sauce slug is whack, redirect user
    if (slug === null) {
      // Get user outta here
      this.props.history.push("/");
      // Maybe display banner too?

      return;
    }

    // Make sure we are at top of page
    window.scrollTo(0, 0);

    // Make sure user can add review or not
    const token = Auth.getToken();
    if (!token || token.length === 0) {
      // Get user outta here
      this.props.history.push("/");

      return;
    }

    const data = { user: { token }, sauce: { slug } };

    API.review
      .canUserSubmit({ data })
      .then(res => {
        this.setState(() => {
          return Object.keys(this.state)
            .map(key => {
              return { [key]: { ...this.state[key], disabled: false } };
            })
            .reduce((accum, cur) => {
              return { ...accum, ...cur };
            }, {});
        });
      })
      .catch(err => {
        console.log("in catch");
        this.setState(() => {
          return Object.keys(this.state)
            .map(key => {
              return { [key]: { ...this.state[key], disabled: true } };
            })
            .reduce((accum, cur) => {
              return { ...accum, ...cur };
            }, {});
        });
      });
  }

  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <Article>
          <PageTitle>Add Review</PageTitle>
          <StyledFormContainer>
            <form onSubmit={this.onSubmit} style={{ maxWidth: "100%" }}>
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
                    onClick={e => this.onStarClick(e, "taste")}
                    initialRating={this.state.taste.rating}
                  />
                  <StyledTextArea
                    onChange={this.onTextChange}
                    label="Description"
                    name="taste"
                    id="taste"
                    showLabel={true}
                    value={this.state.taste.txt}
                    disabled={this.state.taste.disabled}
                    readonly={this.state.taste.disabled}
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
                    onClick={e => this.onStarClick(e, "aroma")}
                    initialRating={this.state.aroma.rating}
                  />
                  <StyledTextArea
                    onChange={this.onTextChange}
                    label="Description"
                    name="aroma"
                    id="aroma"
                    showLabel={true}
                    value={this.state.aroma ? this.state.aroma.txt : ""}
                    disabled={this.state.aroma.disabled}
                    readonly={this.state.aroma.disabled}
                  />
                </StyledRightSide>
              </StyledRow>

              {/* Label */}
              <StyledRow>
                <StyledDescriptor title="Label">
                  How do you feel about the design? Does it speak to you? Does
                  it remind you of anything? How effective does the design
                  convey what the sauce is/is not.
                </StyledDescriptor>
                <StyledRightSide>
                  <Label>Label Rating</Label>
                  <Rating
                    emptySymbol={<StyledEmptyStar />}
                    fullSymbol={<StyledFullStar />}
                    onClick={e => this.onStarClick(e, "label")}
                    initialRating={this.state.label.rating}
                  />
                  <StyledTextArea
                    onChange={this.onTextChange}
                    label="Description"
                    name="label"
                    id="label"
                    showLabel={true}
                    value={this.state.label ? this.state.label.txt : ""}
                    disabled={this.state.label.disabled}
                    readonly={this.state.label.disabled}
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
                    onClick={e => this.onStarClick(e, "heat")}
                    initialRating={this.state.heat.rating}
                  />
                  <StyledTextArea
                    onChange={this.onTextChange}
                    label="Description"
                    name="heat"
                    id="heat"
                    showLabel={true}
                    value={this.state.heat ? this.state.heat.txt : ""}
                    disabled={this.state.heat.disabled}
                    readonly={this.state.heat.disabled}
                  />
                </StyledRightSide>
              </StyledRow>

              {/* Overall */}
              <StyledRow>
                <StyledDescriptor title="Overall">
                  What are you overall impressions? What did the sauce get
                  right? What can it improve on?
                </StyledDescriptor>
                <StyledRightSide>
                  <Label>Overall Rating</Label>
                  <Rating
                    emptySymbol={<StyledEmptyStar />}
                    fullSymbol={<StyledFullStar />}
                    onClick={e => this.onStarClick(e, "overall")}
                    initialRating={this.state.overall.rating}
                  />
                  <StyledTextArea
                    onChange={this.onTextChange}
                    required={true}
                    label="Description"
                    name="overall"
                    id="overall"
                    showLabel={true}
                    value={this.state.overall ? this.state.overall.txt : ""}
                    disabled={this.state.overall.disabled}
                    readonly={this.state.overall.disabled}
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
                    onChange={this.onTextChange}
                    label="Description"
                    name="note"
                    id="note"
                    showLabel={true}
                    value={this.state.note ? this.state.note.txt : ""}
                    disabled={this.state.note.disabled}
                    readonly={this.state.note.disabled}
                  />
                </StyledRightSide>
              </StyledRow>

              <StyledButton onClick={() => {}} type="submit">
                Submit
                <ArrowRight />
              </StyledButton>
            </form>
          </StyledFormContainer>
        </Article>
        <Footer />
      </div>
    );
  }

  private onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event || !event.target) {
      return;
    }

    // Grab the name and value
    const { name, value }: { name: string; value: string } = event.target;

    // Update local state
    this.setState({
      [name]: { ...this.state[name], txt: value }
    });
  };

  private onStarClick = (value: number, id: string): void => {
    this.setState({
      ...this.state,
      [id]: { ...this.state[id], rating: value }
    });
  };

  private onSubmit = async (event: React.FormEvent): Promise<null> => {
    event.preventDefault();

    const { user, history } = this.props;

    // Get sauce from URL
    const slug: string | null = this.getPageFromPath(
      this.props.location.search
    );

    // Sauce slug is whack, redirect user
    if (slug === null) {
      history.push("/"); // Maybe display banner too?
      return null;
    }

    // make sure token is still good/not expired
    if (!Auth.isUserAuthenticated()) history.push("/login");

    // Make sure we have token
    const token = user.token;
    if (!token) {
      history.push("/login");
      return null;
    }

    const data: {
      user: { token: string };
      review: IReview;
    } = {
      user: { token },
      review: {
        ...this.state,
        _id: 0, // Server will overwrite this
        author: "", // Server will overwrite this
        sauce: slug,
        created: 0 // Server will overwrite this
      }
    };

    try {
      await this.props.addReview({ data });

      await this.props.getSauceBySlug({ slug });

      // Take user to sauce page
      history.push(`/sauce/?s=${slug}`);
    } catch (err) {
      console.log("ERR: ", err);
    }

    return null;
  };

  private getPageFromPath(path: string): string | null {
    // Get s from string
    const values: OutputParams = queryString.parse(path);

    // Make sure s is defined, not an array
    if (!values.s || Array.isArray(values.s)) {
      return null;
    }

    return values.s;
  }
}

function mapStateToProps(state: AppState): any {
  return {
    user: { token: state.users.self.token }
  };
}

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

// const mapDispatch2Props = (dispatch: MyThunkDispatch) => ({

// data: {
//   user: { token: string };
//   review: IReview;
// }

export default connect(
  mapStateToProps,
  mapDispatch2Props
)(ReviewAdd);
