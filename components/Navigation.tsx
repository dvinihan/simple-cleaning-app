import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { CustomNavigationBar } from "./CustomNavigationBar";
import { EDIT_TASK_ROUTE, ROOMS_ROUTE } from "../constants";
import EditTaskScreen from "../screens/EditTaskScreen";

import RoomsScreen from "../screens/RoomsScreen";
import TasksScreen from "../screens/TasksScreen";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROOMS_ROUTE}
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        <Stack.Screen name={ROOMS_ROUTE} component={RoomsScreen} />
        <Stack.Screen name={"Tasks"} component={TasksScreen} />
        <Stack.Screen name={EDIT_TASK_ROUTE} component={EditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
