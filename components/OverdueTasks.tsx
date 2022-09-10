import { Frequency } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { Task } from "../types";
import { add, formatDistance, isAfter } from "date-fns";
import { Card, Headline, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const getFrequencyInDays = (
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

const getNextDueDate = (task: Task) => {
  const frequencyInDays = getFrequencyInDays(
    task.frequencyType,
    task.frequencyAmount
  );
  return add(task.lastDone, { days: frequencyInDays });
};

const getIsTaskOverdue = (task: Task) => {
  const nextDue = getNextDueDate(task);
  return isAfter(nextDue, new Date());
};

const getOverdueAmount = (task: Task) => {
  const nextDue = getNextDueDate(task);
  return formatDistance(nextDue, new Date());
};

export const OverdueTasks = () => {
  const { tasks } = useTasksQuery();

  const overdueTasks = tasks.filter(getIsTaskOverdue);

  return (
    <Card style={styles.card}>
      <Headline>Overdue tasks:</Headline>
      <ul>
        {overdueTasks.map((task) => (
          <li>
            <Text>{task.name}, </Text>
            <Text style={styles.bold}>{getOverdueAmount(task)} overdue</Text>
          </li>
        ))}
      </ul>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: "10px",
    marginHorizontal: "10px",
    padding: "10px",
    backgroundColor: "lightyellow",
  },
  overdueTask: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
});
