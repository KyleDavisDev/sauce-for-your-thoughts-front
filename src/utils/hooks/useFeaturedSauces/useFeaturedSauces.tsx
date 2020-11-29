import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ISauce } from "../../../redux/sauces/types";
import { getSaucesByFeatured } from "../../../redux/sauces/actions";
import { AppState } from "../../../redux/configureStore";
import { FlashMessageProps } from "../../../components/FlashMessage/FlashMessage";

export interface IuseFeaturedSauces {
  loading: boolean;
  sauces: ISauce[];
  error: FlashMessageProps;
  getFeaturedSauces: () => Promise<void>;
}

export function useFeaturedSauces(): IuseFeaturedSauces {
  // init defaults
  const _defaultIsLoading = false;
  const _defaultSauces = [];
  const _defaultFlashState = { isVisible: false };
  const _defaultErrorMsg =
    "Error finding the featured sauces. Try refreshing your page.";

  // get sauces object from redux
  const { sauces: reduxSauces } = useSelector((state: AppState) => state);
  // assign sauces
  const [sauces, setSauces] = React.useState<ISauce[]>(_defaultSauces);
  // assign loading
  const [loading, setLoading] = React.useState(_defaultIsLoading);
  const [error, setError] = React.useState<FlashMessageProps>(
    _defaultFlashState
  );

  // assign dispatch
  const dispatch = useDispatch();

  // define function
  const getFeaturedSauces = async () => {
    // Prevent calling multiple times if already loading or if we already found sauces
    if (sauces.length > 0) return;
    if (loading) return;
    if (reduxSauces.featured && reduxSauces.featured.length > 0) return;

    try {
      setLoading(true);

      // Go look for sauces
      dispatch(getSaucesByFeatured());
    } catch (err) {
      setError({
        type: "warning",
        isVisible: true,
        text: err.response.data.msg || _defaultErrorMsg
      });
    } finally {
      // finish loading
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Grab list of featured slugs
    const slugsToLookup = reduxSauces.featured;
    if (!slugsToLookup) return;

    const { bySlug } = reduxSauces;
    if (!bySlug || Object.keys(bySlug).length === 0) return;

    // Find actual sauces
    const featured = slugsToLookup.map(slug => {
      return bySlug[slug];
    });

    // Make sure we found the sauces
    if (featured.length === 0) return;

    setSauces(featured);
  }, [reduxSauces.featured]);

  return { loading, sauces, getFeaturedSauces, error };
}
