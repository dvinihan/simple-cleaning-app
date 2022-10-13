import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";

export const getTaskIdFromUrl = (route: RouteProp<RootStackParamList>) =>
  !("taskId" in route.params) || route.params.taskId === undefined
    ? undefined
    : Number(route.params.taskId);

export const getRoomIdFromUrl = (route: RouteProp<RootStackParamList>) =>
  !("roomId" in route.params) || route.params.roomId === undefined
    ? undefined
    : Number(route.params.roomId);
