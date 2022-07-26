import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Room, Task } from "../../types";
import SelectDropdown from "react-native-select-dropdown";
import { mockRooms } from "../../mock-data";

type Props = {
  initialTask: Task;
};

export const TaskInputContainer = ({ initialTask }: Props) => {
  const [task, setTask] = useState<Task>(initialTask);

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput
        onChangeText={(text) => setTask({ ...task, name: text })}
        value={task.name}
      />
      <Text>Room</Text>
      <SelectDropdown
        buttonTextAfterSelection={(selectedItem) => selectedItem}
        data={mockRooms}
        onSelect={(selectedItem: Room) =>
          setTask({ ...task, roomId: selectedItem.id })
        }
        rowTextForSelection={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
