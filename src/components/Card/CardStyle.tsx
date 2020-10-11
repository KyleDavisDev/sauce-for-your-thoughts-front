import styled from "../../theme/styled-components";
import { Link } from "../Link/Link";

export const StyledDiv = styled.div`
  max-width: 200px;
  margin: 0 0em;
  border: ${props => props.theme.border};
  display: flex;
  flex-direction: column;
  transition: all 0.2 ease;
  padding-bottom: 1em;
  justify-content: flex-start;

  a:last-child {
    margin: auto auto 0;
  }
`;
StyledDiv.displayName = "div";

export const StyledImage = styled.img`
  width: 100%;
`;
StyledImage.displayName = "img";

export const StyledBody = styled.div`
  padding: 1em;
  font-family: AvenirNextReg;

  h4 {
    font-family: FuturaMedium;
  }
`;
StyledBody.displayName = "div";

export const StyledTextContainer = styled.div`
  padding: 0;
  margin: 0;
`;
StyledTextContainer.displayName = "div";

export const StyledLink = styled(Link)`
  // margin: 0 auto 0;

  button {
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    margin: auto auto 0;
  }
`;
StyledLink.displayName = "Link";
