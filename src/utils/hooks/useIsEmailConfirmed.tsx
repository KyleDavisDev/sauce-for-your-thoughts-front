import React from "react";
import { useSelector } from "react-redux";
import { FlashMessageProps } from "../../components/FlashMessage/FlashMessage";
import { AppState } from "../../redux/configureStore";
import { API } from "../api/API";

export interface IuseIsEmailConfirmed {
  loading: boolean;
  isEmailConfirmed: boolean;
  error: FlashMessageProps;
}

export function useIsEmailConfirmed(): IuseIsEmailConfirmed {
  // init defaults
  const _defaultIsLoading = false;
  const _defaultIsEmailConfirmed = false;
  const _defaultFlashState = { isVisible: false };

  // init state
  const [_loading, setLoading] = React.useState(_defaultIsLoading);
  const [_isEmailConfirmed, setIsEmailConfirmed] = React.useState(
    _defaultIsEmailConfirmed
  );
  const [_error, setError] = React.useState<FlashMessageProps>(
    _defaultFlashState
  );

  // Grab token from redux
  const token = useSelector((store: AppState) => store.users?.self?.token);

  // Make sure user has a token
  React.useEffect(() => {
    // Quick sanity check
    if (!token) {
      setLoading(_defaultIsLoading);
      setIsEmailConfirmed(_defaultIsEmailConfirmed);
      setError(_defaultFlashState);
      return;
    }

    const getEmailConfirmed = async function () {
      try {
        setLoading(true);

        // hit our API
        const data = { user: { token } };
        const res = await API.user.isEmailConfirmed({ data });

        setIsEmailConfirmed(res.data.isGood);
      } catch (err) {
        setIsEmailConfirmed(false);
        setError({
          type: "warning",
          isVisible: true,
          text: err.response.data.msg
        });
      } finally {
        setLoading(false);
      }
    };

    // Check if user has their email verified or not
    if (!_loading) {
      getEmailConfirmed();
    }
  }, [token]);

  return {
    loading: _loading,
    isEmailConfirmed: _isEmailConfirmed,
    error: _error
  };
}
