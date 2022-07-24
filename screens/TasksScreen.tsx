import { FlatList, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { EDIT_TASK_ROUTE, TASKS_ROUTE } from "../constants";
import { mockRooms } from "../mock-data";
import { RootStackScreenProps } from "../types";

export default function TasksScreen({
  navigation,
  tasks,
}: RootStackScreenProps<typeof TASKS_ROUTE>) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={(e) => {
                navigation.push(EDIT_TASK_ROUTE, item);
              }}
            >
              <View style={styles.room}>
                <Text style={styles.roomName}>{item.name}</Text>
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
