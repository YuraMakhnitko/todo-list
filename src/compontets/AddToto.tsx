import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";

import useSound from "use-sound";
import { sounds } from "../settings/sounds";

interface TodoAdd {
  onClickAddTodo(value: string): void;
}
// import { Todo } from "../settings/types";

const AddTodo: React.FC<TodoAdd> = ({ onClickAddTodo }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [playAddTodo] = useSound(sounds.addTodo);

  const addTodoHandler = (): void => {
    onClickAddTodo(inputValue);
    playAddTodo();
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
