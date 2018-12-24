import * as React from "react";
import styled from "styled-components";
import DropDown from "../../../../components/DropDown/DropDown";
import { Button } from "../../../../components/Button/Button";

const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledFrom = styled.form`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledDropDown = styled(DropDown)`
  width: 25%;
`;

export interface FilterBarProps {}

export default class FilterBar extends React.PureComponent<FilterBarProps, any> {
  public render() {
    return (
      <StyledFormContainer>
        <StyledFrom onSubmit={this.onSubmit}>
          <StyledDropDown
            showLabel={true}
            label={"Primary Pepper"}
            options={["All", "Option 2", "Option 3"]}
            onSelect={() => {}}
          />

          <StyledDropDown
            showLabel={true}
            label={"Type"}
            options={["All", "Option 2", "Option 3"]}
            onSelect={() => {}}
          />

          <StyledDropDown
            showLabel={true}
            label={"Order"}
            options={["All", "Option 2", "Option 3"]}
            onSelect={() => {}}
          />

          <Button type={"submit"} onClick={() => {}}>
            Filter
          </Button>
        </StyledFrom>
      </StyledFormContainer>
    );
  }

  private onSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    // Do the things.
  };
}
