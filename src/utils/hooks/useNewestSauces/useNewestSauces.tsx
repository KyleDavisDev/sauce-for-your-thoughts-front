import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSaucesByNewest } from "../../../redux/sauces/actions";
import { AppState } from "../../../redux/configureStore";
import { ISauce } from "../../../redux/sauces/types";
import { FlashMessageProps } from "../../../components/FlashMessage/FlashMessage";

export interface IuseNewestSauces {
  loading: boolean;
  sauces: ISauce[];
  error: FlashMessageProps;
  getNewestSauces: () => Promise<void>;
}

export function useNewestSauces(): IuseNewestSauces {
  // init defaults
  const _defaultIsLoading = false;
  const _defaultSauces = [];
  const _defaultFlashState = { isVisible: false };
  const _defaultErrorMsg =
    "Error finding the newest sauces. Try refreshing your page.";

  // get sauces from redux store
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
  const getNewestSauces = async () => {
    // Prevent calling multiple times if already loading or if we already found sauces
    if (sauces.length > 0) return;
    if (loading) return;
    if (reduxSauces.featured && reduxSauces.featured.length > 0) return;

    try {
      setLoading(true);

      // Go look for sauces
      dispatch(getSaucesByNewest());
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
    // Grab list of newest slugs
    const slugsToLookup = reduxSauces.newest;
    if (!slugsToLookup) return;

    const { bySlug } = reduxSauces;
    if (!bySlug || Object.keys(bySlug).length === 0) return;

    // Find actual sauces
    const newest = slugsToLookup.map(slug => {
      return bySlug[slug];
    });

    // Make sure we found the sauces
    if (newest.length === 0) return;

    setSauces(newest);
  }, [reduxSauces.newest]);

  return { loading, sauces, getNewestSauces, error };
}
