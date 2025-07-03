import React from "react";
import { dateToStr } from "../utils/util";

const TodosContext = React.createContext();

export const TodosProvider = ({children}) => {
    const testTodo = [
        {
            id: 1,
            content: "테니스 치기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 2,
            content: "리액트 네이티브 공부하기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 3,
            content: "할 일 앱 구현하기",
            regDate: dateToStr(new Date()),
        },
    ]

    const [todos, setTodos] = React.useState([...testTodo]);
    const lastTodoIdRef = React.useRef(testTodo.length);

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

    return (
        <TodosContext.Provider value={{ todos, addTodo, removeTodo }}>
        {children}
        </TodosContext.Provider>
    );
    }

export default TodosContext;