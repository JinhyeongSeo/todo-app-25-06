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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  const navigation = useNavigation();
  // 복잡한 구조인 경우에만 필요하다.
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>메인 화면</Text>
      <Button
        title="할일 리스트 이동"
        onPress={() => {
          // 네비게이션을 통해 Detail 화면으로 이동
          navigation.navigate("TodoList");
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

const TodoSearchScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>검색 화면</Text>
    </View>
  )
}

const TodoListScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>할일 리스트</Text>
    </View>
  )
}

const MyPageScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>내 정보</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home" 
      screenOptions={{
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
      </Stack.Navigator> */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 10,
            fontWeight: "bold",
          },
          tabBarStyle: {
            height: 60,
          },
          tabBarInactiveTintColor: "#0163d2",
          tabBarActiveTintColor: "black",
          tabBarIcon: ({color, size}) => {
            let iconName;
            
            if (route.name === "Home") {
              iconName = "home-variant";
          } else if (route.name === "TodoSearch") {
              iconName = "text-search";
          } else if (route.name === "TodoWrite") {
              iconName = "note-edit";
          } else if (route.name === "TodoList") {
              iconName = "view-list";
          } else if (route.name === "MyPage") {
              iconName = "account-circle";
          } 

          return <MaterialCommunityIcons 
          name={iconName} 
          size={size} 
          color={color} 
          />;
        },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "메인 홈",
          }}
        />
        <Tab.Screen
          name="TodoSearch"
          component={TodoSearchScreen}
          options={{
            name: "할 일 검색",
          }}
        />
        <Tab.Screen
          name="TodoWrite"
          component={TodoWriteScreen}
          options={{
            name: "할 일 작성",
          }}
        />
        <Tab.Screen
          name="TodoList"
          component={TodoListScreen}
          options={{
            name: "할 일 리스트트",
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{
            name: "내 정보보",
          }}
        />
      </Tab.Navigator>
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
