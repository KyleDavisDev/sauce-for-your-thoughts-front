import React from "react";

import SectionTitle from "../SectionTitle/SectionTitle";

import { useNewestSauces } from "../../utils/hooks/useNewestSauces";
import {
  StyledDiv,
  StyledCard,
  StyledCardHolder,
  StyledCardContainer
} from "./NewestSaucesStyles";

export interface NewestSaucesProps {
  className?: string;
}

export interface NewestSaucesState {}

const NewestSauces: React.FunctionComponent<NewestSaucesProps> = props => {
  // find our suaces
  const [newestSauces, loading] = useNewestSauces();

  return (
    <StyledDiv className={props.className}>
      <SectionTitle
        title="Newest Sauces"
        description="We are always adding new sauces to our knowledgebase!"
      />
      <StyledCardContainer>
        {loading ? (
          <p>Loading...</p>
        ) : newestSauces && newestSauces.length > 0 ? (
          newestSauces.map((sauce, ind) => {
            return (
              <StyledCardHolder key={ind}>
                <StyledCard
                  title={sauce.name}
                  imageLink={`${sauce.photo}`}
                  description={sauce.description}
                  to={`/sauce/view?s=${sauce.slug}`}
                />
              </StyledCardHolder>
            );
          })
        ) : (
          "No sauces found..."
        )}
      </StyledCardContainer>
    </StyledDiv>
  );
};

export default NewestSauces;
