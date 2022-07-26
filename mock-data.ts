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
    frequencyDays: 14,
    lastDone: new Date("07/01/2022"),
    roomId: 1,
  },
  {
    id: 2,
    name: "Vaccuum",
    frequencyDays: 14,
    lastDone: new Date("07/08/2022"),
    roomId: 1,
  },
  {
    id: 3,
    name: "Change Towels",
    frequencyDays: 10,
    lastDone: new Date("07/01/2022"),
    roomId: 2,
  },
  {
    id: 4,
    name: "Wash mirror",
    frequencyDays: 30,
    lastDone: new Date("07/01/2022"),
    roomId: 2,
  },
  {
    id: 5,
    name: "Change towels",
    frequencyDays: 21,
    lastDone: new Date("05/01/2022"),
    roomId: 3,
  },
];
