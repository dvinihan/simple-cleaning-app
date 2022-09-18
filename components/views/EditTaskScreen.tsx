import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Button,
  Caption,
  Dialog,
  RadioButton,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { useQueryClient } from "react-query";
import { EDIT_TASK_ROUTE, Frequency, TASKS_QUERY_KEY } from "../../constants";
import { useRoomsQuery } from "../../hooks/useRooms";
import { useSaveTask } from "../../hooks/useSaveTask";
import { useTasksQuery } from "../../hooks/useTasks";
import { Room, RootStackScreenProps, Task } from "../../types";
import { DatePickerModal } from "react-native-paper-dates";
import { SingleChange } from "react-native-paper-dates/lib/typescript/Date/Calendar";

type TaskInputErrors = {
  name?: string;
};

export default function EditTaskScreen({
  navigation,
  route,
}: RootStackScreenProps<typeof EDIT_TASK_ROUTE>) {
  const queryClient = useQueryClient();
  const { rooms } = useRoomsQuery();
  const { tasks, nextId: nextTaskId } = useTasksQuery();
  const { mutate: saveTask } = useSaveTask({
    onSettled: () => {
      queryClient.invalidateQueries(TASKS_QUERY_KEY);
      navigation.goBack();
    },
  });

  const [task, setTask] = useState(new Task());
  const [isRoomDialogVisible, setIsRoomDialogVisible] = useState(false);
  const [isFreqDialogVisible, setIsFreqDialogVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [errors, setErrors] = useState<TaskInputErrors>({});

  useEffect(() => {
    const initialTask = tasks.find((task) => task.id === route.params.taskId);
    initialTask && setTask(initialTask);
  }, []);

  const showRoomDialog = () => setIsRoomDialogVisible(true);
  const hideRoomDialog = () => setIsRoomDialogVisible(false);
  const showFreqDialog = () => setIsFreqDialogVisible(true);
  const hideFreqDialog = () => setIsFreqDialogVisible(false);
  const showDatePicker = () => setIsDatePickerVisible(true);
  const hideDatePicker = () => setIsDatePickerVisible(false);

  const onSelectRoom = (room: Room) => {
    setTask((t) => ({ ...t, roomId: room.id }));
    hideRoomDialog();
  };

  const onSelectFrequency = (frequency: Frequency) => {
    setTask((t) => ({ ...t, frequencyType: frequency }));
    hideFreqDialog();
  };

  const onChangeDate: SingleChange = (params) => {
    const { date } = params;
    if (date) {
      setTask((t) => ({ ...t, lastDone: date }));
      hideDatePicker();
    }
  };

  const completeTask = () => {
    setTask((t) => ({ ...t, lastDone: new Date() }));
  };

  const save = () => {
    if (!task.name) {
      setErrors((e) => ({ ...e, name: "You must enter a task name" }));
    } else {
      saveTask({ ...task, id: route.params.taskId ?? nextTaskId });
    }
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
      {errors.name && <Caption style={styles.error}>{errors.name}</Caption>}
      <Pressable onPress={showRoomDialog}>
        <Surface style={styles.room}>
          <Text style={styles.roomName}>Room: {roomName}</Text>
        </Surface>
      </Pressable>
      <View style={styles.frequencyRow}>
        <Text>Every</Text>
        <TextInput
          value={task.frequencyAmount?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            const newAmount = text ? parseInt(text) : 0;
            setTask((t) => ({ ...t, frequencyAmount: newAmount }));
          }}
        />
        <Button onPress={showFreqDialog} mode="outlined">
          {task.frequencyType}
        </Button>
      </View>
      <Pressable onPress={showDatePicker}>
        <Surface style={styles.room}>
          <Text style={styles.roomName}>
            Last completed: {task.lastDone.toDateString()}
          </Text>
        </Surface>
      </Pressable>
      <Button
        color="green"
        onPress={completeTask}
        style={styles.saveButton}
        mode="contained"
      >
        Just did it!
      </Button>

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

      <DatePickerModal
        locale="en"
        mode="single"
        visible={isDatePickerVisible}
        onDismiss={hideDatePicker}
        date={task.lastDone}
        onConfirm={onChangeDate}
      />
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
  error: {
    marginHorizontal: "10px",
    color: "red",
    fontSize: 18,
  },
});
