import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { CustomNavigationBar } from "./CustomNavigationBar";
import { EDIT_ROOM_ROUTE, EDIT_TASK_ROUTE, ROOMS_ROUTE } from "../constants";
import EditTaskScreen from "./views/EditTaskScreen";

import RoomsScreen from "./views/RoomsScreen";
import TasksScreen from "./views/TasksScreen";
import { RootStackParamList } from "../types";
import EditRoomScreen from "./views/EditRoomScreen";

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
        <Stack.Screen name={EDIT_ROOM_ROUTE} component={EditRoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
