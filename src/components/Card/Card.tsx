import * as React from "react";

import Head from "./Head/Head";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import { StyledDiv } from "./CardStyle";

export interface CardProps {
  title: string;
  description: string;
  to: string;
  showLink?: boolean;
  imageLink: string;
  className?: string;
  anchorText?: string;
}

const Card: React.FC<CardProps> = props => {
  // get info from props
  const {
    showLink = true,
    title,
    description,
    to,
    imageLink,
    className,
    anchorText
  } = props;

  return (
    <StyledDiv className={className}>
      <Head
        showLink={showLink}
        to={to}
        imageLink={imageLink}
        description={description}
      />

      <Body title={title} description={description} />

      {showLink && <Footer to={to} anchorText={anchorText} />}
    </StyledDiv>
  );
};

export default Card;
