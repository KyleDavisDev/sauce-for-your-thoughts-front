import * as React from "react";

import List from "../../../List/List";
import { ISauce } from "../../../../redux/sauces/types";
import { FlashMessageProps } from "../../../FlashMessage/FlashMessage";

export interface ISauceRelatedProps {
  loading: boolean;
  sauce?: ISauce;
  error: FlashMessageProps;
}

const SauceRelated: React.FunctionComponent<ISauceRelatedProps> = props => {
  // defaults
  const _loadingTxt = "loading...";
  const _noRelatedSaucesTxt = "Could not find any related sauces!";
  const _title = "Related Sauces";

  const { loading, sauce, error } = props;

  if (loading) {
    return <p>{_loadingTxt}</p>;
  }

  if (error.isVisible) {
    return <p>{error.text}</p>;
  }

  return (
    <>
      {!sauce || !sauce._related || sauce._related.length === 0 ? (
        <p>{_noRelatedSaucesTxt}</p>
      ) : (
        <List
          items={sauce._related.map((x, ind) => {
            return {
              link: `/sauce/view?s=${x.slug}`,
              text: x.name,
              id: `${ind}-${x.name}`
            };
          })}
          title={_title}
        />
      )}
    </>
  );
};

export default SauceRelated;
