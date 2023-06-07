import { useSelector } from "react-redux";
import type { RootState } from "../../redux";

interface TodosCompletedHomeProps {
  todosListCompletedLength: number;
}

export const TodosCompletedHomeMessages: React.FC<TodosCompletedHomeProps> = ({
  todosListCompletedLength,
}): JSX.Element => {
  const { language } = useSelector((state: RootState) => state.settings);

  return (
    <>
      {language === "en" && (
        <h4 className="todo__sub-title">
          {`Completed ${todosListCompletedLength} TODO${
            todosListCompletedLength > 1 ? "s" : ""
          }`}
        </h4>
      )}
      {language === "ua" &&
        todosListCompletedLength > 0 &&
        todosListCompletedLength < 5 && (
          <h4 className="todo__sub-title">
            {`Виконано ${todosListCompletedLength} ЗАВДАННЯ`}
          </h4>
        )}

      {language === "ua" && todosListCompletedLength > 4 && (
        <h4 className="todo__sub-title">
          {`Виконано ${todosListCompletedLength} ЗАВДАНЬ`}
        </h4>
      )}
    </>
  );
};
