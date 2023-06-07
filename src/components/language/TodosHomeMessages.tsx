import { useSelector } from "react-redux";
import type { RootState } from "../../redux";
interface TodoHomeMasagesProps {
  todosListLength: number;
}

export const TodosHomeMessages: React.FC<TodoHomeMasagesProps> = ({
  todosListLength,
}): JSX.Element => {
  const { language } = useSelector((state: RootState) => state.settings);
  return (
    <>
      {language === "en" && (
        <h4 className="todo__sub-title">
          {`Your have ${todosListLength} active TODO${
            todosListLength > 1 ? "s" : ""
          }!`}
        </h4>
      )}
      {language === "ua" && todosListLength > 1 && todosListLength < 5 && (
        <h4 className="todo__sub-title">
          {`Ви маєте ${todosListLength} активнi ЗАВДАННЯ!`}
        </h4>
      )}
      {language === "ua" && todosListLength === 1 && (
        <h4 className="todo__sub-title">
          {`Ви маєте ${todosListLength} активнe ЗАВДАННЯ!`}
        </h4>
      )}
      {language === "ua" && todosListLength > 4 && (
        <h4 className="todo__sub-title">
          {`Ви маєте ${todosListLength} активних ЗАВДАНЬ!`}
        </h4>
      )}
    </>
  );
};
