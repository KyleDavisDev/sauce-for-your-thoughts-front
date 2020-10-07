import styled from "../../../../theme/styled-components";

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: FuturaMedium;
  font-size: 1rem;
  color: ${x => x.theme.grey};
  fill: ${x => x.theme.grey};
  background: none;
  border: 0px;
  padding: 5px;
  outline: none;

  &:hover,
  &:focus {
    outline: none;
    cursor: pointer;
    text-decoration: none;
    color: ${x => x.theme.primaryThemeColor};
    fill: ${x => x.theme.primaryThemeColor};
  }
`;
StyledButton.displayName = "button";

export const StyledAvatar = styled.img`
  max-width: 35px;
  margin-left: 5px;
`;
StyledAvatar.displayName = "img";
