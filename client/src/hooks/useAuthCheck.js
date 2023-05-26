import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../app/features/auth/authSlice";

const useAuthCheck = () => {
  // States
  const [authCheckd, setAuthCheckd] = useState(false);

  // redux element
  const dispatch = useDispatch();

  useEffect(() => {
    const authUser = localStorage.getItem("userInfo");
    if (authUser) {
      const user = JSON.parse(authUser);
      const isExpiredToken = isExpired(user?.token);
      if (isExpiredToken) {
        dispatch(userLoggedOut());
      }
      if (user?.email && user?.token) {
        dispatch(userLoggedIn(user));
      }
    }
    setAuthCheckd(true);
  }, [dispatch]);

  return authCheckd;
};

export default useAuthCheck;
