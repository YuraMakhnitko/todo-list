import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import { sounds } from "../settings/sounds";
import { homeContentText } from "./languageSettings";
import type { Todo } from "../settings/types";

import {
  OneTodo,
  AddTodo,
  TodosHomeMessages,
  TodosCompletedHomeMessages,
} from "../components/index";

import {
  AppDispatch,
  RootState,
  comleteOneTodo,
  fetchTodos,
  setActiveTodos,
  setCompletedTodos,
  fetchUpdateTodo,
} from "../redux";

export const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch() as AppDispatch;

  const volume = useSelector((state: RootState) => state.settings.soundsVolume);
  const [unCompletedTodoPlay] = useSound(sounds.unComplete, { volume });
  const [completedTodoPlay] = useSound(sounds.comlete, { volume });

  const { todosList, todosListCompleted } = useSelector(
    (state: RootState) => state.listsTodos
  );
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchDataTodos = async () => {
      const fetchActive = {
        completed: false,
        user: user._id,
      };
      const fetchCompleted = {
        completed: true,
        user: user._id,
      };

      const dataActive = (await dispatch(fetchTodos(fetchActive)))
        .payload as Todo[];

      const dataCompleted = (await dispatch(fetchTodos(fetchCompleted)))
        .payload as Todo[];

      dispatch(setActiveTodos(dataActive));
      dispatch(setCompletedTodos(dataCompleted));
    };
    if (isAuth) {
      fetchDataTodos();
    }
  }, [isAuth]);

  const [transferTodo, setTransferTodo] = useState<Todo>();
  const { language } = useSelector((state: RootState) => state.settings);
  const [changedLanguage, setChangedLanguage] = useState(homeContentText.en);

  useEffect(() => {
    if (language === "en" || language === "ua") {
      setChangedLanguage(homeContentText[language]);
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

    if (isAuth) {
      const params = {
        _id: data._id,
        completed: data.completed,
      };
      dispatch(fetchUpdateTodo(params));
    }

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
            <TodosHomeMessages todosListLength={todosList.length} />
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
          <h4 className="todo__sub-title-completed">
            {changedLanguage.dragTodo}
          </h4>
        )}
        {todosListCompleted.length > 0 && (
          <>
            <TodosCompletedHomeMessages
              todosListCompletedLength={todosListCompleted.length}
            />

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
