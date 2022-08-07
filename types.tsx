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

export type ScreenParams = {
  title?: string;
};

export type RootStackParamList = {
  Rooms: ScreenParams;
  Tasks: ScreenParams & { roomId: number };
  EditTask: ScreenParams & { taskId: number };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type Room = {
  id: number;
  name: string;
};

export class Task {
  id: number;
  frequencyDays: number;
  lastDone: Date;
  name: string;
  roomId: number;

  constructor({ props }: { props?: Task }) {
    this.id = props?.id || 0;
    this.frequencyDays = props?.frequencyDays || 0;
    this.lastDone = props?.lastDone || new Date();
    this.name = props?.name || "";
    this.roomId = props?.roomId || 0;
  }
}
