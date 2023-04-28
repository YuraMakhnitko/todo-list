import { useState } from "react";

import { IoIosAlbums } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdLibraryAddCheck, MdOutlineLibraryAddCheck } from "react-icons/md";

interface Todo {
  todoText: string;
  completed: boolean;
  index: number;
  onClickRemove(num: number, compleated: boolean): void;
  onClickComplete(ind: number, compleated: boolean): void;
}

const OneTodo = ({
  todoText,
  completed,
  onClickRemove,
  onClickComplete,
  index,
}: Todo) => {
  const todoStyleFade: string = "todo__item-fade";
  const todoStyleAppear: string = "todo__item";
  const todoStyleRemove: string = "todo__item-remove";
  const [todoAnim, setTodoAnim] = useState<boolean>(false);

  const removeTodoHandler = (): void => {
    setTodoAnim(!todoAnim);
    setTimeout(() => {
      onClickRemove(index, completed);
    }, 200);
    // onClickRemove(index, completed);
    console.log("hey");
  };

  const completeTodoHandler = (): void => {
    onClickComplete(index, !completed);
    setTimeout(() => {
      // onClickComplete(index, !completed);
      // if (todoAnim) {
      //   setTodoAnim(!todoAnim);
      // }
    }, 200);
    // if (index < 2) {
    //   setTimeout(() => setTodoAnim(todoStyleAppear), 200);
    // }
    // setTimeout(() => setTodoAnim(todoStyleAppear), 5);
    // if (completed) {
    // }
    // setTimeout(() => setTodoAnim(todoStyleAppear), 200);
    // setTodoAnim(todoStyleAppear);
    // onClickComplete(index, !completed);
  };

  return (
    <div className={todoAnim ? todoStyleRemove : todoStyleAppear}>
      <p className="todo__number">{index + 1}</p>
      <p className="todo__description">{todoText}</p>
      <div className="todo__button-box">
        <button
          className="todo__button-done"
          title={completed ? "Mark as Active?" : "Mark as Completed?"}
          onClick={completeTodoHandler}
        >
          {!completed ? (
            <MdOutlineLibraryAddCheck
              style={{ width: "25px", height: "25px" }}
            />
          ) : (
            <MdLibraryAddCheck style={{ width: "25px", height: "25px" }} />
          )}
        </button>
        <button
          className="todo__button-delete"
          title="Delete"
          onClick={removeTodoHandler}
        >
          <RiDeleteBinLine style={{ width: "25px", height: "25px" }} />
        </button>
      </div>
    </div>
  );
};

export default OneTodo;
