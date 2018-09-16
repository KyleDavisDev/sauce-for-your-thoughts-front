import * as React from "react";
import styled from "../../theme/styled-components";

const StyledDiv = styled.div`
  width: 100%;
  text-align: center;
`;

interface SectionTitleProps {
  title: string;
  description: string;
}

const SectionTitle: React.SFC<SectionTitleProps> = props => {
  return (
    <StyledDiv>
      <h2>{props.title}</h2>
      <h6>{props.description}</h6>
    </StyledDiv>
  );
};

export default SectionTitle;
