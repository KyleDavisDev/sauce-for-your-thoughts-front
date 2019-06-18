import * as React from "react";
import { Button } from "../Button/Button";
import { Div, Image, Body, StyledTextContainer, StyledLink } from "./CardStyle";

interface CardProps {
  title: string;
  description: string;
  to: string;
  showLink?: boolean;
  imageLink?: string;
  className?: string;
  anchorText?: string;
}

const Card: React.SFC<CardProps> = props => {
  return (
    <Div className={props.className}>
      {props.showLink ? (
        <StyledLink to={props.to}>
          <Image src={props.imageLink} alt={props.description} />
        </StyledLink>
      ) : (
        <Image src={props.imageLink} alt={props.description} />
      )}
      <Body>
        <h4>{props.title}</h4>
        <StyledTextContainer>
          <p>
            <i>Description: </i>
            {props.description.length > 25
              ? props.description.substring(0, 24) + "..."
              : props.description}
          </p>
        </StyledTextContainer>
      </Body>
      {props.showLink && (
        <StyledLink to={props.to}>
          <Button displayType="outline">{props.anchorText || "View"}</Button>
        </StyledLink>
      )}
    </Div>
  );
};

Card.defaultProps = {
  showLink: true
};

export default Card;
