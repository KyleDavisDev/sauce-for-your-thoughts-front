import styled from "../../../../../../theme/styled-components";
import Star from "../../../../../../images/icons/Star";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0 1em;

  > i {
    padding: 0 0.5em 0 0;
  }
`;
StyledContainer.displayName = "div";

export const StyledDescription = styled.p`
  margin-top: 0px;
  padding: 0 2em;
`;
StyledDescription.displayName = "p";

export const StyledEmptyStar = styled(Star)`
  .border {
    fill: ${props => props.theme.primaryThemeColor};
  }

  .center {
    fill: transparent;
  }
`;
StyledEmptyStar.displayName = "Star";

export const StyledFullStar = styled(Star)`
  .border,
  .center {
    fill: ${props => props.theme.primaryThemeColor};
  }
`;
StyledFullStar.displayName = "Star";
