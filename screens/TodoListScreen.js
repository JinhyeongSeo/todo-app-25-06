import {Text,View, StyleSheet, Pressable} from "react-native";
import React from "react";
import TodosContext from "../components/TodosProvider"; // TodosContext를 가져옵니다.
import { ListItem, Icon} from "@rneui/base";

const TodoListScreen = ({route}) => {
  const { todos } = React.useContext(TodosContext); // TodosContext에서 todos를 가져옵니다.

  return (
    <View style={styles.todoListContainer}>
      {todos.length > 0? (
        todos.map((todo) => (
        <View key={todo.id} style={{marginTop: 5}}>
          <ListItem.Swipeable
            style={styles.listBox}
            leftContent={(reset) => (
              <Pressable
                style={{...styles.pressableBtn, backgroundColor: "blue"}}
                onPress={() => reset()}
              >
                <Icon name="update" color={"white"} />
                <Text style={styles.btnText}>수정</Text>
              </Pressable>
            )}
            rightContent={(reset) => (
              <Pressable
                style={{...styles.pressableBtn, backgroundColor: "red"}}
                onPress={() => reset()}
              >
                <Icon name="delete" color={"white"} />
                <Text style={styles.btnText}>삭제</Text>
              </Pressable>
            )}
          >
            <ListItem.Content>
              <ListItem.Title>번호: {todo.id}</ListItem.Title>
              <ListItem.Subtitle>작성날짜: {todo.regDate}</ListItem.Subtitle>
              <ListItem.Subtitle>할 일: {todo.content}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem.Swipeable>
        </View>
      ))
      ) : (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{fontSize: 20, fontWeight: "bold"}}>
            할 일이 없습니다.
            </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  listBox: {
    borderWidth: 2,
    },
  pressableBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  }
});


export default TodoListScreen;