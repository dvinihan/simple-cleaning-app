import { StyleSheet } from "react-native";
import { TaskInputContainer } from "../components/inputs/TaskInputContainer";
import { EDIT_TASK_ROUTE } from "../constants";
import { mockTasks } from "../mock-data";
import { RootStackScreenProps } from "../types";

export default function EditTaskScreen({
  navigation,
  route,
}: RootStackScreenProps<typeof EDIT_TASK_ROUTE>) {
  const task = mockTasks.find((task) => task.id === route.params.taskId);
  console.log(route.params);
  console.log(task);

  return task ? <TaskInputContainer initialTask={task} /> : null;
}
