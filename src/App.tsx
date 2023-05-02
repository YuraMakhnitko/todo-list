import { useState } from "react";
import useSound from "use-sound";
import comleteTodoSound from "./sounds/ui/completed.mp3";
import unCompleteTodoSound from "./sounds/ui/unComplete2.mp3";

import "./App.css";

import OneTodo from "./compontets/OneTodo";
import AddTodo from "./compontets/AddToto";
import { AnimatedTitle } from "./compontets/animations/AnimatedTitle";

interface Todo {
  todoText: string;
  completed: boolean;
  index: number;
  onDragStart(): void;
  onClickAddTodo(value: string): void;
  onClickRemove(num: number, completed: boolean): void;
  onClickComplete(ind: number, completed: boolean): void;
}

function App() {
  const [listTodo, setListTodo] = useState<Todo[]>([]);
  const [completedList, setCompletedList] = useState<Todo[]>([]);

  const [transferTodo, setTransferTodo] = useState<Todo>();

  const [completedTodoPlay] = useSound(comleteTodoSound);
  const [unCompletedTodoPlay] = useSound(unCompleteTodoSound);

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
    }
    if (isCompleted) {
      const filteredList = completedList.filter((_, ind) => {
        return ind !== num;
      });

      setCompletedList(filteredList);
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
    <div className="App">
      <div className="todo">
        {/* <h2 className="todo__title">List of TODOs</h2> */}
        <AnimatedTitle />
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
              {listTodo.map((todo, index) => {
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
      </div>
    </div>
  );
}

export default App;
