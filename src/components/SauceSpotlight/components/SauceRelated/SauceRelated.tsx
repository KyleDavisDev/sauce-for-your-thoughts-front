import * as React from "react";
import { ISauce } from "../../../../redux/sauces/types";
import { useSauceBySlug } from "../../../../utils/hooks/useSauceBySlug/useSauceBySlug";
import List from "../../../List/List";

interface ISauceRelatedProps {}

const SauceRelated: React.FunctionComponent<ISauceRelatedProps> = props => {
  const { loading, sauce, error, getTheSauce } = useSauceBySlug();

  React.useEffect(() => {
    if (!loading && !sauce) getTheSauce();
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error.isVisible) {
    return <p>{error.text}</p>;
  }

  if (!sauce || !sauce._related || sauce._related.length === 0) {
    return <p>Could not find any related sauces!</p>;
  }

  return (
    <>
      {/* {sauce.slug && showAppropriateReviewButton(sauce.slug)} */}
      <List
        items={sauce._related.map((x, ind) => {
          return {
            link: `/sauce/view?s=${x.slug}`,
            text: x.name,
            id: `${ind}-${x.name}`
          };
        })}
        title="Related Sauces"
      />
    </>
  );
};

export default SauceRelated;
