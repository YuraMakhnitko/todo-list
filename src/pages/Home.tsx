import { useState } from "react";
import useSound from "use-sound";

import OneTodo from "../compontets/OneTodo";
import AddTodo from "../compontets/AddToto";

import { Todo } from "../settings/types";

import { sounds } from "../settings/sounds";

export const Home: React.FC = () => {
  const [listTodo, setListTodo] = useState<Todo[]>([]);
  const [completedList, setCompletedList] = useState<Todo[]>([]);
  const [transferTodo, setTransferTodo] = useState<Todo>();

  const [completedTodoPlay] = useSound(sounds.comlete);
  const [unCompletedTodoPlay] = useSound(sounds.unComplete);
  const [removeTodoSound] = useSound(sounds.remove);

  const handleAddTodo = (todoValue: string): void => {
    const todoItem = {
      todoText: todoValue,
      completed: false,
    } as Todo;

    const newList = [...listTodo, todoItem];
    setListTodo(newList);
  };

  const handleRemoveTodo = (num: number, isCompleted: boolean): void => {
    if (!isCompleted) {
      const filteredList = listTodo.filter((_, ind) => {
        return ind !== num;
      });

      setListTodo(filteredList);
      removeTodoSound();
    }
    if (isCompleted) {
      const filteredList = completedList.filter((_, ind) => {
        return ind !== num;
      });

      setCompletedList(filteredList);
      removeTodoSound();
    }
  };

  const handleCompeteTodo = (ind: number, isCompleted: boolean): void => {
    if (isCompleted) {
      const findCompletedTodo = listTodo.find((_, index) => {
        return index === ind;
      });

      if (findCompletedTodo) {
        findCompletedTodo.completed = isCompleted;
        setCompletedList([...completedList, findCompletedTodo]);

        setListTodo(
          listTodo.filter((todo) => {
            return !todo.completed;
          })
        );
      }
      completedTodoPlay();
    }
    if (!isCompleted) {
      const findActiveTodo = completedList.find((_, index) => {
        return index === ind;
      });
      if (findActiveTodo) {
        findActiveTodo.completed = isCompleted;
        setListTodo([...listTodo, findActiveTodo]);
        setCompletedList(
          completedList.filter((todo) => {
            return todo.completed;
          })
        );
      }
      unCompletedTodoPlay();
    }
  };

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
    handleCompeteTodo(data.index, !data.completed);
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  return (
    <>
      <AddTodo onClickAddTodo={handleAddTodo} />

      <div
        className="todo__items-active"
        onDrop={dropHandler}
        onDragOver={transferTodo?.completed ? allowDrop : undefined}
      >
        {listTodo.length > 0 && (
          <>
            <h4 className="todo__sub-title">
              {`Your have ${listTodo.length} active TODO${
                listTodo.length > 1 ? "s" : ""
              }!`}
            </h4>
            {listTodo.map((todo: Todo, index: number) => {
              return (
                <OneTodo
                  {...todo}
                  key={index}
                  index={index}
                  onDragStart={onDragStartHandler}
                  onClickRemove={handleRemoveTodo}
                  onClickComplete={handleCompeteTodo}
                />
              );
            })}
          </>
        )}
        {listTodo.length === 0 && (
          <h4 className="todo__sub-title">Your list of TODOs is empty!</h4>
        )}
      </div>
      <div
        className="todo__items-completed"
        onDrop={dropHandler}
        onDragOver={transferTodo?.completed ? undefined : allowDrop}
      >
        {completedList.length === 0 && listTodo.length > 0 && (
          <h4 className="todo__sub-title">
            Drag TOTO here to mark it as Completed
          </h4>
        )}
        {completedList.length > 0 && (
          <>
            <h4 className="todo__sub-title">
              {`Completed ${completedList.length} TODO${
                completedList.length > 1 ? "s" : ""
              }`}
            </h4>

            {completedList
              .map((todo, index) => {
                return (
                  <OneTodo
                    {...todo}
                    key={index}
                    index={index}
                    onDragStart={onDragStartHandler}
                    onClickRemove={handleRemoveTodo}
                    onClickComplete={handleCompeteTodo}
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
