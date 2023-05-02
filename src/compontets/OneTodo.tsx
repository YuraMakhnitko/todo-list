import { useState } from "react";
import useSound from "use-sound";
import onClckRemoveTodoSound from "../sounds/ui/deleteTodo.mp3";

// import { IoIosAlbums } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdLibraryAddCheck, MdOutlineLibraryAddCheck } from "react-icons/md";

interface Todo {
  todoText: string;
  completed: boolean;
  index: number;
  onClickRemove(num: number, compleated: boolean): void;
  onClickComplete(ind: number, compleated: boolean): void;
  onDragStart(event: React.DragEvent<HTMLDivElement>, data: Todo): void;
}

const OneTodo = ({
  todoText,
  completed,
  onClickRemove,
  onClickComplete,
  index,
  onDragStart,
}: Todo) => {
  const data = {
    index,
    completed,
  } as Todo;

  const [removeTotdoSound] = useSound(onClckRemoveTodoSound);

  // const todoStyleFade: string = "todo__item-fade";
  const todoStyleAppear: string = "todo__item";
  const todoStyleRemove: string = "todo__item-remove";
  const [todoAnim, setTodoAnim] = useState<boolean>(false);

  const removeTodoHandler = (): void => {
    if (window.confirm("Are you sure you want to delete this TODO?")) {
      setTodoAnim(!todoAnim);
      removeTotdoSound();
      setTimeout(() => {
        onClickRemove(index, completed);
      }, 200);
    }
  };

  const completeTodoHandler = (): void => {
    onClickComplete(index, !completed);
  };

  return (
    <div
      className={todoAnim ? todoStyleRemove : todoStyleAppear}
      draggable={true}
      onDragStart={(event) => onDragStart(event, data)}
    >
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
