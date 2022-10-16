import { Frequency } from "../constants";
import { Task } from "../types";
import { add, differenceInDays } from "date-fns";

export const getFrequencyInDays = (
  frequencyType: Frequency,
  frequencyAmount: number
) => {
  switch (frequencyType) {
    case Frequency.DAYS: {
      return frequencyAmount;
    }
    case Frequency.WEEKS: {
      return frequencyAmount * 7;
    }
    case Frequency.MONTHS: {
      return frequencyAmount * 31;
    }
    case Frequency.YEARS: {
      return frequencyAmount * 365;
    }
  }
};

export const getNextDueDate = (task: Task) => {
  const frequencyInDays = getFrequencyInDays(
    task.frequencyType,
    task.frequencyAmount
  );
  return add(task.lastDone, { days: frequencyInDays });
};

export const getDaysUntilDue = (task: Task) => {
  const nextDue = getNextDueDate(task);
  // could also use differenceInCalendarDays: https://date-fns.org/v2.29.3/docs/differenceInCalendarDays
  return differenceInDays(nextDue, new Date());
};
