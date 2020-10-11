import * as React from "react";

import { StyledBody, StyledTextContainer } from "./BodyStyle";

export interface IBodyProps {
  title?: string;
  description?: string;
}

const Body: React.FC<IBodyProps> = props => {
  const defaultText = "Loading ...";
  const defaultLength = 60;

  const { title = defaultText, description = defaultText } = props;

  return (
    <StyledBody>
      <h4>{title}</h4>
      <StyledTextContainer>
        <p>
          {description.length > defaultLength
            ? description.substring(0, defaultLength - 1) + "..."
            : description}
        </p>
      </StyledTextContainer>
    </StyledBody>
  );
};

export default Body;
