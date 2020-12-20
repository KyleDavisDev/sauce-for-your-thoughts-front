import * as React from "react";
import { useSauceBySlug } from "../../../../utils/hooks/useSauceBySlug/useSauceBySlug";
import List from "../../../List/List";

interface ISauceRelatedProps {}

const SauceRelated: React.FunctionComponent<ISauceRelatedProps> = () => {
  // defaults
  const _loadingTxt = "loading...";
  const _noSauceTxt = "Could not find any related sauces!";

  const { loading, sauce, error, getTheSauce } = useSauceBySlug();

  React.useEffect(() => {
    if (!loading && !sauce) getTheSauce();
  }, []);

  if (loading) {
    return <p>{_loadingTxt}</p>;
  }

  if (error.isVisible) {
    return <p>{error.text}</p>;
  }

  if (!sauce || !sauce._related || sauce._related.length === 0) {
    return <p>{_noSauceTxt}</p>;
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
