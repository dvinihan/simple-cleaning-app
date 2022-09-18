/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  EDIT_ROOM_ROUTE,
  EDIT_TASK_ROUTE,
  Frequency,
  ROOMS_ROUTE,
  TASKS_ROUTE,
} from "./constants";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type ScreenParams = {
  title?: string;
};

export type RootStackParamList = {
  [ROOMS_ROUTE]: ScreenParams;
  [TASKS_ROUTE]: ScreenParams & { roomId: number };
  [EDIT_TASK_ROUTE]: ScreenParams & { taskId?: number; roomId?: number };
  [EDIT_ROOM_ROUTE]: ScreenParams & { roomId?: number };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export class Room {
  id: number;
  name: string;

  constructor(props?: Room) {
    this.id = props?.id ?? -1;
    this.name = props?.name ?? "";
  }
}

export class Task {
  id: number;
  frequencyAmount: number;
  frequencyType: Frequency;
  lastDone: Date;
  name: string;
  roomId: number;

  constructor(props?: Task) {
    this.id = props?.id ?? -1;
    this.frequencyAmount = props?.frequencyAmount ?? 0;
    this.frequencyType = props?.frequencyType ?? Frequency.DAYS;
    this.lastDone = props?.lastDone ? new Date(props.lastDone) : new Date();
    this.name = props?.name ?? "";
    this.roomId = props?.roomId ?? -1;
  }
}
