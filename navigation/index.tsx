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
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { EDIT_TASK_ROUTE, ROOMS_ROUTE, TASKS_ROUTE } from "../constants";

import RoomsScreen from "../screens/RoomsScreen";
import TasksScreen from "../screens/TasksScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator initialRouteName={ROOMS_ROUTE}>
        <Stack.Screen
          name={ROOMS_ROUTE}
          component={RoomsScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name={TASKS_ROUTE}
          component={TasksScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name={EDIT_TASK_ROUTE}
          component={TasksScreen}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
