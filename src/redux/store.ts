import { configureStore } from "@reduxjs/toolkit";
import listsTodosReducer from "./lists/slice";
import soundsReduser from "./settings/slice";

export const store = configureStore({
  reducer: {
    listsTodos: listsTodosReducer,
    settings: soundsReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
