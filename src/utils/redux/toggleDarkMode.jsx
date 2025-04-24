import { createSlice } from "@reduxjs/toolkit";
const toggleDarkModeSlice = createSlice({
  name: "toggleDarkMode",
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = toggleDarkModeSlice.actions;
export default toggleDarkModeSlice.reducer;
