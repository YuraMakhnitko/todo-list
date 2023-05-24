import { configureStore } from "@reduxjs/toolkit";
import listsTodosReducer from "./lists/slice";
import soundsReducer from "./settings/slice";
import authReducer from "./auth/slice";

export const store = configureStore({
  reducer: {
    listsTodos: listsTodosReducer,
    settings: soundsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
