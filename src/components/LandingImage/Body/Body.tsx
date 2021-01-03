import * as React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { AppState } from "../../../redux/configureStore";
import {
  StyledContainer,
  StyledTitle,
  StyledDiv,
  StyledSelect,
  StyledInput,
  StyledButton
} from "./BodyStyle";
import { DEFAULT_TYPES_OF_SAUCES } from "../../../redux/sauces/types";

export interface IBodyProps {}

const Body: React.FunctionComponent<IBodyProps> = () => {
  // component constants
  const _defaultTitleText = "Find your perfect sauce";

  const [search, setSearch] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("all");
  let types = useSelector((store: AppState) => {
    return store.sauces.types;
  });
  if (!types || types.length === 0) types = DEFAULT_TYPES_OF_SAUCES;

  // assign router
  const router = useRouter();

  return (
    <StyledContainer>
      <StyledTitle>{_defaultTitleText}</StyledTitle>
      <form onSubmit={onSubmit}>
        <StyledDiv>
          <StyledSelect
            id="types"
            name="types"
            options={types}
            selectedValue={selectedValue}
            onSelect={e => setSelectedValue(e.target.value)}
          />
          <StyledInput
            id="search"
            name="search"
            type="text"
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <StyledButton type="submit">Search</StyledButton>
        </StyledDiv>
      </form>
    </StyledContainer>
  );

  async function onSubmit(event: React.FormEvent): Promise<null> {
    event.preventDefault();

    let query = "/sauces?";
    if (search.length > 0) {
      query += `srch=${search}`;
    }

    if (selectedValue.toLowerCase() !== "all") {
      query += `&type=${selectedValue}`;
    }

    // take person to sauces page w/ prefilled search query
    await router.push(query);
    return null;
  }
};

export default Body;
