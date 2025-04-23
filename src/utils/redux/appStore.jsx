import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import suggestionReducer from "./suggestionSlice";
import searchReducer from "./searchSlice";
import commentReducer from "./commentSlice";
import chatReducer from "./chatSlice";
import videoReducer from "./videoSlice";
import userReducer from "./userSlice";
import historyReducer from "./historySlice";

const appStore = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    suggestion: suggestionReducer,
    search: searchReducer,
    comment: commentReducer,
    chat: chatReducer,
    videos: videoReducer,
    user: userReducer,
    history: historyReducer,
  },
});
export default appStore;
