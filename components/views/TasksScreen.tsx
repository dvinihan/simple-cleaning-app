import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { EDIT_TASK_ROUTE, TASKS_ROUTE } from "../../constants";
import { useTasksQuery } from "../../hooks/useTasks";
import { RootStackScreenProps } from "../../types";

export default function TasksScreen({
  navigation,
}: RootStackScreenProps<typeof TASKS_ROUTE>) {
  const { data } = useTasksQuery();

  return (
    <>
      {data.map((task) => (
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
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: "10px",
    marginHorizontal: "10px",
  },
});
