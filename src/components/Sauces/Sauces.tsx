import * as React from "react";

import FilterBar from "./components/FilterBar/FilterBar";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import PageTitle from "../../components/PageTitle/PageTitle";
import Pagination from "./components/Pagination/Pagination";
import TopBar from "../../components/TopBar/TopBar";
import {
  StyledArticle,
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
    <div>
      <TopBar />
      <Navigation />
      <StyledArticle>
        <PageTitle>Sauces</PageTitle>
        <FilterBar
          onSubmit={onSubmit}
          typeFromPath={type}
          orderFromPath={order}
          limitFromPath={limit}
          srchFromPath={srch}
        />
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
      </StyledArticle>
      <Footer />
    </div>
  );

  function onSubmit(tmp: { limit: any; order: any; type: any; srch: any }) {
    // Construct query string
    let query = `/sauces?limit=${tmp.limit}&order=${tmp.order}&page=${1}&type=${
      tmp.type
    }`;
    if (srch) query += `&srch=${tmp.srch}`;

    // Go to new page
    router.push(query);
  }
};

export default Sauces;
