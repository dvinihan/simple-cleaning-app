import { FlatList, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { EDIT_TASK_ROUTE } from "../constants";
import { mockRooms } from "../mock-data";
import { RootStackScreenProps } from "../types";

export default function EditTaskScreen({
  navigation,
}: RootStackScreenProps<typeof EDIT_TASK_ROUTE>) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockRooms}
        renderItem={({ item }) => {
          return;
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
  room: {
    borderColor: "black",
    borderWidth: 1,
    height: "70px",
    justifyContent: "center",
    padding: "8px",
    margin: "8px",
  },
  roomName: {
    fontSize: 30,
  },
});
