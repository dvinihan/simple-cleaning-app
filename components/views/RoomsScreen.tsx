import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import { ROOMS_ROUTE } from "../../constants";
import { useRoomsQuery } from "../../hooks/useRooms";
import { mockRooms } from "../../mock-data";
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
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: "10px",
    marginHorizontal: "10px",
  },
});
