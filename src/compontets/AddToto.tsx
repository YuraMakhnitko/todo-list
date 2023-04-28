import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";

interface Todo {
  onClickAddTodo(value: string): void;
}

const AddTodo = ({ onClickAddTodo }: Todo) => {
  const [inputValue, setInputValue] = useState<string>("");

  const addTodoHandler = (): void => {
    onClickAddTodo(inputValue);
    setInputValue("");
  };

  return (
    <div className="todo__input-box">
      <input
        value={inputValue}
        className="todo__input"
        placeholder="Add todo..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        disabled={!inputValue}
        className="todo__button-add"
        title={"Add to list"}
        onClick={addTodoHandler}
      >
        <MdAssignmentAdd
          style={{ width: "30px", height: "30px" }}
          className="button__add-todo"
        />
      </button>
    </div>
  );
};

export default AddTodo;
