import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { CustomNavigationBar } from "./CustomNavigationBar";
import {
  EDIT_ROOM_ROUTE,
  EDIT_TASK_ROUTE,
  ROOMS_ROUTE,
  TASKS_ROUTE,
} from "../constants";
import EditTaskScreen from "./views/EditTaskScreen";
import RoomsScreen from "./views/RoomsScreen";
import TasksScreen from "./views/TasksScreen";
import { RootStackParamList } from "../types";
import EditRoomScreen from "./views/EditRoomScreen";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator<RootStackParamList>();
const prefix = Linking.createURL("/");

const config = {
  screens: {
    [ROOMS_ROUTE]: "",
    [TASKS_ROUTE]: TASKS_ROUTE,
    [EDIT_TASK_ROUTE]: EDIT_TASK_ROUTE,
    [EDIT_ROOM_ROUTE]: EDIT_ROOM_ROUTE,
  },
};

const linking = {
  prefixes: [prefix],
  config,
};

export default function Navigation() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        <Stack.Screen
          name={ROOMS_ROUTE}
          component={RoomsScreen}
          options={{ title: "Simple Cleaning App" }}
        />
        <Stack.Screen name={TASKS_ROUTE} component={TasksScreen} />
        <Stack.Screen name={EDIT_TASK_ROUTE} component={EditTaskScreen} />
        <Stack.Screen name={EDIT_ROOM_ROUTE} component={EditRoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
