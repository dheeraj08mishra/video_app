import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
    loading: false,
    suggestions: [],
    selectedIndex: -1,
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
      state.loading = false;
      state.selectedIndex = -1;
    },
  },
});
export const {
  setSearchValue,
  setSuggestions,
  setSelectedIndex,
  setLoading,
  clearSuggestions,
} = searchSlice.actions;
export default searchSlice.reducer;
