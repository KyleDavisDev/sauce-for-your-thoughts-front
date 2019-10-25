import styled from "../../../../theme/styled-components";
import DropDown from "../../../../components/DropDown/DropDown";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { Button } from "../../../../components/Button/Button";
import SaucesImage from "../../../../images/photos/Sauces.jpg";

export const HeroContainer = styled.div`
  background: #000;
  position: relative;
  margin-bottom: 1em;
`;

export const HeroImage = styled.div`
  background-image: url('${SaucesImage}');
  background-size: cover;
  background-position-y: 45%;
  opacity: 0.45;
  height: 400px;
`;

export const HeroBody = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

export const HeroTitle = styled.h1`
  color: ${x => x.theme.landingHeroTextColor};
  font-family: FuturaMedium;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

export const StyledDropDown = styled(DropDown)`
  min-height: 30px;
  border: 0px;
  box-sizing: border-box;

  > div {
    width: auto;
  }

  select {
    width: auto;
    border: 0;
  }
`;

export const StyledInput = styled(TextInput)`
  flex-direction: row;
  align-items: stretch;

  input {
    border: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    width: 100%;
    min-width: auto;
    max-width: 100%;
    padding: 0.66em;
    box-sizing: border-box;
    border: 0px;
    font-size: 1em;

    @media (min-width: ${props => props.theme.smToMd}) {
      min-width: 20em;
    }
  }
`;

export const StyledButton = styled(Button)`
  display: flex;
`;
