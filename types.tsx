/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Frequency } from "./constants";

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
  frequencyAmount: number;
  frequencyType: Frequency;
  lastDone: Date;
  name: string;
  roomId: number;

  constructor({ props }: { props?: Task }) {
    this.id = props?.id || 0;
    this.frequencyAmount = props?.frequencyAmount || 0;
    this.frequencyType = props?.frequencyType || Frequency.DAYS;
    this.lastDone = props?.lastDone || new Date();
    this.name = props?.name || "";
    this.roomId = props?.roomId || 0;
  }
}
