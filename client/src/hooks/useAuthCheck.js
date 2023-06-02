import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../app/features/auth/authSlice";

const useAuthCheck = () => {
  // States
  const [authCheckd, setAuthCheckd] = useState(false);

  // redux element
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      const isExpiredToken = isExpired(userInfo?.token);
      if (isExpiredToken) {
        dispatch(userLoggedOut());
      }
      if (userInfo?.email && userInfo?.token) {
        dispatch(userLoggedIn(userInfo));
      }
    }
    setAuthCheckd(true);
  }, [dispatch, userInfo]);

  return authCheckd;
};

export default useAuthCheck;
