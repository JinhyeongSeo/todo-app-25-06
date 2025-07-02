import {Text,View, TextInput, Pressable, StyleSheet} from "react-native";
import React, { useState } from "react";

const TodoWriteScreen = ({ navigation, route }) => {
  const [todo, setTodo] = useState("");

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
        onPress={() => {
          navigation.navigate("TodoList", { todo });
          setTodo(""); // 입력 필드 초기화
        }}
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