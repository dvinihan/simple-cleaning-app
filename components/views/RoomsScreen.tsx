import { ScrollView, StyleSheet } from "react-native";
import { Card, FAB } from "react-native-paper";
import { EDIT_ROOM_ROUTE, ROOMS_ROUTE, TASKS_ROUTE } from "../../constants";
import { useRoomsQuery } from "../../hooks/useRooms";
import { RootStackScreenProps } from "../../types";
import { OverdueTasks } from "../OverdueTasks";

export default function RoomsScreen({
  navigation,
}: RootStackScreenProps<typeof ROOMS_ROUTE>) {
  const { rooms } = useRoomsQuery();

  return (
    <>
      <ScrollView>
        <OverdueTasks />
        {rooms.map((room) => (
          <Card
            key={room.id}
            mode="outlined"
            onPress={() => {
              navigation.push(TASKS_ROUTE, {
                roomId: room.id,
                title: room.name,
              });
            }}
            style={styles.card}
          >
            <Card.Title title={room.name} />
          </Card>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        onPress={() => {
          navigation.push(EDIT_ROOM_ROUTE, { title: "New Room" });
        }}
        style={styles.plusFab}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: "10px",
    marginHorizontal: "10px",
  },
  plusFab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
