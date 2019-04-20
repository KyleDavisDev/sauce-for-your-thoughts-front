import * as React from "react";
import styled from "styled-components";
import DropDown from "../../../../components/DropDown/DropDown";
import { Button } from "../../../../components/Button/Button";

const StyledFormContainer = styled.div`
  border: ${props => props.theme.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1.5em !important;
`;

const StyledFrom = styled.form`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledDropDown = styled(DropDown)`
  width: 25%;

  select {
    height: 35px;
  }
`;

export interface FilterBarProps {}

export interface FilterBarState {
  types: { options: string[]; selected: string };
  sortBy: { options: string[]; selected: string };
  order: { options: string[]; selected: string };
  [key: string]: { options: string[]; selected: string };
}

export default class FilterBar extends React.PureComponent<
  FilterBarProps,
  FilterBarState
> {
  public constructor(props: FilterBarProps) {
    super(props);

    this.state = {
      types: { options: ["All", "Hot Sauce", "Gravy"], selected: "All" },
      sortBy: {
        options: ["Newest", "Name", "Most Reviewed", "Highest Avg Rating"],
        selected: "Newest"
      },
      order: { options: ["Asc", "Desc"], selected: "Asc" }
    };
  }

  public render() {
    return (
      <StyledFormContainer>
        <StyledFrom onSubmit={this.onSubmit}>
          <StyledDropDown
            showLabel={true}
            label={"Type"}
            name={"types"}
            options={this.state.types.options}
            onSelect={this.onDropDownChange}
            selectedValue={this.state.types.selected}
          />

          <StyledDropDown
            showLabel={true}
            label={"Sort By"}
            name={"sortBy"}
            options={this.state.sortBy.options}
            onSelect={this.onDropDownChange}
            selectedValue={this.state.sortBy.selected}
          />

          <StyledDropDown
            showLabel={true}
            label={"Order"}
            name={"order"}
            options={this.state.order.options}
            onSelect={this.onDropDownChange}
            selectedValue={this.state.order.selected}
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

  private onDropDownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    event.preventDefault();

    const { name, value }: { name: string; value: string } = event.target;

    this.setState({
      ...this.state,
      [name]: { ...this.state[name], selected: value }
    });
  };
}
