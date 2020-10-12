import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { AppState } from "../../redux/configureStore";
import {
  HeroContainer,
  HeroImage,
  HeroBody,
  HeroTitle,
  StyledDiv,
  StyledSelect,
  StyledInput,
  StyledButton
} from "./LandingImageStyle";

export interface LandingImageProps {
  className?: string;
}

const LandingImage: React.FC<LandingImageProps> = props => {
  const _defaultTitleText = "Find your perfect sauce";

  const [search, setSearch] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("all");
  const types = useSelector((store: AppState) => {
    return store.sauces.types;
  });

  // assign router
  const router = useRouter();

  return (
    <HeroContainer className={props.className}>
      <HeroImage />
      <HeroBody>
        <HeroTitle>{_defaultTitleText}</HeroTitle>
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
      </HeroBody>
    </HeroContainer>
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

export default LandingImage;
