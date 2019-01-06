import * as React from "react";
import { Button } from "../Button/Button";
import { Div, Image, Body, StyledTextContainer, StyledLink } from "./CardStyle";

interface CardProps {
  title: string;
  description: string;
  to: string;
  showLink?: boolean;
  imageLink?: string;
  maker?: string;
  author?: string;
  type?: string;
  className?: string;
  anchorText?: string;
}

const Card: React.SFC<CardProps> = props => {
  return (
    <Div className={props.className}>
      <Image src={props.imageLink} alt={props.description} />
      <Body>
        <h4>{props.title}</h4>
        <StyledTextContainer>
          <p>
            <i>Description: </i>
            {props.description.length > 25
              ? props.description.substring(0, 24) + "..."
              : props.description}
          </p>

          {props.type && (
            <p>
              <i>Type: </i>
              {props.type && props.type.length > 25
                ? props.type.substring(0, 24) + "..."
                : props.type}
            </p>
          )}

          {props.maker && (
            <p>
              <i>Maker: </i>
              {props.maker && props.maker.length > 25
                ? props.maker.substring(0, 24) + "..."
                : props.maker}
            </p>
          )}

          {props.author && (
            <p>
              <i>Author: </i>
              {props.author && props.author.length > 25
                ? props.author.substring(0, 24) + "..."
                : props.author}
            </p>
          )}
        </StyledTextContainer>
      </Body>
      {props.showLink && (
        <StyledLink to={props.to}>
          <Button displayType="outline">
            {props.anchorText || "View Sauce"}
          </Button>
        </StyledLink>
      )}
    </Div>
  );
};

Card.defaultProps = {
  showLink: true
};

export default Card;
