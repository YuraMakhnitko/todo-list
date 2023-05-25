import { useState } from "react";
import useSound from "use-sound";
import { sounds } from "../settings/sounds";

import { MdLibraryAddCheck, MdOutlineLibraryAddCheck } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeTodo, comleteOneTodo } from "../redux/lists/slice";
import { useSelector } from "react-redux";

import type { Todo } from "../settings/types";
import { RootState } from "../redux/store";
import { ModalConfirm } from "./ModalConfirm";

export const OneTodo: React.FC<Todo> = ({
  todoText,
  completed,
  index,
  onDragStart,
}: Todo): JSX.Element => {
  const data = {
    index,
    completed,
  } as Todo;

  const dispatch = useDispatch();
  const todoStyleAppear: string = "todo__item";
  const todoStyleRemove: string = "todo__item-remove";
  const [todoAnim, setTodoAnim] = useState<boolean>(false);

  const volume = useSelector((state: RootState) => state.settings.soundsVolume);

  const [completedTodoPlay] = useSound(sounds.comlete, { volume });
  const [unCompletedTodoPlay] = useSound(sounds.unComplete, { volume });
  const [removeTodoSound] = useSound(sounds.remove, { volume });

  const removeTodoHandler = (): void => {
    removeTodoSound();
    setTodoAnim(!todoAnim);
    setTimeout(() => {
      dispatch(removeTodo(data));
    }, 200);
  };

  const completeTodoHandler = (): void => {
    data.completed = !data.completed;
    dispatch(comleteOneTodo(data));
    data.completed ? completedTodoPlay() : unCompletedTodoPlay();
  };

  return (
    <div
      className={todoAnim ? todoStyleRemove : todoStyleAppear}
      draggable={true}
      onDragStart={(event) => onDragStart(event, data)}
    >
      <p className="todo__number">{index ? index + 1 : 1}</p>
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
        <ModalConfirm onAction={removeTodoHandler} />
      </div>
    </div>
  );
};
