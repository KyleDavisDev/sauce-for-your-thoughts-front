import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ISauce } from "../../redux/sauces/types";
import { getSaucesByFeatured } from "../../redux/sauces/actions";
import { AppState } from "../../redux/configureStore";

export function useFeaturedSauces(): [ISauce[] | null, boolean] {
  // get sauces from redux store
  const { sauces } = useSelector((state: AppState) => state);
  // assign results
  const [results, setResults] = React.useState<ISauce[]>([]);
  // assign loading
  const [loading, setLoading] = React.useState(false);

  // assign dispatch
  const dispatch = useDispatch();

  // run once
  React.useEffect(() => {
    // check if we need to dispatch redux action or not
    if (sauces.featured.length === 0 && !loading) {
      // emmit redux action to populate sauces.featured
      dispatch(getSaucesByFeatured());

      // update loading
      setLoading(true);
    }
  }, []);

  // run when sauces.featured changes
  React.useEffect(() => {
    async function getData() {
      try {
        // Find the sauces we will render by first getting the array of slugs
        const sauceSlugs2Render = sauces.featured;

        // Make sure our store has content
        const bySlug = sauces.bySlug ? sauces.bySlug : {};
        if (!bySlug) return [null, loading];

        // Find actual sauces
        const featured = sauceSlugs2Render
          ? sauceSlugs2Render.map(slug => {
              return bySlug[slug];
            })
          : [];

        // Make sure we found the sauces
        if (featured.length === 0) return [null, loading];

        setResults(featured);
      } catch {
      } finally {
        // finish loading
        setLoading(false);
      }
      return [null, loading];
    }

    if (results.length === 0 && sauces.featured.length > 0) {
      getData();
    }
  }, [sauces.featured]);

  return [results, loading];
}
