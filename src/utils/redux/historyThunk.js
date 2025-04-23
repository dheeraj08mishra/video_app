// utils/redux/historyThunk.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { setHistory, addToHistory } from "./historySlice";

export const saveHistoryToFirebase = (uid, history) => async () => {
  try {
    const docRef = doc(db, "watchHistory", uid);
    await setDoc(docRef, { history });
  } catch (error) {
    console.error("Error saving watch history:", error);
  }
};

export const fetchUserHistory = (uid) => async (dispatch) => {
  try {
    const docRef = doc(db, "watchHistory", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      dispatch(setHistory(data.history || []));
    } else {
      dispatch(setHistory([]));
    }
  } catch (error) {
    console.error("Error fetching watch history:", error);
    dispatch(setHistory([]));
  }
};

export const addToHistoryAndSync =
  (uid, video) => async (dispatch, getState) => {
    dispatch(addToHistory(video));

    try {
      const currentHistory = getState().history.history;
      const trimmedHistory = currentHistory.slice(-50); // Keep last 50

      const docRef = doc(db, "watchHistory", uid);
      await setDoc(docRef, { history: trimmedHistory });
    } catch (error) {
      console.error("Error syncing added video to Firebase:", error);
    }
  };
