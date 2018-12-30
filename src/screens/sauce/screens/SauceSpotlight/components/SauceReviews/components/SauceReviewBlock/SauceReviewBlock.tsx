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
        <StyledContentContainer>I'm a review!</StyledContentContainer>
      </StyledContainer>
    );
  }
}

const mapState2Props = (
  state: IinitialState,
  ownProps: SauceReviewBlockProps
) => {
  return {};
};

export default connect(mapState2Props)(SauceReviewBlock);
