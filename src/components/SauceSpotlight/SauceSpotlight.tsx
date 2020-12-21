import * as React from "react";

import SauceHero from "./components/SauceHero/SauceHero";
import SauceRelated from "./components/SauceRelated/SauceRelated";
import SauceReviews from "./components/SauceReviews/SauceReviews";
import {
  StyledLeftContainer,
  StyledRightContainer
} from "./SauceSpotlightStyle";
import { useSauceBySlug } from "../../utils/hooks/useSauceBySlug/useSauceBySlug";
import { useRouter } from "next/router";

export interface SauceSpotlightProps {}

const SauceSpotlight: React.FC<SauceSpotlightProps> = props => {
  const { loading, sauce, error, getTheSauce } = useSauceBySlug();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      getTheSauce();
    }
  }, []);

  return (
    <>
      <StyledLeftContainer>
        <SauceHero loading={loading} sauce={sauce} error={error} />

        <SauceReviews />
      </StyledLeftContainer>

      <StyledRightContainer>
        <SauceRelated loading={loading} sauce={sauce} error={error} />

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
