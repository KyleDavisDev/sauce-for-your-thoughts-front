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
  created: number;
  author: string;
}

const AuthorBlock: React.FC<IAuthorBlock> = props => {
  // defaults
  const _noAuthor = "N/A";

  const { created, author } = props;

  const authorObj = useSelector((store: AppState) =>
    store.users.byDisplayName ? store.users.byDisplayName[author] : null
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
        {authorObj ? (
          <>
            {authorObj.displayName}
            <StyledAvatar src={authorObj.avatarURL} />
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
