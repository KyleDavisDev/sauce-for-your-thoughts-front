import styled from "../../../../theme/styled-components";
import Descriptor from "../../../Descriptor/Descriptor";
import { Link } from "../../../Link/Link";

export const StyledContainer = styled.div`
  margin-bottom: 1.5em;
`;
StyledContainer.displayName = "div";

export const StyledLink = styled(Link)`
  > div {
    display: inline;
  }
`;
StyledLink.displayName = "Link";

export const StyledDescriptor = styled(Descriptor)`
  > p {
    margin-top: 0;
    font-style: italic;
  }
`;
StyledDescriptor.displayName = "Descriptor";
