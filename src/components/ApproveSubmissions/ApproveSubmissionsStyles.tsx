import styled from "../../theme/styled-components";

export const StyledSauceContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 2em;
  background-color: white;
  border-top: 6px solid ${x => x.theme.secondaryThemeColor};
  visibility: visible;
  max-height: 9999px;
  padding: 1em;
  box-shadow: 0 2px 5px #333;

  transition: all 1s ease-in-out;

  &.hidden {
    border-top: 0px;
    max-height: 0px;
    overflow: hidden;
    padding: 0px;
    margin-bottom: 0px;
  }
`;

export const StyledImageHolder = styled.div`
  max-width: 33%;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;

  img {
    max-width: 100%;
    width: 100%;
  }
`;

export const StyledSauceContent = styled.div`
  width: 66%;
  padding: 15px;
  box-sizing: border-box;
`;

export const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button {
    margin: 0 15px;
  }
`;
