import * as React from "react";

interface CardProps {
  imageLink: string;
  imageAlt: string;
  title: string;
  description: string;
}

const Card: React.SFC<CardProps> = props => {
  return (
    <div>
      <img src={props.imageLink} alt={props.imageAlt} />
      <div>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Card;
