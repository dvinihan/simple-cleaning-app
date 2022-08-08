import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  RadioButton,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { EDIT_TASK_ROUTE, Frequency } from "../constants";
import { mockRooms, mockTasks } from "../mock-data";
import { Room, RootStackScreenProps, Task } from "../types";

export default function EditTaskScreen({
  navigation,
  route,
}: RootStackScreenProps<typeof EDIT_TASK_ROUTE>) {
  const [task, setTask] = useState<Task>(new Task({}));
  const [isRoomDialogVisible, setIsRoomDialogVisible] = useState(false);
  const [isFreqialogVisible, setIsFreqDialogVisible] = useState(false);

  useEffect(() => {
    const initialTask = mockTasks.find(
      (task) => task.id === route.params.taskId
    );
    initialTask && setTask(initialTask);
  }, []);

  const showDialog = () => setIsRoomDialogVisible(true);
  const hideDialog = () => setIsRoomDialogVisible(false);

  const onSelectRoom = (room: Room) => {
    setTask((t) => ({ ...t, roomId: room.id }));
    hideDialog();
  };

  const onSelectFrequency = (frequency: Frequency) => {
    setTask((t) => ({ ...t, frequencyType: frequency }));
  };

  const save = () => {
    // TODO dispatch POST call

    navigation.goBack();
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
      <View style={styles.frequencyRow}>
        <Text>Every</Text>
        <TextInput
          defaultValue={task.frequencyAmount?.toString()}
          keyboardType="numeric"
          onChangeText={(text) =>
            setTask((t) => ({ ...t, frequencyAmount: parseInt(text) }))
          }
        />
        <Button mode="outlined">{task.frequencyType}</Button>
      </View>

      <Button style={styles.saveButton} mode="contained" onPress={save}>
        Save
      </Button>

      <Dialog onDismiss={hideDialog} visible={isFreqialogVisible}>
        <RadioButton.Item
          key="days-radio-button"
          label={Frequency.DAYS}
          onPress={() => onSelectFrequency(Frequency.DAYS)}
          status={
            task.frequencyType === Frequency.DAYS ? "checked" : "unchecked"
          }
          value={Frequency.DAYS}
        />
        <RadioButton.Item
          key="weeks-radio-button"
          label={Frequency.WEEKS}
          onPress={() => onSelectFrequency(Frequency.WEEKS)}
          status={
            task.frequencyType === Frequency.WEEKS ? "checked" : "unchecked"
          }
          value={Frequency.WEEKS}
        />
        <RadioButton.Item
          key="months-radio-button"
          label={Frequency.MONTHS}
          onPress={() => onSelectFrequency(Frequency.MONTHS)}
          status={
            task.frequencyType === Frequency.MONTHS ? "checked" : "unchecked"
          }
          value={Frequency.MONTHS}
        />
        <RadioButton.Item
          key="years-radio-button"
          label={Frequency.YEARS}
          onPress={() => onSelectFrequency(Frequency.YEARS)}
          status={
            task.frequencyType === Frequency.YEARS ? "checked" : "unchecked"
          }
          value={Frequency.YEARS}
        />
      </Dialog>

      <Dialog onDismiss={hideDialog} visible={isRoomDialogVisible}>
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
  saveButton: {
    marginTop: "10px",
  },
  frequencyRow: {
    display: "flex",
    flexDirection: "row",
  },
});
