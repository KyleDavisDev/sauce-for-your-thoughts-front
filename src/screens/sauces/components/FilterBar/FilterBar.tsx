import * as React from "react";
import { Button } from "../../../../components/Button/Button";
import {
  StyledFormContainer,
  StyledFrom,
  StyledDropDown
} from "./FilterBarStyle";

export interface FilterBarProps {
  onSubmit: ({ type, order }: { type: string; order: string }) => void;
  typeSelected?: string;
  orderSelected?: string;
}

export interface FilterBarState {
  types: { options: string[]; selected: string };
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
      order: {
        options: ["Newest", "Name", "Times Reviewed", "Avg Rating"],
        selected: "Newest"
      }
    };
  }

  public componentWillReceiveProps(props: FilterBarProps) {
    const typeSelected = props.typeSelected || "All";
    const orderSelected = props.orderSelected || "Newest";
    this.setState({
      ...this.state,
      type: { ...this.state.type, selected: typeSelected },
      order: { ...this.state.order, selected: orderSelected }
    });
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
            label={"Order"}
            name={"order"}
            options={this.state.order.options}
            onSelect={this.onDropDownChange}
            selectedValue={this.state.order.selected}
          />

          <Button type={"submit"}>Filter</Button>
        </StyledFrom>
      </StyledFormContainer>
    );
  }

  private onSubmit = (event: React.FormEvent): void => {
    // prevent default to stop form submission
    event.preventDefault();

    // Lift values to parent
    this.props.onSubmit({
      type: this.state.types.selected,
      order: this.state.order.selected
    });
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
