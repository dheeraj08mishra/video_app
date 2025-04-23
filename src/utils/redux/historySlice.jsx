import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    history: [],
  },
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    addToHistory: (state, action) => {
      const newVideo = action.payload;
      const existing = state.history.find((item) => item.id === newVideo.id);
      if (!existing) {
        state.history.unshift(newVideo);
      }
    },
    removeFromHistory: (state, action) => {
      state.history = state.history.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { setHistory, addToHistory, removeFromHistory, clearHistory } =
  historySlice.actions;

export default historySlice.reducer;
