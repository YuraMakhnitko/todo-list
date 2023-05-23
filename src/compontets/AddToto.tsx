import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdAssignmentAdd } from "react-icons/md";

import useSound from "use-sound";
import { sounds } from "../settings/sounds";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/lists/slice";
import { addTodoContentText } from "../pages/languageSettings";

import { RootState } from "../redux/store";

import type { Todo } from "../settings/types";

export const AddTodo: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [playAddTodo] = useSound(sounds.addTodo);
  const { language } = useSelector((state: RootState) => state.settings);

  const [changedLanguage, setChangedLanguage] = useState(addTodoContentText.en);
  useEffect(() => {
    // console.log(language, "language");
    if (language === "en") {
      setChangedLanguage(addTodoContentText.en);
      // console.log(language, "language");
    }
    if (language === "ua") {
      setChangedLanguage(addTodoContentText.ua);
      // console.log(language, "language");
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
