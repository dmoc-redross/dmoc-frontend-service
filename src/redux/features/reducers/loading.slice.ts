import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (
      state: typeof initialState,
      { payload }: { payload: boolean }
    ) => {
      state.loading = payload;
    },
  },
});

export default loadingSlice.reducer;
export const { setLoading } = loadingSlice.actions;
