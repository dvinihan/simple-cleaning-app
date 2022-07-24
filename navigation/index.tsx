/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createURL } from "expo-linking";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { EDIT_TASK_ROUTE, ROOMS_ROUTE, TASKS_ROUTE } from "../constants";
import EditTaskScreen from "../screens/EditTaskScreen";

import RoomsScreen from "../screens/RoomsScreen";
import TasksScreen from "../screens/TasksScreen";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      // linking={{
      //   prefixes: [createURL("/")],
      //   config: {
      //     screens: {
      //       Rooms: ROOMS_ROUTE,
      //       Tasks: TASKS_ROUTE,
      //       EditTask: EDIT_TASK_ROUTE,
      //     },
      //   },
      // }}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator initialRouteName={ROOMS_ROUTE}>
        <Stack.Screen
          name={ROOMS_ROUTE}
          component={RoomsScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Tasks"}
          component={TasksScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name={EDIT_TASK_ROUTE}
          component={EditTaskScreen}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
