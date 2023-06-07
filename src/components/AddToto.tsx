import { useState, useEffect } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import useSound from "use-sound";
import { sounds } from "../settings/sounds";
import { useDispatch, useSelector } from "react-redux";
import { addTodoContentText } from "../pages/languageSettings";
import type { Todo } from "../settings/types";
import {
  addTodo,
  AppDispatch,
  RootState,
  fetchAddTodo,
  fetchTodos,
  setActiveTodos,
  setCompletedTodos,
} from "../redux";

export const AddTodo: React.FC = (): JSX.Element => {
  const dispatch = useDispatch() as AppDispatch;
  const [inputValue, setInputValue] = useState<string>("");
  const { language } = useSelector((state: RootState) => state.settings);
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const volume = useSelector((state: RootState) => state.settings.soundsVolume);
  const [playAddTodo] = useSound(sounds.addTodo, { volume });

  const [changedLanguage, setChangedLanguage] = useState(addTodoContentText.en);
  useEffect(() => {
    if (language === "en" || language === "ua") {
      setChangedLanguage(addTodoContentText[language]);
    }
  }, [language]);

  const addTodoHandler = async () => {
    const todoItem = {
      todoText: inputValue,
      completed: false,
      user: user._id,
    } as Todo;
    if (isAuth) {
      await dispatch(fetchAddTodo(todoItem));
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

      fetchDataTodos();
    }
    dispatch(addTodo(todoItem));
    playAddTodo();
    setInputValue("");
  };

  return (
    <div className="todo__input-box">
      <input
        value={inputValue}
        className="todo__input"
        placeholder={changedLanguage.placeholerText}
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
