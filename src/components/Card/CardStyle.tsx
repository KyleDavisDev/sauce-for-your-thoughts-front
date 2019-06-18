import styled from "../../theme/styled-components";
import { Link } from "../Link/Link";

export const Div = styled.div`
  max-width: 200px;
  margin: 0 1em;
  border: ${props => props.theme.border};
  display: flex;
  flex-direction: column;
  transition: all 0.2 ease;
  padding-bottom: 1em;
`;

export const Image = styled.img`
  width: 100%;
`;

export const Body = styled.div`
  padding: 1em;
  font-family: AvenirNextReg;

  h4 {
    font-family: FuturaMedium;
  }
`;

export const StyledTextContainer = styled.div`
  padding: 0;
  margin: 0;
`;

export const StyledLink = styled(Link)`
  margin: 0 auto;

  button {
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
  }
`;
