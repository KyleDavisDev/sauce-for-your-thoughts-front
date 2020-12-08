import styled from "../../../../theme/styled-components";
import Descriptor from "../../../Descriptor/Descriptor";
import { Link } from "../../../Link/Link";

export const StyledContainer = styled.div`
  font-family: AvenirNextReg;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 1.5em;

  @media (min-width: ${props => props.theme.smToMd}) {
    margin-bottom: 3em;
  }
`;

export const StyledLink = styled(Link)`
  > div {
    display: inline;
  }
`;

export const StyledDescriptor = styled(Descriptor)`
  > p {
    margin-top: 0;
    font-style: italic;
  }
`;
