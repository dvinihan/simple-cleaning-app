import { FlatList, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { EDIT_TASK_ROUTE, TASKS_ROUTE } from "../constants";
import { mockTasks } from "../mock-data";
import { RootStackScreenProps } from "../types";

export default function TasksScreen({
  navigation,
  route,
}: RootStackScreenProps<typeof TASKS_ROUTE>) {
  const tasks = mockTasks.filter((task) => task.roomId === route.params.roomId);
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item: task }) => {
          return (
            <Pressable
              key={`task-${task.id}`}
              onPress={(e) => {
                navigation.push(EDIT_TASK_ROUTE, {
                  taskId: task.id,
                });
              }}
            >
              <View style={styles.task}>
                <Text style={styles.taskName}>{task.name}</Text>
              </View>
            </Pressable>
          );
        }}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { width: "80%" },
  task: {
    borderColor: "black",
    borderWidth: 1,
    height: "70px",
    justifyContent: "center",
    padding: "8px",
    margin: "8px",
  },
  taskName: {
    fontSize: 30,
  },
});
