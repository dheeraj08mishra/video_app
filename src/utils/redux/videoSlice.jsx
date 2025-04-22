import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    loading: false,
    error: null,
    pageToken: "",
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPageToken: (state, action) => {
      state.pageToken = action.payload;
    },
  },
});
export const { setVideos, setLoading, setError, setPageToken } =
  videoSlice.actions;
export default videoSlice.reducer;
