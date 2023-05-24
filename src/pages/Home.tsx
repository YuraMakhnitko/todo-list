import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import { sounds } from "../settings/sounds";
import { homeContentText } from "./languageSettings";

import { OneTodo, AddTodo } from "../components/index";

import type { Todo } from "../settings/types";
import type { RootState } from "../redux/store";
import { comleteOneTodo } from "../redux/lists/slice";

export const Home: React.FC = (): JSX.Element => {
  const volume = useSelector((state: RootState) => state.settings.soundsVolume);
  const [unCompletedTodoPlay] = useSound(sounds.unComplete, { volume });
  const [completedTodoPlay] = useSound(sounds.comlete, { volume });

  const dispatch = useDispatch();

  const { todosList, todosListCompleted } = useSelector(
    (state: RootState) => state.listsTodos
  );

  const [transferTodo, setTransferTodo] = useState<Todo>();

  const { language } = useSelector((state: RootState) => state.settings);

  const [changedLanguage, setChangedLanguage] = useState(homeContentText.en);

  useEffect(() => {
    if (language === "en") {
      setChangedLanguage(homeContentText.en);
    }
    if (language === "ua") {
      setChangedLanguage(homeContentText.ua);
    }
  }, [language]);

  const onDragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    data: Todo
  ) => {
    const dataString = JSON.stringify(data);
    event.dataTransfer.setData("text", dataString);

    setTransferTodo(data);
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text")) as Todo;
    data.completed = !data.completed;
    dispatch(comleteOneTodo(data));
    data.completed ? completedTodoPlay() : unCompletedTodoPlay();
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  return (
    <>
      <AddTodo />

      <div
        className="todo__items-active"
        onDrop={dropHandler}
        onDragOver={transferTodo?.completed ? allowDrop : undefined}
      >
        {todosList.length > 0 && (
          <>
            {language === "en" && (
              <h4 className="todo__sub-title">
                {`Your have ${todosList.length} active TODO${
                  todosList.length > 1 ? "s" : ""
                }!`}
              </h4>
            )}
            {language === "ua" &&
              todosList.length > 1 &&
              todosList.length < 5 && (
                <h4 className="todo__sub-title">
                  {`Ви маєте ${todosList.length} активнi ЗАВДАННЯ!`}
                </h4>
              )}
            {language === "ua" && todosList.length === 1 && (
              <h4 className="todo__sub-title">
                {`Ви маєте ${todosList.length} активнe ЗАВДАННЯ!`}
              </h4>
            )}
            {language === "ua" && todosList.length > 4 && (
              <h4 className="todo__sub-title">
                {`Ви маєте ${todosList.length} активних ЗАВДАНЬ!`}
              </h4>
            )}
            {todosList.map((todo: Todo, index: number) => {
              return (
                <OneTodo
                  {...todo}
                  key={index}
                  index={index}
                  onDragStart={onDragStartHandler}
                />
              );
            })}
          </>
        )}
        {todosList.length === 0 && (
          <h4 className="todo__sub-title">{changedLanguage.emptyList}</h4>
        )}
      </div>
      <div
        className="todo__items-completed"
        onDrop={dropHandler}
        onDragOver={transferTodo?.completed ? undefined : allowDrop}
      >
        {todosListCompleted.length === 0 && todosList.length > 0 && (
          <h4 className="todo__sub-title">{changedLanguage.dragTodo}</h4>
        )}
        {todosListCompleted.length > 0 && (
          <>
            {language === "en" && (
              <h4 className="todo__sub-title">
                {`Completed ${todosListCompleted.length} TODO${
                  todosListCompleted.length > 1 ? "s" : ""
                }`}
              </h4>
            )}
            {language === "ua" &&
              todosListCompleted.length > 0 &&
              todosListCompleted.length < 5 && (
                <h4 className="todo__sub-title">
                  {`Виконано ${todosListCompleted.length} ЗАВДАННЯ`}
                </h4>
              )}

            {language === "ua" && todosListCompleted.length > 4 && (
              <h4 className="todo__sub-title">
                {`Виконано ${todosListCompleted.length} ЗАВДАНЬ`}
              </h4>
            )}

            {todosListCompleted
              .map((todo, index) => {
                return (
                  <OneTodo
                    {...todo}
                    key={index}
                    index={index}
                    onDragStart={onDragStartHandler}
                  />
                );
              })
              .reverse()}
          </>
        )}
      </div>
    </>
  );
};
