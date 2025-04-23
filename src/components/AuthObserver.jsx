import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../utils/redux/userSlice";
import { useEffect } from "react";
import { fetchUserHistory } from "../utils/redux/historyThunk";

const AuthObserver = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(login({ uid, email, displayName, photoURL }));
        dispatch(fetchUserHistory(uid));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
};

export default AuthObserver;
