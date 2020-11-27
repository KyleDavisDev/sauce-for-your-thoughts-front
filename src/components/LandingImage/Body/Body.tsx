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

export interface IBodyProps {}

const Body: React.FunctionComponent<IBodyProps> = props => {
  const _defaultTitleText = "Find your perfect sauce";

  const [search, setSearch] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("all");
  const types = useSelector((store: AppState) => {
    return store.sauces.types;
  });

  // assign router
  const router = useRouter();

  return (
    <StyledContainer>
      <StyledTitle>{_defaultTitleText}</StyledTitle>
      <form onSubmit={onSubmit}>
        <StyledDiv>
          <StyledSelect
            id="types"
            options={types}
            selectedValue={selectedValue}
            onSelect={e => setSelectedValue(e.target.value)}
          />
          <StyledInput
            id="search"
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
    router.push(query);
    return null;
  }
};

export default Body;
