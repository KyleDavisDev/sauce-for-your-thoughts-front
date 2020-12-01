import React from "react";

import SectionTitle from "../SectionTitle/SectionTitle";

import { useNewestSauces } from "../../utils/hooks/useNewestSauces/useNewestSauces";
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
  // constants
  const _title = {
    title: "Newest Sauces",
    description: "We are always adding new sauces to our knowledgebase!"
  };
  const _loadingText = "Loading...";
  const _noSaucesFoundText = "No sauces found...";

  // Get newest sauces from hook
  const { sauces, loading, error, getNewestSauces } = useNewestSauces();

  React.useEffect(() => {
    if (!loading && sauces.length === 0) getNewestSauces();
  }, []);

  return (
    <StyledDiv className={props.className}>
      <SectionTitle {..._title} />
      <StyledCardContainer data-testid="cardsContainer">
        {renderContent()}
      </StyledCardContainer>
    </StyledDiv>
  );

  function renderContent() {
    if (loading) {
      return <p>{_loadingText}</p>;
    }

    if (error.isVisible) {
      return <p>{error.text}</p>;
    }

    if (sauces.length === 0) {
      return <p>{_noSaucesFoundText}</p>;
    }

    return sauces.map((sauce, ind) => {
      return (
        <StyledCardHolder key={ind + "-" + sauce.created}>
          <StyledCard
            title={sauce.name}
            imageLink={`${sauce.photo}`}
            description={sauce.description}
            to={`/sauce/view?s=${sauce.slug}`}
          />
        </StyledCardHolder>
      );
    });
  }
};

export default NewestSauces;
