import type { Todo } from "../../settings/types";

export interface ListsTodosState {
  fetchedTodos: Todo[];
  todosList: Todo[];
  todosListCompleted: Todo[];
  status: string;
}
