import styled from "../../theme/styled-components";
import Select from "../Select/Select";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../Button/Button";

// assign image path
const SaucesImage = "/static/LandingPageImage.jpg";

export const HeroContainer = styled.div`
  background: #000;
  position: relative;
  margin-bottom: 1.5rem;

  @media (min-width: ${props => props.theme.smToMd}) {
    margin-bottom: 3.5rem;
  }
`;
HeroContainer.displayName = "div";

export const HeroImage = styled.div`
  background-image: url('${SaucesImage}');
  background-size: cover;
  background-position-y: 45%;
  opacity: 0.45;
  height: 400px;
`;
HeroImage.displayName = "div";
