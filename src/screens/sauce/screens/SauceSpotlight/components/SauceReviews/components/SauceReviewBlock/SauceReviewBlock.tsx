import * as React from "react";
import { connect } from "react-redux";
import { IReview } from "../../../../../../../../redux/reviews/types";
import styled from "styled-components";
import { IinitialState } from "Users/kylebonar/Documents/projects/sites/now-thats-delicious-front/src/redux/configureStore";

const StyledContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  font-family: AvenirNextReg;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1em;
`;

const StyledToggleContainer = styled.div`
  background-color: blue;
  padding: 0.75em;

  &:hover,
  &:focus {
    background-color: yellow;
    cursor: pointer;
  }
`;

const StyledContentContainer = styled.div`
  padding: 0.75em;
`;

export interface SauceReviewBlockProps {
  review: IReview;
  author?: string;
}

export interface SauceReviewBlockState {
  isOpen: boolean; // Will be our toggle
}

class SauceReviewBlock extends React.Component<
  SauceReviewBlockProps,
  SauceReviewBlockState
> {
  constructor(props: SauceReviewBlockProps) {
    super(props);

    this.state = { isOpen: true };
  }

  public render() {
    return (
      <StyledContainer>
        <StyledToggleContainer>
          {this.state.isOpen ? "+" : "-"}
        </StyledToggleContainer>
        <StyledContentContainer>
          <i>Reviewer:</i> {this.props.author}
        </StyledContentContainer>
      </StyledContainer>
    );
  }
}

const mapState2Props = (
  state: IinitialState,
  ownProps: SauceReviewBlockProps
) => {
  // Make sure we have authors, and specifically the author we want, in redux
  if (!state.users.byId || !state.users.byId[ownProps.review.author._id]) {
    return { author: "N/A" };
  }

  // Get the name of the author via the author's _id
  const author: string =
    state.users.byId[ownProps.review.author._id].name || "N/A";
  return { author };
};

export default connect(mapState2Props)(SauceReviewBlock);
