export interface Todo {
  todoText: string;
  completed: boolean;
  index: number;
  user?: string;
  _id?: string;
  onDragStart(
    event: React.DragEvent<HTMLDivElement>,
    data: { todoText: string; completed: boolean; index: number }
  ): void;
}

export interface UserSubmitForm {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
