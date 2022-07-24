/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Rooms: undefined;
  Tasks: { tasks: Task[] };
  EditTask: { task: Task };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type Room = {
  name: string;
  tasks: Task[];
};

export type Task = {
  frequencyDays: number;
  lastDone: Date;
  name: string;
};
