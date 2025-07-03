import React from "react";
import { StatusBar } from "expo-status-bar";
import {StyleSheet,} from "react-native";
import {createStaticNavigation, NavigationContainer, useNavigation,} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tabConfig from "./configs/tabConfigs";
import {TodosProvider} from "./components/TodosProvider";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({focused, color, size}) => {
      const routeConfig = tabConfig.find((config) => config.name === route.name);

      const iconName = focused ? routeConfig.focusedIcon : routeConfig.unfocusedIcon;
      const IconComponet = routeConfig.iconComponet;

      return <IconComponet name={iconName} size={size} color={color} />;
    },
    headerTitleAlign: "center",
    headerTItleStyle: {
      fontSize: 23,
      fontWeight: "bold",
    },
    headerStyle: {
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
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
  })

  return (
    <TodosProvider>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={screenOptions}
      >
        {tabConfig.map((routeConfig) => (
          <Tab.Screen
            key={routeConfig.name}
            name={routeConfig.name}
            component={routeConfig.component}
            options={{ title: routeConfig.title }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
    </TodosProvider>
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
