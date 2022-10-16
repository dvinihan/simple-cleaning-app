import { ScrollView, StyleSheet } from "react-native";
import { Card, FAB } from "react-native-paper";
import {
  editTaskTitle,
  EDIT_ROOM_ROUTE,
  EDIT_TASK_ROUTE,
  TASKS_ROUTE,
} from "../../constants";
import { getRoomIdFromUrl } from "../../helpers/url";
import { useTasksQuery } from "../../hooks/useTasks";
import { RootStackScreenProps } from "../../types";
import { OverdueTasks } from "../OverdueTasks";
import { UpcomingTasks } from "../UpcomingTasks";

export default function TasksScreen({
  navigation,
  route,
}: RootStackScreenProps<typeof TASKS_ROUTE>) {
  const urlRoomId = getRoomIdFromUrl(route);

  const { tasks } = useTasksQuery();

  const tasksInRoom = tasks.filter((task) => task.roomId === urlRoomId);

  return (
    <>
      <ScrollView>
        <OverdueTasks roomId={urlRoomId} />
        <UpcomingTasks roomId={urlRoomId} />
        {tasksInRoom.map((task) => (
          <Card
            key={task.id}
            mode="outlined"
            onPress={() => {
              navigation.push(EDIT_TASK_ROUTE, {
                taskId: task.id,
                title: editTaskTitle,
              });
            }}
            style={styles.card}
          >
            <Card.Title title={task.name} />
          </Card>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        onPress={() => {
          navigation.push(EDIT_TASK_ROUTE, {
            title: "New Task",
            roomId: urlRoomId,
          });
        }}
        style={styles.plusFab}
      />
      <FAB
        icon="pencil"
        onPress={() => {
          navigation.push(EDIT_ROOM_ROUTE, {
            title: "Edit Room",
            roomId: urlRoomId,
          });
        }}
        style={styles.editFab}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: "10px",
    marginHorizontal: "10px",
  },
  plusFab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  editFab: {
    position: "absolute",
    margin: 16,
    right: 72,
    bottom: 0,
  },
});
