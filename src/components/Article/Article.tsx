import * as React from "react";

import styled from "../../theme/styled-components";

interface ArticleProps {
  children: any;
  className?: string;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

const Article: React.FunctionComponent<ArticleProps> = props => {
  return (
    <article className={props.className} style={props.style}>
      {props.children}
    </article>
  );
};

const StyledArticle = styled(Article)`
  max-width: ${props =>
    props.size === "sm" ? "600px" : props.size === "lg" ? "1200px" : "900px"};
  width: 100%;
  margin: 0 auto;
  font-family: AvenirNextReg;
  padding: 0 15px;

  > div {
    margin-bottom: 3.5rem;
  }
  @media (min-width: ${props => props.theme.smToMd}) {
    padding: 0;

    > div {
      margin-bottom: 3.5rem;
    }
  }
`;

export { StyledArticle as Article };
