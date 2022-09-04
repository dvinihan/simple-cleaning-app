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
import { EDIT_TASK_ROUTE, Frequency } from "../../constants";
import { useRoomsQuery } from "../../hooks/useRooms";
import { useSaveTask } from "../../hooks/useSaveTask";
import { useTasksQuery } from "../../hooks/useTasks";
import { Room, RootStackScreenProps, Task } from "../../types";

export default function EditTaskScreen({
  navigation,
  route,
}: RootStackScreenProps<typeof EDIT_TASK_ROUTE>) {
  const [task, setTask] = useState<Task>(new Task());
  const [isRoomDialogVisible, setIsRoomDialogVisible] = useState(false);
  const [isFreqDialogVisible, setIsFreqDialogVisible] = useState(false);

  useEffect(() => {
    const initialTask = tasks.find((task) => task.id === route.params.taskId);
    initialTask && setTask(initialTask);
  }, []);

  const { mutate: saveTask } = useSaveTask();

  const { data: rooms } = useRoomsQuery();
  const { data: tasks } = useTasksQuery();

  const showRoomDialog = () => setIsRoomDialogVisible(true);
  const hideRoomDialog = () => setIsRoomDialogVisible(false);
  const showFreqDialog = () => setIsFreqDialogVisible(true);
  const hideFreqDialog = () => setIsFreqDialogVisible(false);

  const onSelectRoom = (room: Room) => {
    setTask((t) => ({ ...t, roomId: room.id }));
    hideRoomDialog();
  };

  const onSelectFrequency = (frequency: Frequency) => {
    setTask((t) => ({ ...t, frequencyType: frequency }));
    hideFreqDialog();
  };

  const save = () => {
    saveTask(task);
    navigation.goBack();
  };

  const roomName = rooms.find((room) => room.id === task.roomId)?.name ?? "";

  return (
    <>
      <TextInput
        label="Name"
        value={task?.name}
        onChangeText={(text) => setTask({ ...task, name: text })}
        style={styles.textInput}
      />
      <Pressable onPress={showRoomDialog}>
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
        <Button onPress={showFreqDialog} mode="outlined">
          {task.frequencyType}
        </Button>
      </View>

      <Button style={styles.saveButton} mode="contained" onPress={save}>
        Save
      </Button>

      <Dialog onDismiss={hideFreqDialog} visible={isFreqDialogVisible}>
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

      <Dialog onDismiss={hideRoomDialog} visible={isRoomDialogVisible}>
        <Dialog.Content>
          {rooms.map((room) => {
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
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: "10px",
  },
});
