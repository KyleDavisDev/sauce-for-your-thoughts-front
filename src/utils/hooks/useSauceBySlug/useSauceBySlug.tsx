import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSauceBySlug } from "../../../redux/sauces/actions";
import { AppState } from "../../../redux/configureStore";
import { ISauce } from "../../../redux/sauces/types";
import { FlashMessageProps } from "../../../components/FlashMessage/FlashMessage";
import { useRouter } from "next/router";

export interface IuseSauceBySlug {
  loading: boolean;
  sauce?: ISauce;
  error: FlashMessageProps;
  getTheSauce: () => Promise<void>;
}

export function useSauceBySlug(slug?: string): IuseSauceBySlug {
  // init defaults
  const _defaultIsLoading = false;
  const _defaultSauces = undefined;
  const _defaultFlashState = { isVisible: false };
  const _defaultErrorMsg =
    "Could not find a sauce corresponding to this page. Please refresh and try again.";

  // get sauces from redux store
  const { sauces: reduxSauces } = useSelector((state: AppState) => state);
  // assign sauce
  const [sauce, setSauce] = React.useState<ISauce | undefined>(_defaultSauces);
  // assign loading
  const [loading, setLoading] = React.useState(_defaultIsLoading);
  const [error, setError] = React.useState<FlashMessageProps>(
    _defaultFlashState
  );

  // assign dispatch
  const dispatch = useDispatch();
  // assign router
  const router = useRouter();

  // define function
  const getTheSauce = async () => {
    // Prevent calling multiple times if already loading or if we already found sauces
    if (sauce && Object.keys(sauce).length > 0) return;
    if (loading) return;
    // if (reduxSauces.newest && reduxSauces.newest.length > 0) return;

    try {
      setLoading(true);

      // use specific slug if passed else look at URL
      const s = slug ? slug : router.query?.s;
      if (!s || Array.isArray(s)) {
        return;
      }

      // Go look for sauces
      dispatch(getSauceBySlug({ slug: s }));
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
    // use specific slug if passed else look at URL
    const s = slug ? slug : router.query?.s;
    if (!s || Array.isArray(s)) return;

    const { bySlug } = reduxSauces;
    if (!bySlug || Object.keys(bySlug).length === 0) return;

    // Find actual sauces
    const sauceWeWant = bySlug[s];

    // Make sure we found the sauces
    if (!sauceWeWant || Object.keys(sauceWeWant).length === 0) return;

    setSauce(sauceWeWant);
  }, [slug, router.asPath]);

  return { loading, sauce, getTheSauce, error };
}
