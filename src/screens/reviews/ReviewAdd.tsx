import * as React from "react";
import "@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css";
import { connect } from "react-redux";
import Rating from "react-rating";
import queryString, { OutputParams } from "query-string";

import { addReview } from "../../redux/reviews/actions";
import { IReviewSection, IReview } from "../../redux/reviews/types";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";
import Label from "../../components/Label/Label";
import ArrowRight from "../../images/icons/ArrowRight";
import { IinitialState } from "../../redux/configureStore";
import Article from "../../components/Article/Article";
import TopBar from "../../components/TopBar/TopBar";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import {
  StyledFormContainer,
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledButton,
  StyledEmptyStar,
  StyledFullStar
} from "./ReviewAddStyle";
import Auth from "../../utils/Auth/Auth";

export interface ReviewAddProps {
  addReview: ({ data }: any) => Promise<any>;
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
      overall: { rating: 3, txt: "overall here" },
      label: { rating: 3, txt: "label here   " },
      aroma: { rating: 3, txt: "aroma here" },
      taste: { rating: 2, txt: "taste here" },
      heat: { rating: 2, txt: "heat hereeeee" },
      note: { rating: 0, txt: "We got an extra note too" }
    };
  }

  public componentDidMount() {
    const slug: string | null = this.getPageFromPath(
      this.props.location.search
    );

    // Sauce slug is whack, redirect user
    if (slug === null) {
      this.props.history.push("/");
      // Maybe display banner too?
    }

    // Make sure we are at top of page
    window.scrollTo(0, 0);
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
                  <TextInput
                    onChange={this.onTextChange}
                    label="Description"
                    name="taste"
                    id="taste"
                    showLabel={true}
                    value={this.state.taste.txt}
                    type="textarea"
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
                  <TextInput
                    onChange={this.onTextChange}
                    label="Description"
                    name="aroma"
                    id="aroma"
                    showLabel={true}
                    value={this.state.aroma ? this.state.aroma.txt : ""}
                    type="textarea"
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
                  <TextInput
                    onChange={this.onTextChange}
                    label="Description"
                    name="label"
                    id="label"
                    showLabel={true}
                    value={this.state.label ? this.state.label.txt : ""}
                    type="textarea"
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
                  <TextInput
                    onChange={this.onTextChange}
                    label="Description"
                    name="heat"
                    id="heat"
                    showLabel={true}
                    value={this.state.heat ? this.state.heat.txt : ""}
                    type="textarea"
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
                  <TextInput
                    onChange={this.onTextChange}
                    required={true}
                    label="Description"
                    name="overall"
                    id="overall"
                    showLabel={true}
                    value={this.state.overall ? this.state.overall.txt : ""}
                    type="textarea"
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
                  <TextInput
                    onChange={this.onTextChange}
                    label="Description"
                    name="note"
                    id="note"
                    showLabel={true}
                    value={this.state.note ? this.state.note.txt : ""}
                    type="textarea"
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
      ...this.state,
      [name.toLowerCase()]: { ...this.state[name.toLowerCase()], txt: value }
    });
  };

  private onStarClick = (value: number, id: string): void => {
    this.setState({
      ...this.state,
      [id]: { ...this.state[id], rating: value }
    });
  };

  private onSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const { user, history } = this.props;

    // Get sauce from URL
    const slug: string | null = this.getPageFromPath(
      this.props.location.search
    );

    // Sauce slug is whack, redirect user
    if (slug === null) {
      history.push("/"); // Maybe display banner too?
      return;
    }

    // make sure token is still good/not expired
    if (!Auth.isUserAuthenticated()) history.push("/login");

    // Make sure we have token
    const token = user.token;
    if (!token) {
      history.push("/login");
      return;
    }

    const data: {
      user: { token: string };
      review: IReview;
    } = {
      review: {
        ...this.state,
        _id: 0,
        author: { _id: "" },
        sauce: { slug },
        created: new Date()
      },
      user: { token }
    };

    this.props
      .addReview({ data })
      .then(res => {
        // Take user to sauce page
        history.push(`/sauce?s=${slug}`);
      })
      .catch(err => {
        // TODO better error handling
      });
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

function mapStateToProps(state: IinitialState): any {
  return {
    user: { token: state.users.self.token }
  };
}

const mapDispatchToProps = {
  addReview
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewAdd);
