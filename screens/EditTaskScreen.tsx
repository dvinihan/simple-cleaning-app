import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  RadioButton,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { EDIT_TASK_ROUTE } from "../constants";
import { mockRooms, mockTasks } from "../mock-data";
import { Room, RootStackScreenProps, Task } from "../types";

export default function EditTaskScreen({
  navigation,
  route,
}: RootStackScreenProps<typeof EDIT_TASK_ROUTE>) {
  const [task, setTask] = useState<Task>(new Task({}));
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const initialTask = mockTasks.find(
      (task) => task.id === route.params.taskId
    );
    initialTask && setTask(initialTask);
  }, []);

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => setIsDialogVisible(false);

  const onSelectRoom = (room: Room) => {
    setTask({ ...task, roomId: room.id });
    hideDialog();
  };

  const roomName =
    mockRooms.find((room) => room.id === task.roomId)?.name ?? "";

  return (
    <>
      <TextInput
        label="Name"
        value={task?.name}
        onChangeText={(text) => setTask({ ...task, name: text })}
        style={styles.textInput}
      />
      <Pressable onPress={showDialog}>
        <Surface style={styles.room}>
          <Text style={styles.roomName}>Room: {roomName}</Text>
        </Surface>
      </Pressable>
      <Dialog onDismiss={hideDialog} visible={isDialogVisible}>
        <Dialog.Content>
          {mockRooms.map((room) => {
            return (
              <RadioButton.Item
                key={room.id}
                label={room.name}
                onPress={() => onSelectRoom(room)}
                status={task.roomId === room.id ? "checked" : "unchecked"}
                value={room.name}
              />
            );
          })}
        </Dialog.Content>
      </Dialog>
    </>
  );
}

const styles = StyleSheet.create({
  room: {
    alignItems: "center",
    paddingVertical: "10px",
  },
  roomName: {
    fontSize: 18,
  },
  textInput: {
    marginBottom: "10px",
  },
});
