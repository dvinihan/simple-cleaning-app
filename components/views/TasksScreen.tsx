import { StyleSheet } from "react-native";
import { Card, FAB } from "react-native-paper";
import { EDIT_TASK_ROUTE, TASKS_ROUTE } from "../../constants";
import { useTasksQuery } from "../../hooks/useTasks";
import { RootStackScreenProps } from "../../types";

export default function TasksScreen({
  navigation,
  route,
}: RootStackScreenProps<typeof TASKS_ROUTE>) {
  const { tasks } = useTasksQuery();

  const tasksInRoom = tasks.filter(
    (task) => task.roomId === route.params.roomId
  );

  return (
    <>
      {tasksInRoom.map((task) => (
        <Card
          key={task.id}
          mode="outlined"
          onPress={() => {
            navigation.push(EDIT_TASK_ROUTE, {
              taskId: task.id,
              title: task.name,
            });
          }}
          style={styles.card}
        >
          <Card.Title title={task.name} />
        </Card>
      ))}
      <FAB
        icon="plus"
        onPress={() => {
          navigation.push(EDIT_TASK_ROUTE, { title: "New Task" });
        }}
        style={styles.fab}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: "10px",
    marginHorizontal: "10px",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
