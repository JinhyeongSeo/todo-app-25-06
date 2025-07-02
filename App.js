import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  route,
} from "react-native";
import {
  createStaticNavigation,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeScreen = () => {
  const navigation = useNavigation();
  // 복잡한 구조인 경우에만 필요하다.
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>메인 화면</Text>
      <Button
        title="상세 화면으로 이동"
        onPress={() => {
          // 네비게이션을 통해 Detail 화면으로 이동
          navigation.navigate("Detail");
        }}
      />
      <Button
        title="할 일 작성"
        onPress={() => {
          // 네비게이션을 통해 Detail 화면으로 이동
          navigation.navigate("TodoWrite");
        }}
      />
    </View>
  );
};

const TodoWriteScreen = ({ navigation, route }) => {
  const [todo, setTodo] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        onChangeText={setTodo}
        value={todo}
        placeholder="할 일을 작성해주세요."
        style={{
          flex: 0.3,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          borderWidth: 2,
          margin: 10,
        }}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("Detail", { todo });
          setTodo(""); // 입력 필드 초기화
        }}
      >
        <Text
          style={{
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            borderWidth: 2,
            width: "30%",
            textAlign: "center",
            fontWeight: "bold",
            margin: 10,
          }}
        >
          {" "}
          작성
        </Text>
      </Pressable>
    </>
  );
};

const DetailScreen = ({ navigation, route }) => {
  const todo = route?.params?.todo ?? "(내용 없음)";

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>상세 화면</Text>
      <Text> 작성 내용: {todo}</Text>
      <Button
        title="홈으로 이동"
        onPress={() => {
          // 네비게이션을 통해 Detail 화면으로 이동
          navigation.navigate("Home");
        }}
      />
      <Button
        title="상세 페이지로 이동"
        onPress={() => {
          navigation.navigate("Detail");
        }}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: { 
              fontWeight: "bold" 
            },}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "메인 홈",
            headerRight: () => (
              <Pressable onPress={() => alert("클릭됨!!")}>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Menu</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen name="TodoWrite" component={TodoWriteScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
