import styled from "../../../../theme/styled-components";
import { Link } from "../../../Link/Link";

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-right: 2em;
  color: ${x => x.theme.grey};
  fill: ${x => x.theme.grey};

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${x => x.theme.primaryThemeColor};
    fill: ${x => x.theme.primaryThemeColor};
  }
`;
StyledLink.displayName = "Link";
