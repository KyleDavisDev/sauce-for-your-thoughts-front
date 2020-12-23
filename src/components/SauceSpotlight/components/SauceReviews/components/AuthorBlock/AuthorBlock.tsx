import {
  StyledAvatar,
  StyledReviewer,
  StyledContainer
} from "./AuthorBlockStyles";
import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../../redux/configureStore";

export interface IAuthorBlock {
  author: string;
  created: number;
}

const AuthorBlock: React.FC<IAuthorBlock> = props => {
  // defaults
  const _noAuthor = "N/A";

  const { created, author: authorName } = props;

  const author = useSelector((store: AppState) =>
    store.users.byDisplayName ? store.users.byDisplayName[authorName] : null
  );

  if (!author) return <p>{_noAuthor}</p>;

  const dateOptions = {
    day: "numeric",
    year: "numeric",
    month: "long"
  };

  return (
    <StyledContainer>
      <i>Reviewer:</i>
      <StyledReviewer>
        {author.displayName}
        <StyledAvatar src={author.avatarURL} />
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
