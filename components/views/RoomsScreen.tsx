import { StyleSheet } from "react-native";
import { Card, FAB } from "react-native-paper";

import { ROOMS_ROUTE } from "../../constants";
import { useRoomsQuery } from "../../hooks/useRooms";
import { RootStackScreenProps } from "../../types";

export default function RoomsScreen({
  navigation,
}: RootStackScreenProps<typeof ROOMS_ROUTE>) {
  const { data } = useRoomsQuery();
  return (
    <>
      {data.map((room) => (
        <Card
          key={room.id}
          mode="outlined"
          onPress={() => {
            navigation.push("Tasks", { roomId: room.id, title: room.name });
          }}
          style={styles.card}
        >
          <Card.Title title={room.name} />
        </Card>
      ))}
      <FAB icon="plus" style={styles.fab} />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: "10px",
    marginHorizontal: "10px",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
