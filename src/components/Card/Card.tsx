import * as React from "react";
import styled from "../../theme/styled-components";
import { Link } from "../Link/Link";
import { Button } from "../Button/Button";

const Div = styled.div`
  max-width: 350px;
  margin: 0 1em;
  background-color: ${props => props.theme.cardBackgroundColor};
  display: flex;
  flex-direction: column;
  transition: all 0.2 ease;
  padding-bottom: 1em;

  &:hover,
  &:focus {
    box-shadow: 0px 3px 8px 4px rgba(112, 112, 112, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Body = styled.div`
  padding: 1em;
  font-family: AvenirNextReg;

  h4 {
    font-family: FuturaMedium;
  }
`;

const StyledP = styled.p`
  padding: 0;
  margin: 0;
`;

const StyledLink = styled(Link)`
  padding: 0.5em 1em;
  margin: 0 auto;
`;

interface CardProps {
  imageLink?: string;
  title: string;
  description: string;
  maker?: string;
  author?: string;
  type?: string;
  className?: string;
  anchorLink: string;
  anchorText?: string;
}

const Card: React.SFC<CardProps> = props => {
  return (
    <Div className={props.className}>
      <Image src={props.imageLink} alt={props.description} />
      <Body>
        <h4>{props.title}</h4>
        <StyledP>
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
        </StyledP>
      </Body>
      <StyledLink to="#">
        <Button displayType="outline" onClick={() => {}}>
          {props.anchorText || "View Sauce"}
        </Button>
      </StyledLink>
    </Div>
  );
};

export default Card;
