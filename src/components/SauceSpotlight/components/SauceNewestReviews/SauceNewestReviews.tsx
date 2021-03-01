import * as React from "react";

import List from "../../../List/List";
import { useSelector } from "react-redux";
import { AppState } from "../../../../redux/configureStore";

interface ISauceNewestReviewsProps {}

const SauceNewestReviews: React.FunctionComponent<ISauceNewestReviewsProps> = props => {
  // defaults
  const _noNewSauces = "Could not find any new sauces!";
  const _title = "Newly Reviewed";

  const sauces = useSelector(
    (store: AppState) => store.sauces.saucesWithNewestReviews
  );

  if (!sauces) return <p>{_noNewSauces}</p>;
  if (sauces.length === 0) return <p>{_noNewSauces}</p>;

  return (
    <>
      <List
        items={sauces.map((x, ind) => {
          return {
            link: `/sauce/view?s=${x.slug}`,
            text: x.name,
            id: `${ind}-${x.name}`
          };
        })}
        title={_title}
      />
    </>
  );
};

export default SauceNewestReviews;
