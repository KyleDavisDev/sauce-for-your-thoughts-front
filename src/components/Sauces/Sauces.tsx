import * as React from "react";

import FilterBar from "./FilterBar/FilterBar";
import PageTitle from "../PageTitle/PageTitle";
import Pagination from "./Pagination/Pagination";
import {
  StyledCardContainer,
  StyledCardHolder,
  StyledCard
} from "./SaucesStyles";
import { useRouter } from "next/router";
import useSauces from "../../utils/hooks/useSauces";
import useParamsFromPath from "../../utils/hooks/useParamsFromPath";

export interface SaucesProps {}

const Sauces: React.SFC<SaucesProps> = props => {
  // assign router
  const router = useRouter();

  // grab sauces from custom hook
  const { sauces, loading, total } = useSauces({ router });

  const { page, limit, order, type, srch } = useParamsFromPath({ router });

  // assign count
  const count = sauces.length;
  return (
    <>
      <PageTitle>Sauces</PageTitle>
      <FilterBar onSubmit={onSubmit} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <StyledCardContainer>
          {sauces.length > 0 ? (
            sauces.map((sauce, ind) => {
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
            <p>
              Could not find any sauces! Try adjusting the items in the filter
              bar to find your perfect sauce.
            </p>
          )}
        </StyledCardContainer>
      )}
      {count > 0 && (
        <Pagination total={total} page={page} limit={limit} range={3} />
      )}
    </>
  );

  function onSubmit(tmp: { limit: any; order: any; type: any; srch: any }) {
    // Construct query string
    let query = `/sauces?limit=${tmp.limit}&order=${tmp.order}&page=${1}&type=${
      tmp.type
    }`;
    if (tmp.srch) query += `&srch=${tmp.srch}`;

    // Go to new page
    router.push(query);
  }
};

export default Sauces;
