import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { AppState } from "../../redux/configureStore";
import { reduxStore } from "../../redux/with-redux-store";
import { IReview } from "../../redux/reviews/types";
import { getSauceBySlug } from "../../redux/sauces/actions";
import { Link } from "../Link/Link";
import { Button } from "../Button/Button";
import List from "../List/List";
import { FlashMessage } from "../FlashMessage/FlashMessage";
import SauceHero from "./components/SauceHero/SauceHero";
import SauceReviews from "./components/SauceReviews/SauceReviews";
import {
  StyledLeftContainer,
  StyledRightContainer
} from "./SauceSpotlightStyle";

export interface SauceSpotlightProps {}

const SauceSpotlight: React.SFC<SauceSpotlightProps> = props => {
  return (
    <>
      <StyledLeftContainer>
        <SauceHero />

        <SauceReviews />
      </StyledLeftContainer>

      <StyledRightContainer>
        {/* {sauce && sauce._related && sauce._related.length > 0 && (
              <>
                {sauce.slug && showAppropriateReviewButton(sauce.slug)}
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
            )} */}
        {/* {saucesWithNewestReviews && saucesWithNewestReviews.length > 0 && (
              <List
                items={saucesWithNewestReviews.map((x, ind) => {
                  return {
                    link: `/sauce/view?s=${x.slug}`,
                    text: x.name,
                    id: `${ind}-${x.name}`
                  };
                })}
                title="Recently Reviewed"
              />
            )} */}
      </StyledRightContainer>
    </>
  );

  // Return appropriate "Edit" or "Add" review button. Or loading text.
  // function showAppropriateReviewButton(editSlug: string): JSX.Element {
  //   // Determine which button to return
  //   if (doesUserHaveReviewToEdit) {
  //     return (
  //       <Link href={`/review/edit?s=${editSlug}`}>
  //         <Button displayType="solid">Edit Your Review</Button>
  //       </Link>
  //     );
  //   }

  //   return (
  //     <Link href={`/review/add?s=${editSlug}`}>
  //       <Button displayType="solid">Add Review</Button>
  //     </Link>
  //   );
  // }
};

export default SauceSpotlight;
