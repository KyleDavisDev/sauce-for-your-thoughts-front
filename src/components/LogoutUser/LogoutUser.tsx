import * as React from "react";
import { useDispatch } from "react-redux";
import { reduxStore } from "../../redux/with-redux-store";
import { logout } from "../../redux/users/actions";
import { useRouter } from "next/router";

interface ILogoutUserProps {}

const LogoutUser: React.FunctionComponent<ILogoutUserProps> = props => {
  // assign dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();

  // assign router
  const router = useRouter();

  React.useEffect(() => {
    // use redux to log user out
    useThunkDispatch(logout());

    // take user home
    router.push("/");
  });

  return <p>logging out...</p>;
};

export default LogoutUser;
