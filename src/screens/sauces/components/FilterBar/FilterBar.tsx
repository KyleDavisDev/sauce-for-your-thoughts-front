import * as React from "react";
import { Button } from "../../../../components/Button/Button";
import {
  StyledFormContainer,
  StyledFrom,
  StyledDropDown
} from "./FilterBarStyle";
import { connect } from "react-redux";
import { MyThunkDispatch, AppState } from "../../../../redux/configureStore";

export interface FilterBarProps {
  onSubmit: ({
    type,
    order
  }: {
    type: string;
    order: string;
    limit: string;
  }) => void;
  typeFromPath?: string;
  orderFromPath?: string;
  limitFromPath?: string;
  types?: { options: string[]; selected: string };
  order?: { options: string[]; selected: string };
}

export interface FilterBarState {
  types: { options: string[]; selected: string };
  order: { options: string[]; selected: string };
  limit: { options: string[]; selected: string };
  [key: string]: { options: string[]; selected: string };
}

class FilterBar extends React.PureComponent<FilterBarProps, FilterBarState> {
  public constructor(props: FilterBarProps) {
    super(props);

    this.state = {
      types: { options: [], selected: this.props.typeFromPath || "" },
      order: { options: [], selected: this.props.orderFromPath || "" },
      limit: {
        options: ["5", "10", "15", "25", "50"],
        selected: this.props.limitFromPath || "15"
      }
    };
  }

  public componentWillMount() {
    // Grab info from props -- make sure we have it
    const { types, order } = this.props;
    if (!types || !order) {
      return;
    }

    // Assign to state
    this.setState({ ...this.state, types, order });
  }

  public componentWillReceiveProps(props: FilterBarProps) {
    // Grab info from props -- make sure we have it
    const { types, order } = props;
    if (!types || !order) {
      return;
    }

    this.setState({ ...this.state, types, order });
  }

  public render() {
    const { types, order, limit } = this.state;

    return (
      <StyledFormContainer>
        {types && order ? (
          <StyledFrom onSubmit={this.onSubmit}>
            <StyledDropDown
              showLabel={true}
              label={"Type"}
              name={"types"}
              options={types.options}
              onSelect={this.onDropDownChange}
              selectedValue={types.selected}
            />

            <StyledDropDown
              showLabel={true}
              label={"Order"}
              name={"order"}
              options={order.options}
              onSelect={this.onDropDownChange}
              selectedValue={order.selected}
            />

            <StyledDropDown
              showLabel={true}
              label={"Limit"}
              name={"limit"}
              options={limit.options}
              onSelect={this.onDropDownChange}
              selectedValue={limit.selected}
            />

            <Button type={"submit"}>Filter</Button>
          </StyledFrom>
        ) : (
          "Loading..."
        )}
      </StyledFormContainer>
    );
  }

  private onSubmit = (event: React.FormEvent): void => {
    // prevent default to stop form submission
    event.preventDefault();

    // Lift values to parent
    this.props.onSubmit({
      type: this.state.types.selected,
      order: this.state.order.selected,
      limit: this.state.limit.selected
    });
  };

  private onDropDownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    event.preventDefault();

    const { name, value }: { name: string; value: string } = event.target;

    this.setState({
      [name]: { ...this.state[name], selected: value }
    });
  };
}

function mapStateToProps(
  state: AppState,
  myProps: FilterBarProps
): FilterBarProps {
  // Grab submit
  const { onSubmit } = myProps;

  // Make sure we have types
  const { types } = state.sauces;

  if (types.length === 0 || !types) {
    return { onSubmit };
  }

  // Make sure we have orders
  const { orders } = state.sauces;
  if (orders.length === 0 || !orders) {
    return { onSubmit };
  }

  // Figure out which option should be selected. Do some massaging too.
  let typeFromPath = myProps.typeFromPath || types[0];
  typeFromPath = typeFromPath.toLowerCase();
  let orderFromPath = myProps.orderFromPath || orders[0];
  orderFromPath = orderFromPath.toLowerCase();

  return {
    types: { options: types, selected: typeFromPath },
    order: { options: orders, selected: orderFromPath },
    onSubmit,
    orderFromPath,
    typeFromPath
  };
}

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
