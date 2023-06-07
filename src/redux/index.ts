import * as settigsSlice from "./settings/slice";
import * as listsSlice from "./lists/slice";
import * as authSlice from "./auth/slice";
import * as tabsSlice from "./tabs/slice";
import * as typesRedux from "./types";
import * as storeRedux from "./store";
import { type RootState } from "./store";
import { type AppDispatch } from "./store";
import { fetchRegister, fetchLogin, fetcAuthMe } from "./auth/asyncActions";
import {
  fetchAddTodo,
  fetchTodos,
  fetchUpdateTodo,
  fetchRemoveTodo,
} from "./lists/asyncActions";

const { setLanguage, setVolume } = settigsSlice;
const {
  addTodo,
  removeTodo,
  comleteOneTodo,
  setActiveTodos,
  setCompletedTodos,
} = listsSlice;
const { setAuth } = authSlice;
const { setTabIndex } = tabsSlice;
const { Language } = typesRedux;
const { store } = storeRedux;

export {
  setLanguage,
  setVolume,
  addTodo,
  removeTodo,
  comleteOneTodo,
  setAuth,
  setTabIndex,
  setActiveTodos,
  setCompletedTodos,
  type RootState,
  type AppDispatch,
  Language,
  store,
  fetchRegister,
  fetchLogin,
  fetcAuthMe,
  fetchAddTodo,
  fetchTodos,
  fetchUpdateTodo,
  fetchRemoveTodo,
};
