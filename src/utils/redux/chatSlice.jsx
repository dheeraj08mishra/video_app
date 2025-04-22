import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatMessages: [],
    loading: false,
    userInput: "",
    isPaused: false,
    isTyping: false,
    chatRef: null,
  },
  reducers: {
    setChatMessages: (state, action) => {
      state.chatMessages = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    setIsPaused: (state, action) => {
      state.isPaused = action.payload;
    },
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    setChatRef: (state, action) => {
      state.chatRef = action.payload;
    },
    clearChatMessages: (state) => {
      state.chatMessages = [];
      state.loading = false;
      state.userInput = "";
      state.isPaused = false;
      state.isTyping = false;
    },
  },
});
export const {
  setChatMessages,
  setLoading,
  setChatRef,
  setIsPaused,
  setIsTyping,
  setUserInput,
  clearChatMessages,
} = chatSlice.actions;
export default chatSlice.reducer;
