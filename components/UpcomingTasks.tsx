import { editTaskTitle, EDIT_TASK_ROUTE } from "../constants";
import { useTasksQuery } from "../hooks/useTasks";
import { TaskWithDaysUntilDue } from "../types";
import { Card, Headline, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useRoomsQuery } from "../hooks/useRooms";
import { Link } from "@react-navigation/native";
import { getDaysUntilDue, getFrequencyInDays } from "../helpers/tasks";
import { formatDuration } from "date-fns";

type Props = {
  roomId?: number;
};

export const UpcomingTasks = ({ roomId }: Props) => {
  const { tasks } = useTasksQuery();
  const { rooms } = useRoomsQuery();

  const taskWithDaysToGo: TaskWithDaysUntilDue[] = tasks
    .filter((t) => (roomId === undefined ? true : t.roomId === roomId))
    .map((t) => ({
      ...t,
      daysUntilDue: getDaysUntilDue(t),
    }));

  const isTaskDueSoon = (t: TaskWithDaysUntilDue) =>
    t.daysUntilDue > 0 &&
    t.daysUntilDue <
      getFrequencyInDays(t.frequencyType, t.frequencyAmount) * 0.1;
  const hasDueSoonTasks = taskWithDaysToGo.some(isTaskDueSoon);
  const dueSoonTasks = taskWithDaysToGo
    .filter(isTaskDueSoon)
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue);

  return hasDueSoonTasks ? (
    <Card style={styles.container}>
      <Headline>Upcoming tasks:</Headline>
      {dueSoonTasks.map((task) => {
        const room = rooms.find((r) => r.id === task.roomId);
        return (
          <Card key={task.id} style={styles.task}>
            <Link
              to={`/${EDIT_TASK_ROUTE}?taskId=${task.id}&title=${editTaskTitle}`}
            >
              <Text style={styles.bold}>{task.name}</Text>
              <Text> in </Text>
              <Text style={styles.bold}>{room?.name}, </Text>
              <Text>due in {formatDuration({ days: task.daysUntilDue })}</Text>
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
  bold: {
    fontWeight: "bold",
  },
});
