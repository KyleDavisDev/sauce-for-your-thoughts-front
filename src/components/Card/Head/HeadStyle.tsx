import styled from "../../../theme/styled-components";
import { Link } from "../../Link/Link";

export const StyledImage = styled.img`
  width: 100%;
`;
StyledImage.displayName = "img";

export const StyledLink = styled(Link)`
  button {
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    margin: auto auto 0;
  }
`;
StyledLink.displayName = "Link";
