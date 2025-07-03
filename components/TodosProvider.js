import React from "react";
import { dateToStr } from "../utils/util";

const TodosContext = React.createContext();

export const TodosProvider = ({children}) => {
  const [todos, setTodos] = React.useState([]);
  const lastTodoIdRef = React.useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    }

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };
  return (
      <TodosContext.Provider value={{ todos, addTodo }}>
        {children}
      </TodosContext.Provider>
    );
  }

  export default TodosContext;