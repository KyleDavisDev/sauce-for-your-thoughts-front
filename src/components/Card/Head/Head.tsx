import * as React from "react";

import { StyledLink, StyledImage } from "./HeadStyle";

export interface IHeadProps {
  showLink?: boolean;
  to: string;
  imageLink?: string;
  description?: string;
}

const Head: React.FC<IHeadProps> = props => {
  const { showLink, imageLink, description, to } = props;

  if (!showLink) return <StyledImage src={imageLink} alt={description} />;

  return (
    <StyledLink href={to}>
      <StyledImage
        src={imageLink}
        alt={description}
        onError={e => {
          const elem = e.target as HTMLImageElement;
          elem.src =
            "https://res.cloudinary.com/foryourthoughts/image/upload/v1575869743/sauces/ra1o7bsr9v2eurosoo5y_bktfsa.png";
        }}
      />
    </StyledLink>
  );
};

export default Head;
