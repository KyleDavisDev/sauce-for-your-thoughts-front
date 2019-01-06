import styled from "../../theme/styled-components";

export const StyledFooter = styled.footer`
  width: 100%;
  background-color: ${props => props.theme.primaryThemeColor};
`;

export const StyledDiv = styled.div`
  max-width: ${props => props.theme.maxPageWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  > div {
    width: 50%;
    box-sizing: border-box;
    padding: 0 1em;
  }

  > div:last-of-type {
    width: 100%;
  }

  @media (min-width: ${props => props.theme.smToMd}) {
    flex-wrap: nowrap;

    > div,
    > div:last-of-type {
      width: 33%;
    }
  }
`;
