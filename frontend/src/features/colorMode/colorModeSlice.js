import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
};

const colorModeSlice = createSlice({
  name: "colorMode",
  initialState,
  reducers: {
    toggleColorMode: (state) => {
      state.mode === "dark" ? (state.mode = "light") : (state.mode = "dark");
    },
  },
});

export const { toggleColorMode } = colorModeSlice.actions;

export default colorModeSlice.reducer;
