import * as React from "react";

interface PageTitleProps {
  children?: string;
  className?: string;
}

const PageTitle: React.SFC<PageTitleProps> = props => {
  return <h1 className={props.className}>{props.children}</h1>;
};

export default PageTitle;
