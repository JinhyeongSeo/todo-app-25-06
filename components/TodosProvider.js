import React from "react";
import { dateToStr } from "../utils/util";
import testTodosData from "./TextTodosData"; // 테스트용 할 일 데이터

const TodosContext = React.createContext();

export const TodosProvider = ({children}) => {
    

    const [todos, setTodos] = React.useState([...testTodosData]);
    const lastTodoIdRef = React.useRef(testTodosData.length);

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

    const removeTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id != id);
        setTodos(newTodos);
    };

    const modifyTodo = (id, newContent) => {
        const newTodos = todos.map((todo) => todo.id === id ? {...todo, content: newContent} : todo);
        
        setTodos(newTodos);
    };

    return (
        <TodosContext.Provider value={{ todos, addTodo, removeTodo, modifyTodo }}>
        {children}
        </TodosContext.Provider>
    );
    }

export default TodosContext;