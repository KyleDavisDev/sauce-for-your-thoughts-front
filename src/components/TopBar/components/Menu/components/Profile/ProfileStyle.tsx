import styled from "styled-components";

export const StyledLink = styled.a`
  padding: 12px 12px 4px;
  display: inline-block;
  color: ${x => x.theme.black};
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
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

export const StyledImage = styled.img`
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
`;

export const StyledFoot = styled.div`
  width: 100%;

  > div,
  button {
    width: 100%;
  }
`;
