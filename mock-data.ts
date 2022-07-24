import { Room } from "./types";

export const mockRooms: Room[] = [
  {
    name: "Master Bedroom",
    tasks: [
      {
        name: "Change Sheets",
        frequencyDays: 14,
        lastDone: new Date("07/01/2022"),
      },
      {
        name: "Vaccuum",
        frequencyDays: 14,
        lastDone: new Date("07/08/2022"),
      },
    ],
  },
  {
    name: "Master Bathroom",
    tasks: [
      {
        name: "Change Towels",
        frequencyDays: 10,
        lastDone: new Date("07/01/2022"),
      },
      {
        name: "Wash mirror",
        frequencyDays: 30,
        lastDone: new Date("07/01/2022"),
      },
    ],
  },
  {
    name: "Powder Bathroom",
    tasks: [
      {
        name: "Change towels",
        frequencyDays: 21,
        lastDone: new Date("05/01/2022"),
      },
    ],
  },
];
