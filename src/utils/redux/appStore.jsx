import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import suggestionReducer from "./suggestionSlice";
import searchReducer from "./searchSlice";
import commentReducer from "./commentSlice";
import chatReducer from "./chatSlice";
import videoReducer from "./videoSlice";

const appStore = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    suggestion: suggestionReducer,
    search: searchReducer,
    comment: commentReducer,
    chat: chatReducer,
    videos: videoReducer,
  },
});
export default appStore;
