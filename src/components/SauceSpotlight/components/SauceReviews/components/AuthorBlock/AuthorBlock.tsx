import {
  StyledAvatar,
  StyledReviewer,
  StyledContainer
} from "./AuthorBlockStyles";
import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../../redux/configureStore";
import { IReview } from "../../../../../../redux/reviews/types";

export interface IAuthorBlock {
  review: IReview;
}

const AuthorBlock: React.FC<IAuthorBlock> = props => {
  // defaults
  const _noAuthor = "N/A";

  const { created, author: authorName } = props.review;

  const author = useSelector((store: AppState) =>
    store.users.byDisplayName ? store.users.byDisplayName[authorName] : null
  );

  const dateOptions = {
    day: "numeric",
    year: "numeric",
    month: "long"
  };

  return (
    <StyledContainer>
      <i>Reviewer:</i>
      <StyledReviewer>
        {author ? (
          <>
            {author.displayName}
            <StyledAvatar src={author.avatarURL} />
          </>
        ) : (
          _noAuthor
        )}
      </StyledReviewer>
      on
      {humanReadableDate()}
    </StyledContainer>
  );

  /* Convert epoch to human-readable */
  function humanReadableDate(): string {
    return new Date(created * 1000).toLocaleDateString("en-US", dateOptions);
  }
};

export default AuthorBlock;
