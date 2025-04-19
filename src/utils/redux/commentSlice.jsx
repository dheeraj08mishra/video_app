import { createSlice } from "@reduxjs/toolkit";
const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    loading: false,
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setComments, setLoading } = commentSlice.actions;
export default commentSlice.reducer;
