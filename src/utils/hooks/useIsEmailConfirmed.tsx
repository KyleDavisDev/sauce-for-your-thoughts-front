import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlashMessageProps } from "../../components/FlashMessage/FlashMessage";
import { AppState } from "../../redux/configureStore";
import { API } from "../api/API";

export interface IuseIsEmailConfirmed {
  loading: boolean;
  isEmailConfirmed: boolean;
  error: FlashMessageProps;
}

export function useIsEmailConfirmed(): IuseIsEmailConfirmed {
  // init state
  const [_loading, setLoading] = React.useState(false);
  const [_isEmailConfirmed, setIsEmailConfirmed] = React.useState(false);
  const [_error, setError] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  // Grab token from redux
  const token = useSelector((store: AppState) => store.users?.self?.token);

  // Make sure user has a token
  React.useEffect(() => {
    // Quick sanity check
    if (!token) {
      setLoading(false);
      setIsEmailConfirmed(false);
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
