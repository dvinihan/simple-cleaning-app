import { Frequency } from "./constants";
import { Room, Task } from "./types";

export const mockRooms: Room[] = [
  {
    id: 1,
    name: "Master Bedroom",
  },
  {
    id: 2,
    name: "Master Bathroom",
  },
  {
    id: 3,
    name: "Powder Bathroom",
  },
];

export const mockTasks: Task[] = [
  {
    id: 1,
    name: "Change Sheets",
    frequencyAmount: 14,
    frequencyType: Frequency.DAYS,
    lastDone: new Date("07/01/2022"),
    roomId: 1,
  },
  {
    id: 2,
    name: "Vaccuum",
    frequencyAmount: 14,
    frequencyType: Frequency.DAYS,
    lastDone: new Date("07/08/2022"),
    roomId: 1,
  },
  {
    id: 3,
    name: "Change Towels",
    frequencyAmount: 10,
    frequencyType: Frequency.DAYS,
    lastDone: new Date("07/01/2022"),
    roomId: 2,
  },
  {
    id: 4,
    name: "Wash mirror",
    frequencyAmount: 30,
    frequencyType: Frequency.DAYS,
    lastDone: new Date("07/01/2022"),
    roomId: 2,
  },
  {
    id: 5,
    name: "Change towels",
    frequencyAmount: 21,
    frequencyType: Frequency.DAYS,
    lastDone: new Date("05/01/2022"),
    roomId: 3,
  },
];
