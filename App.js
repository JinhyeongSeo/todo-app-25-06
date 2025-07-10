import React from "react";
import {StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import {createStaticNavigation, NavigationContainer, useNavigation,} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tabConfig from "./configs/tabConfigs";
import {TodosProvider} from "./components/TodosProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const CustomHeader = ({ title }) => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

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
            height: "8%",
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
            options={{ 
              title: routeConfig.title,
              header: () => <CustomHeader title={routeConfig.title} />,
            }}
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
  headerBox: {
    height: height * 0.05,
    backgroundColor: "#fff",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 15,
  }
});
