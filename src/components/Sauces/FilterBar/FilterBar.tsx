import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { AppState } from "../../../redux/configureStore";
import useParamsFromPath from "../../../utils/hooks/useParamsFromPath";
import {
  StyledFormContainer,
  StyledForm,
  StyledSelect,
  StyledInput,
  StyledButton
} from "./FilterBarStyle";

export interface FilterBarProps {
  onSubmit: ({
    type,
    order,
    limit,
    srch
  }: {
    type: string;
    order: string;
    limit: string;
    srch: string;
  }) => void;
}

const FilterBar: React.FunctionComponent<FilterBarProps> = props => {
  // assign router and get params from the path
  const router = useRouter();
  const params = useParamsFromPath({ router });

  // get info from redux
  const { types, orders, limits } = useSelector((store: AppState) => {
    // 1. Find types and create object
    const _types = { options: store.sauces.types, selected: params.type };

    // 2. Find orders and create object
    const _orders = { options: store.sauces.orders, selected: params.order };

    // 3. Create options and rest object
    const _limit = {
      options: ["5", "10", "15", "25", "50"],
      selected: params.limit
    };

    return { types: _types, orders: _orders, limits: _limit };
  });

  // assign state
  const [type, setType] = React.useState(types.selected);
  const [order, setOrder] = React.useState(orders.selected);
  const [limit, setLimit] = React.useState(limits.selected.toString());
  const [srch, setSrch] = React.useState(params.srch || "");

  return (
    <StyledFormContainer>
      <StyledForm onSubmit={onSubmit}>
        <StyledSelect
          id="options"
          showLabel={true}
          label={"Type"}
          name={"types"}
          options={types.options}
          onSelect={e => setType(e.target.value)}
          selectedValue={type}
        />

        <StyledSelect
          id="order"
          showLabel={true}
          label={"Order"}
          name={"order"}
          options={orders.options || []}
          onSelect={e => setOrder(e.target.value)}
          selectedValue={order}
        />

        <StyledSelect
          id="limi"
          showLabel={true}
          label={"Limit"}
          name={"limit"}
          options={limits.options}
          onSelect={e => setLimit(e.target.value)}
          selectedValue={limit}
        />

        <StyledInput
          id="name"
          showLabel={true}
          label={"Name like..."}
          onChange={e => setSrch(e.target.value)}
          name={"srch"}
          value={srch}
        />

        <StyledButton type={"submit"}>Filter</StyledButton>
      </StyledForm>
    </StyledFormContainer>
  );

  function onSubmit(event: React.FormEvent): void {
    // prevent default to stop form submission
    event.preventDefault();

    // Lift values to parent
    props.onSubmit({
      type,
      order,
      limit,
      srch
    });
  }
};

export default FilterBar;
