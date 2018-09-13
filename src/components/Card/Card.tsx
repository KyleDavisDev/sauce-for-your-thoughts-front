import * as React from "react";
import styled from "../../theme/styled-components";
import Button from "../Button/Button";

const Div = styled.div`
  max-width: 350px;
  margin: 0 1em;
  background-color: ${props => props.theme.cardBackgroundColor};
  display: flex;
  flex-direction: column;
  transition: all 0.2 ease;

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
`;

const StyledButton = styled(Button)`
  padding: 0.5em 1em;
  margin: 0 auto;
`;

interface CardProps {
  imageLink: string;
  title: string;
  description: string;
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
        {props.description.length > 25
          ? props.description.substring(0, 24) + "..."
          : props.description}
      </Body>
      <StyledButton
        text={props.anchorText || "View Sauce"}
        onClick={() => console.log("Button clicked")}
        type="outline"
      />
    </Div>
  );
};

export default Card;
