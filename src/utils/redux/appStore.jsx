import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import suggestionReducer from "./suggestionSlice";
import searchReducer from "./searchSlice";
import commentReducer from "./commentSlice";

const appStore = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    suggestion: suggestionReducer,
    search: searchReducer,
    comment: commentReducer,
  },
});
export default appStore;
