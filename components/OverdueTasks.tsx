import { editTaskTitle, EDIT_TASK_ROUTE, Frequency } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { Task } from "../types";
import { add, differenceInDays, formatDuration } from "date-fns";
import { Card, Headline, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useRoomsQuery } from "../hooks/useRooms";
import { Link } from "@react-navigation/native";

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

const getOverdueDays = (task: Task) => {
  const nextDue = getNextDueDate(task);
  // coudl also use differenceInCalendarDays: https://date-fns.org/v2.29.3/docs/differenceInCalendarDays
  return differenceInDays(new Date(), nextDue);
};

const getOverdueAmount = (task: Task) => {
  const overdueDays = getOverdueDays(task);
  return formatDuration({ days: overdueDays });
};

type TaskWithOverdueness = Task & { daysOverdue: number };

export const OverdueTasks = () => {
  const { tasks } = useTasksQuery();
  const { rooms } = useRoomsQuery();

  const tasksWithOverdueness: TaskWithOverdueness[] = tasks.map((t) => ({
    ...t,
    daysOverdue: getOverdueDays(t),
  }));

  const isTaskOverdue = (t: TaskWithOverdueness) => t.daysOverdue > 0;
  const hasOverdueTasks = tasksWithOverdueness.some(isTaskOverdue);
  const overdueTasks = tasksWithOverdueness.filter(isTaskOverdue);

  return hasOverdueTasks ? (
    <Card style={styles.container}>
      <Headline>Overdue tasks:</Headline>
      {overdueTasks.map((task) => {
        const room = rooms.find((r) => r.id === task.roomId);
        return (
          <Card key={task.id} style={styles.task}>
            <Link
              to={`/${EDIT_TASK_ROUTE}?taskId=${task.id}&title=${editTaskTitle}`}
            >
              <Text style={styles.bold}>
                {task.name} in {room?.name},{" "}
              </Text>
              <Text style={styles.red}>{getOverdueAmount(task)} overdue</Text>
            </Link>
          </Card>
        );
      })}
    </Card>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    marginTop: "10px",
    marginHorizontal: "10px",
    padding: "10px",
    backgroundColor: "lightyellow",
  },
  task: {
    padding: "6px",
    marginVertical: "6px",
  },
  red: {
    color: "red",
  },
  bold: {
    fontWeight: "bold",
  },
});
