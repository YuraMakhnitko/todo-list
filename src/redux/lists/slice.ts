import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../settings/types";
import { ListsTodosState } from "./types";
import { fetchAddTodo, fetchTodos } from "./asyncActions";
import { Status } from "../auth/types";

const initialState: ListsTodosState = {
  fetchedTodos: [],
  todosList: [],
  todosListCompleted: [],
  status: Status.LOADING,
};

export const listsTodosSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todosList = [...state.todosList, action.payload];
    },

    removeTodo(state, action: PayloadAction<Todo>) {
      !action.payload.completed
        ? (state.todosList = state.todosList.filter((_, ind: number) => {
            return ind !== action.payload.index;
          }))
        : (state.todosListCompleted = state.todosListCompleted.filter(
            (_, ind: number) => {
              return ind !== action.payload.index;
            }
          ));
    },

    comleteOneTodo(state, action: PayloadAction<Todo>) {
      const findCompletedTodo = action.payload.completed
        ? state.todosList.find((_, index: number) => {
            return index === action.payload.index;
          })
        : state.todosListCompleted.find((_, index: number) => {
            return index === action.payload.index;
          });

      if (findCompletedTodo) {
        if (action.payload.completed) {
          findCompletedTodo.completed = action.payload.completed;
          state.todosListCompleted = [
            ...state.todosListCompleted,
            findCompletedTodo,
          ];
          state.todosList = state.todosList.filter((todo: Todo) => {
            return !todo.completed;
          });
        } else {
          findCompletedTodo.completed = action.payload.completed;
          state.todosList = [...state.todosList, findCompletedTodo];
          state.todosListCompleted = state.todosListCompleted.filter(
            (todo: Todo) => {
              return todo.completed;
            }
          );
        }
      }
    },
    setActiveTodos(state, action: PayloadAction<Todo[]>) {
      state.todosList = action.payload;
    },
    setCompletedTodos(state, action: PayloadAction<Todo[]>) {
      state.todosListCompleted = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ADD ONE TODO
    builder.addCase(fetchAddTodo.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(
      fetchAddTodo.fulfilled,
      (state, action: PayloadAction<Todo>) => {
        state.fetchedTodos = [action.payload, ...state.fetchedTodos];
        state.status = Status.SUCCSESS;
      }
    );
    builder.addCase(fetchAddTodo.rejected, (state) => {
      state.status = Status.ERROR;
    });
    // fetch todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = Status.LOADING;
      state.fetchedTodos = [];
    });
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.status = Status.SUCCSESS;
        state.fetchedTodos = action.payload;
      }
    );
    builder.addCase(fetchTodos.rejected, (state) => {
      state.status = Status.ERROR;
      state.fetchedTodos = [];
    });
  },
});

export const {
  addTodo,
  removeTodo,
  comleteOneTodo,
  setActiveTodos,
  setCompletedTodos,
} = listsTodosSlice.actions;
export default listsTodosSlice.reducer;
