import {Text,View, TextInput, Pressable, StyleSheet} from "react-native";
import React, { useState } from "react";

function dateToStr(date) {
  const pad = (n) => {
    return n < 10 ? `0${n}` : n;
  };

  return (
    date.getFullYear() +
    "-" + pad(date.getMonth() + 1) +
    "-" + pad(date.getDate()) +
    " " + pad(date.getHours()) + 
    ":" + pad(date.getMinutes()) +
    ":" + pad(date.getSeconds()
    )
  )
}

const useTodoState = () => {
  const [todos, setTodos] = useState([]);
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

  return {addTodo};
}

const TodoWriteScreen = ({ navigation, route }) => {
  const [todo, setTodo] = useState("");

  const {addTodo} = useTodoState();

  const handleAddTodo = () => {
    if (!todo.trim()) {
      // 입력이 비어있거나 공백만 있는 경우
      alert("할 일을 입력해주세요.");
      return;
    }

    addTodo(todo);
    navigation.navigate("TodoList", { todo });
    setTodo(""); // 입력 필드 초기화

  }

  return (
    <>
      <TextInput
        multiline
        onChangeText={setTodo}
        value={todo}
        placeholder="할 일을 작성해주세요."
        style={styles.inputBox}
      />
      <View style={{ 
        flexDirection: "row", 
        gap: 5, 
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,}}>
        <Pressable
        style={styles.PressableBtn}
        onPress={handleAddTodo}
      >
        <Text style={styles.text}>작성</Text>
      </Pressable>
      <Pressable
        style={styles.PressableBtn}
        onPress={() => {
          navigation.navigate("Home");
          setTodo(""); // 입력 필드 초기화
        }}
      >
        <Text style={styles.text}>취소</Text>
      </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    inputBox: {
        minHeight: 200,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 2,
        margin: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
    PressableBtn: {
        width: "50%",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 2,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default TodoWriteScreen;