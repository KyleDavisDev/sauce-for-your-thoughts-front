import * as React from "react";

import styled from "../../theme/styled-components";

const StyledArticle = styled.article`
  max-width: 900px;
  margin: 0 auto;
  font-family: AvenirNextReg;
  padding: 0 15px;

  > div {
    margin-bottom: 1.5rem;
  }
  @media (min-width: ${props => props.theme.smToMd}) {
    padding: 0;

    > div {
      margin-bottom: 3.5rem;
    }
  }
`;

interface ArticleProps {
  children: any;
  className?: string;
}

const Article: React.FunctionComponent<ArticleProps> = props => {
  return (
    <StyledArticle className={props.className}>{props.children}</StyledArticle>
  );
};

export default Article;
