import axios from "../../settings/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type Todo } from "../../settings/types";

interface FetchProps {
  user: string | undefined;
}

interface UpdateTodoProps {
  _id: string | undefined;
  completed: boolean;
}

export const fetchTodos = createAsyncThunk(
  "/gettodos",
  async (params: FetchProps) => {
    const { data } = await axios.post("/gettodos", params);
    return data;
  }
);

export const fetchAddTodo = createAsyncThunk(
  "/addtodo",
  async (params: Todo) => {
    const { data } = await axios.post("/addtodo", params);
    return data;
  }
);

export const fetchUpdateTodo = createAsyncThunk(
  "/updatetodo/:todoId",
  async (params: UpdateTodoProps) => {
    const { _id, completed } = params;
    const { data } = await axios.patch(`/updatetodo/${_id}`, { completed });
    return data;
  }
);

export const fetchRemoveTodo = createAsyncThunk(
  "/removetodo/:todoId",
  async (id: string | undefined) => {
    const { data } = await axios.delete(`/removetodo/${id}`);
    return data;
  }
);
