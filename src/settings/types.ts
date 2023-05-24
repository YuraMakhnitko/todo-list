export interface Todo {
  transferTodo: Todo;
  listTodo: Todo[];
  completedList: Todo[];
  todoText: string;
  completed: boolean;
  index: number;
  onDragStart(
    event: React.DragEvent<HTMLDivElement>,
    data: { todoText: string; completed: boolean; index: number }
  ): void;
  onClickAddTodo(value: string): void;
  onClickRemove(num: number, completed: boolean): void;
  onClickComplete(ind: number, completed: boolean): void;
}

export interface UserSubmitForm {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
