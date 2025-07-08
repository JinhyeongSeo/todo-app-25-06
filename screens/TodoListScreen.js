import {Text,View, StyleSheet, Pressable, Alert, Modal, TextInput} from "react-native";
import React from "react";
import TodosContext from "../components/TodosProvider"; // TodosContext를 가져옵니다.
import { ListItem, Icon } from "@rneui/base";

const TodoListScreen = ({route}) => {
    const [modalVisible, setModalVisible] = React.useState(false);
  const { todos, removeTodo } = React.useContext(TodosContext); // TodosContext에서 todos를 가져옵니다.

  const openModifyModal = (reset) => {
    reset();
    setModalVisible(true);
  }

  const closeModifyModal = () => {
    setModalVisible(false);
  }

  const handleRemoveTodo = (id, reset) => {
    Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
      {
        text: '삭제',
        onPress: () => {
          removeTodo(id)
          reset();
        },
        style: 'destructive',
      },
      {text: '취소', onPress: () => reset(), style: 'cancel',}, 
    ],
      {
        cancelable: true, // 경고창 상자 밖을 클릭하면 경고창 닫힘
        onDismiss: () => reset(), // 경고창 상자 밖을 클릭한 경우 콜백 함수 행
      });
  }

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
                onPress={() => openModifyModal(reset)}
              >
                <Icon name="update" color={"white"} />
                <Text style={styles.btnText}>수정</Text>
              </Pressable>
            )}
            rightContent={(reset) => (
              <Pressable
                style={{...styles.pressableBtn, backgroundColor: "red"}}
                onPress={() => handleRemoveTodo(todo.id,reset)}
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
       <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pressable onPress={closeModifyModal} style={styles.modalContainer}>
            <Pressable style={styles.modalBox}>
              <View style={styles.modalInner}>
                <TextInput style={styles.modifyInput} placeholder="수정할 일을 입력해주세요."></TextInput>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBox: {
    width: "80%",
    minHeight: 250,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
  },
  modifyInput: {
    padding: 10,
    fontSize: 20,
  },

});


export default TodoListScreen;