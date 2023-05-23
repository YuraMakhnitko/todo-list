import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../settings/types";

interface ListsTodosState {
  todosList: Todo[];
  todosListCompleted: Todo[];
}

const initialState: ListsTodosState = {
  todosList: [],
  todosListCompleted: [],
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
  },
});

export const { addTodo, removeTodo, comleteOneTodo } = listsTodosSlice.actions;
export default listsTodosSlice.reducer;
