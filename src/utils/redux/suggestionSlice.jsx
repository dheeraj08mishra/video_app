import { createSlice } from "@reduxjs/toolkit";

const suggestionSlice = createSlice({
  name: "suggestion",
  initialState: {
    keyword: {},
  },
  reducers: {
    storedSuggestions: (state, action) => {
      state.keyword = Object.assign(state.keyword, action.payload);
    },
  },
});
export const { storedSuggestions } = suggestionSlice.actions;
export default suggestionSlice.reducer;
