import {
  Text,
  View, 
  StyleSheet, 
  Pressable, 
  Alert, 
  Modal, 
  TextInput, 
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView
} from "react-native";
import React from "react";
import TodosContext from "../components/TodosProvider"; // TodosContext를 가져옵니다.
import { ListItem, Icon } from "@rneui/base";
import AppLoadingContext from "../components/AppLoadingProvider";

const {width, height} = Dimensions.get("window");

const TodoModifyModal = ({ 
  modalVisible, 
  setModalVisible, 
  onModifyTodo, 
  closeModal, 
  modifiedContent,
  setModifiedContent
}) => {
  return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          setModalVisible(!modalVisible);
          }}>
          <Pressable onPress={closeModal} style={styles.modalContainer}>
            <Pressable style={styles.modalBox}>
              <ScrollView style={styles.modalInner}>
                <TextInput 
                    multiline
                    maxLength={100}
                    style={styles.modifyInput} 
                    placeholder="수정할 일을 입력해주세요."
                    value={modifiedContent}
                    onChangeText={setModifiedContent}
                  />
                </ScrollView>
                <View style={styles.modalBtnBox}>
                  <TouchableOpacity onPress={onModifyTodo}>
                    <Text style={styles.modalBtnText}>수정</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={closeModal}>
                    <Text style={styles.modalBtnText}>취소</Text>
                  </TouchableOpacity>
                </View>
            </Pressable>
          </Pressable>
        </Modal>
  )
}

const TodoListItem = ({ todo, onModifyTodo, onRemoveTodo }) => {
  const [isExpanded, setIsExpanded] = React.useState(false); // 내용 확장 상태 관리
  const { fontsLoaded } = React.useContext(TodosContext);

  const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    }

  return (
      <View 
        style={{
          marginVertical: 5, //margin y축
          marginHorizontal: 10, //margin x축
          borderWidth: 2, 
          borderRadius: 10, 
          overflow: "hidden",
          }}>
          <ListItem.Swipeable
            bottomDivider
            style={styles.listBox}
            leftContent={(reset) => (
              <Pressable
                style={{...styles.pressableBtn, backgroundColor: "blue"}}
                onPress={() => onModifyTodo(todo,reset)}
              >
                <Icon name="update" color={"white"} />
                <Text style={styles.btnText}>수정</Text>
              </Pressable>
            )}
            rightContent={(reset) => (
              <Pressable
                style={{...styles.pressableBtn, backgroundColor: "red"}}
                onPress={() => onRemoveTodo(todo.id,reset)}
              >
                <Icon name="delete" color={"white"} />
                <Text style={styles.btnText}>삭제</Text>
              </Pressable>
            )}
          >
            <ListItem.Content>
              <ListItem.Title>번호: {todo.id}</ListItem.Title>
              <Text>작성날짜: {todo.regDate}</Text>
              <Pressable onPress={toggleExpand} style={styles.contentBox}>
                <Text numberOfLines={isExpanded ? null : 2} ellipsizeMode="tail">
                  할 일: {todo.content}
                  </Text>
              </Pressable>
            </ListItem.Content>
          </ListItem.Swipeable>
        </View>
  );
}

const TodoListScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { todos, removeTodo, modifyTodo } = React.useContext(TodosContext); // TodosContext에서 todos를 가져옵니다.
  const [selectedTodo, setSelectedTodo] = React.useState(null); // 선택된 todo를 저장합니다.
  const [modifiedContent, setModifiedContent] = React.useState("");


  const openModifyModal = (todo, reset) => {
    setSelectedTodo(todo); // 선택된 todo를 설정합니다.
    setModifiedContent(todo.content); // 수정할 내용을 설정합니다.
    reset();
    setModalVisible(true);
  }

  const handleModifyTodo = () => {
    if (selectedTodo) {
      modifyTodo(selectedTodo.id, modifiedContent); // 선택된 todo의 내용을 수정합니다.
    }
    setModalVisible(false);
  }

  const closeModal = () => {
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
        <FlatList
          data={todos}
          renderItem={({item}) => (
            <TodoListItem 
              todo={item} 
              onModifyTodo={openModifyModal} 
              onRemoveTodo={handleRemoveTodo} 
            />
          )}
            keyExtractor={item => item.id.toString()}
          />
      ) : (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{fontSize: 20, fontWeight: "bold"}}>
            할 일이 없습니다.
            </Text>
        </View>
      )}
      <TodoModifyModal 
        modalVisible = {modalVisible} 
        setModalVisible={setModalVisible} 
        onModifyTodo={handleModifyTodo} 
        closeModal={closeModal} 
        modifiedContent={modifiedContent}
        setModifiedContent={setModifiedContent}/>
    </View>
  )
}

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
    flex: 0.4,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 3,
  },
  modifyInput: {
    padding: 10,
    fontSize: 20,
    fontFamily: "gmarket-font",
  },
  modalInner: {
  },
  modalBtnBox: {
    paddingVertical: 20,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingRight: 20,
  },
  modalBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "gmarket-font",
  }
});


export default TodoListScreen;
