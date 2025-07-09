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
        {
            id: 4,
            content: "운동하기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 5,
            content: "영화 보기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 6,
            content: "책 읽기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 7,
            content: "요리하기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 8,
            content: "산책하기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 9,
            content: "음악 감상하기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 10,
            content: "친구 만나기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 11,
            content: "여행 계획 세우기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 12,
            content: "새로운 취미 시작하기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 13,
            content: "자기 계발하기",
            regDate: dateToStr(new Date()),
        },
        {
            id: 14,
            content: "정리 정돈하기",
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