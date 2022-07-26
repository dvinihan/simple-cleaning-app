import { FlatList, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { ROOMS_ROUTE } from "../constants";
import { mockRooms } from "../mock-data";
import { RootStackScreenProps } from "../types";

export default function RoomsScreen({
  navigation,
}: RootStackScreenProps<typeof ROOMS_ROUTE>) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockRooms}
        renderItem={({ item: room }) => {
          return (
            <Pressable
              key={`room-${room.id}`}
              onPress={(e) => {
                navigation.push("Tasks", { roomId: room.id });
              }}
            >
              <View style={styles.room}>
                <Text style={styles.roomName}>{room.name}</Text>
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
