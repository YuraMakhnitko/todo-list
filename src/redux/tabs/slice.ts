import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabsProps {
  tabIndex: number;
}

const initialState: TabsProps = {
  tabIndex: 0,
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setTabIndex(state, action: PayloadAction<number>) {
      state.tabIndex = action.payload;
    },
  },
});

export const { setTabIndex } = tabsSlice.actions;
export default tabsSlice.reducer;
