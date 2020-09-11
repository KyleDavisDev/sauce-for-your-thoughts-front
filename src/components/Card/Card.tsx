import * as React from "react";
import { Button } from "../Button/Button";
import {
  StyledDiv,
  Image,
  StyledBody,
  StyledTextContainer,
  StyledLink
} from "./CardStyle";

export interface CardProps {
  title: string;
  description: string;
  to: string;
  showLink?: boolean;
  imageLink?: string;
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
      {showLink ? (
        <StyledLink href={to}>
          <Image
            src={imageLink}
            alt={description}
            onError={e => {
              const elem = e.target as HTMLImageElement;
              elem.src =
                "https://res.cloudinary.com/foryourthoughts/image/upload/v1575869743/sauces/ra1o7bsr9v2eurosoo5y_bktfsa.png";
            }}
          />
        </StyledLink>
      ) : (
        <Image src={imageLink} alt={description} />
      )}
      <StyledBody>
        <h4>{title}</h4>
        <StyledTextContainer>
          <p>
            {description.length > 60
              ? description.substring(0, 59) + "..."
              : description}
          </p>
        </StyledTextContainer>
      </StyledBody>
      {showLink && (
        <StyledLink href={to}>
          <Button displayType="outline">{anchorText || "View"}</Button>
        </StyledLink>
      )}
    </StyledDiv>
  );
};

export default Card;
