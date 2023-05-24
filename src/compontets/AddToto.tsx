import { useState, useEffect } from "react";
import { MdAssignmentAdd } from "react-icons/md";

import useSound from "use-sound";
import { sounds } from "../settings/sounds";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/lists/slice";
import { addTodoContentText } from "../pages/languageSettings";

import { RootState } from "../redux/store";

import type { Todo } from "../settings/types";

export const AddTodo: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const { language } = useSelector((state: RootState) => state.settings);
  const volume = useSelector((state: RootState) => state.settings.soundsVolume);
  const [playAddTodo] = useSound(sounds.addTodo, { volume });

  const [changedLanguage, setChangedLanguage] = useState(addTodoContentText.en);
  useEffect(() => {
    if (language === "en") {
      setChangedLanguage(addTodoContentText.en);
    }
    if (language === "ua") {
      setChangedLanguage(addTodoContentText.ua);
    }
  }, [language]);

  const addTodoHandler = (): void => {
    const todoItem = {
      todoText: inputValue,
      completed: false,
    } as Todo;
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
