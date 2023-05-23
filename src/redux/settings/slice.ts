import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Settings {
  soundsVolume: number;
  language: string;
}

const initialState: Settings = {
  soundsVolume: 0.3,
  language: "en",
};

export const settingsSlice = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    setVolume(state, action: PayloadAction<number>) {
      state.soundsVolume = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const { setVolume, setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
