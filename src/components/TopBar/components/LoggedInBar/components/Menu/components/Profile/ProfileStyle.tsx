import styled from "../../../../../../../../theme/styled-components";

export const StyledLink = styled.a`
  padding: 12px 12px 4px;
  display: inline-block;
  color: ${x => x.theme.black};
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 5px;
`;

export const StyledHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-top;

  > div {
    padding: 0 5px;
  }

  h3 {
    font-size: 16px;
  }

  h4 {
    font-size: 14px;
  }
`;
StyledHead.displayName = "div";

export const StyledImage = styled.img`
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
`;
StyledImage.displayName = "img";

export const StyledFoot = styled.div`
  width: 100%;

  > div,
  button {
    width: 100%;
  }

  div button {
    font-size: 14px;
    border: 0;
    &:hover,
    &:focus {
      color: ${x => x.theme.primaryThemeColor};
      background-color: ${x => x.theme.primaryLightThemeColor};
      border: 0;
    }
  }
`;
StyledFoot.displayName = "div";
