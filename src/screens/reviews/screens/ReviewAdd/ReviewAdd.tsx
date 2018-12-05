import * as React from "react";
import "@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css";
import { connect } from "react-redux";
import Rating from "react-rating";

import { addReview } from "../../../../redux/reviews/actions";
import styled from "../../../../theme/styled-components";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Descriptor from "../../../../components/Descriptor/Descriptor";
import TextInput from "../../../../components/TextInput/TextInput";
import Label from "../../../../components/Label/Label";
import { Button } from "../../../../components/Button/Button";
import ArrowRight from "../../../../images/icons/ArrowRight";
import { IinitialState } from "../../../../redux/configureStore";
import { IReviewSection, IReview } from "../../../../redux/reviews/types";
import Star from "../../../../images/icons/Star";

const Article = styled.article`
  max-width: 900px;
  margin: 0 auto;

  > div {
    margin-bottom: 3.5rem;
  }
`;

const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: top;
  padding-bottom: 4rem;
`;

const StyledDescriptor = styled(Descriptor)`
  width: 100%;
  max-width: 33%;
  box-sizing: border-box;
  padding: 0 1rem;
`;

const StyledRightSide = styled.div`
  width: 100%;
  box-sizing: border-box;
  max-width: 66%;
  display: block;
  padding: 0 1rem;
`;

const StyledButton = styled(Button)`
  width: 100%;

  button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0px;
    color: #333;
    &:hover,
    &:focus {
      svg {
        fill: #fff;
      }
    }
  }

  svg {
    width: 20px;
    padding-left: 10px;
    fill: #333;
    transition: all 0.2s ease;
  }
`;

const StyledEmptyStar = styled(Star)`
  .border {
    fill: ${props => props.theme.primaryThemeColor};
  }

  .center {
    fill: transparent;
  }
`;
const StyledFullStar = styled(Star)`
  .border,
  .center {
    fill: ${props => props.theme.primaryThemeColor};
  }
`;

export interface ReviewAddProps {
  addReview: ({ data }: any) => Promise<any>;
  history: { push: (location: string) => any };
  user: { token?: string };
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
      overall: { rating: 0, txt: "" },
      label: { rating: 0, txt: "" },
      aroma: { rating: 0, txt: "" },
      taste: { rating: 0, txt: "" },
      heat: { rating: 0, txt: "" },
      note: { rating: 0, txt: "" }
    };
  }

  public render() {
    return (
      <div>
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
                  How spicy is this sauce? Did you have to run for water? Was it
                  the perfect amount of heat?
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
                  How spicy is this sauce? Did you have to run for water? Was it
                  the perfect amount of heat?
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

    // make sure token is still good/not expired
    // if (!Auth.isUserAuthenticated()) this.props.history.push("/login");

    // construct FormData object since we are passing image file
    const data: {
      user: { token: string };
      review: IReview;
    } = {
      review: {
        ...this.state,
        _id: 0,
        author: { _id: "abc" },
        sauce: { _id: "get me from URL" },
        created: new Date()
      },
      user: {
        token: "abc"
      }
    };

    this.props
      .addReview({ data })
      .then(res => {
        // Go to sauce page??
      })
      .catch(err => {
        // TODO better error handling
      });
  };
}

function mapStateToProps(state: IinitialState): any {
  return {
    user: { token: state.users.self.token || "" }
  };
}

const mapDispatchToProps = {
  addReview
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewAdd);
