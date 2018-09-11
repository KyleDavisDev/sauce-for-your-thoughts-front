import * as React from "react";
import styled from "../../theme/styled-components";

const Div = styled.div`
  max-width: 350px;
  margin: 0 1em;
  background-color: ${props => props.theme.cardBackgroundColor};
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
`;

const Body = styled.div`
  padding: 1em;
`;

interface CardProps {
  imageLink: string;
  title: string;
  description: string;
  className?: string;
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
    </Div>
  );
};

export default Card;
