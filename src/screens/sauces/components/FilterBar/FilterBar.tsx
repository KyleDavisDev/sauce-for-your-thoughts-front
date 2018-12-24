import * as React from "react";
import styled from "styled-components";
import DropDown from "../../../../components/DropDown/DropDown";

const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export interface FilterBarProps {}

export default class FilterBar extends React.PureComponent<FilterBarProps, any> {
  public render() {
    return (
      <StyledFormContainer>
        <form onSubmit={this.onSubmit}>
          <DropDown
            showLabel={true}
            label={"Primary Pepper"}
            options={["All", "Option 2", "Option 3"]}
            onSelect={() => {}}
            id={"pepper"}
          />
        </form>
      </StyledFormContainer>
    );
  }

  private onSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    // Do the things.
  };
}
