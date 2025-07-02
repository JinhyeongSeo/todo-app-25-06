import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import TodoSearchScreen from "../screens/TodoSearchScreen";
import TodoWriteScreen from "../screens/TodoWriteScreen";
import TodoListScreen from "../screens/TodoListScreen";
import MyPageScreen from "../screens/MyPageScreen";

const tabConfig = [
    {
      name: "Home",
      title: "메인 홈",
      component: HomeScreen,
      focusedIcon: "home-variant",
      unfocusedIcon: "home-variant-outline",
      iconComponet: MaterialCommunityIcons,
    },
    {
      name: "TodoSearch",
      title: "할 일 검색",
      component: TodoSearchScreen,
      focusedIcon: "search-sharp",
      unfocusedIcon: "search-outline",
      iconComponet: Ionicons,
    },
    {
      name: "TodoWrite",
      title: "할 일 작성",
      component: TodoWriteScreen,
      focusedIcon: "application-edit",
      unfocusedIcon: "application-edit-outline",
      iconComponet: MaterialCommunityIcons,
    },
    {
      name: "TodoList",
      title: "할 일 리스트",
      component: TodoListScreen,
      focusedIcon: "list-sharp",
      unfocusedIcon: "list-outline",
      iconComponet: Ionicons,
    },
    {
      name: "MyPage",
      title: "내 정보",
      component: MyPageScreen,
      focusedIcon: "person-circle-sharp",
      unfocusedIcon: "person-circle-outline",
      iconComponet: Ionicons,
    },
  ]

export default tabConfig;