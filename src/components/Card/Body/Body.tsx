import * as React from "react";

import { StyledBody, StyledTextContainer } from "./BodyStyle";

interface IBodyProps {
  title?: string;
  description?: string;
}

const Body: React.FC<IBodyProps> = props => {
  const defaultText = "Loading ...";
  const { title = defaultText, description = defaultText } = props;

  return (
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
  );
};

export default Body;
