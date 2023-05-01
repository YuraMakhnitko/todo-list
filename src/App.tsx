import { useState, useRef } from "react";

import "./App.css";

import OneTodo from "./compontets/OneTodo";
import AddTodo from "./compontets/AddToto";

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

  const completedItems = useRef<HTMLDivElement>(null);
  const arctiveItems = useRef<HTMLDivElement>(null);
  const [transferTodo, setTransferTodo] = useState<Todo>();
  const [field, setField] = useState<boolean>(false);
  // console.log(transferTodo, "aAAAAAAAAAAAAAA");

  const handleAddTodo = (todoValue: string) => {
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
    }
  };

  const onDragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    data: Todo
  ) => {
    setField(false);
    const dataString = JSON.stringify(data);
    event.dataTransfer.setData("text", dataString);
    if (data.completed) {
      setField(data.completed);
    }
    // setField(!data.completed);
    setTransferTodo(data);
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text")) as Todo;
    handleCompeteTodo(data.index, !data.completed);
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    // if (!field) {
    //   return;
    // }
    // event.preventDefault();
    // if (transferTodo?.completed !== field) {
    //   event.preventDefault();
    //   return;
    // }
    if (transferTodo?.completed) {
      return;
    }
    event.preventDefault();
    // event.preventDefault();
  };

  // const allowDropCompleted = (event: React.DragEvent<HTMLDivElement>): void => {
  //   if (transferTodo?.completed) {
  //     return;
  //   }
  //   event.preventDefault();
  // };

  return (
    <div className="App">
      <div className="todo">
        <h2 className="todo__title">List of TODOs</h2>
        <div
          className="todo__items-active"
          ref={arctiveItems}
          onDrop={dropHandler}
          // onDragOver={()=>allowDrop(arctiveItems)}
          onDragOver={allowDrop}
        >
          <AddTodo onClickAddTodo={handleAddTodo} />
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
          onDragOver={allowDrop}
          ref={completedItems}
        >
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
