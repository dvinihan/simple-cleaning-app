import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Caption,
  Modal,
  TextInput,
} from "react-native-paper";
import { useQueryClient } from "react-query";
import { EDIT_ROOM_ROUTE, ROOMS_QUERY_KEY } from "../../constants";
import { useRoomsQuery } from "../../hooks/useRooms";
import { useSaveRoom } from "../../hooks/useSaveRoom";
import { Room, RootStackScreenProps } from "../../types";

type RoomInputErrors = {
  name?: string;
};

export default function EditRoomScreen({
  navigation,
  route,
}: RootStackScreenProps<typeof EDIT_ROOM_ROUTE>) {
  const queryClient = useQueryClient();
  const { rooms, nextId } = useRoomsQuery();
  const { mutate: saveRoom, isLoading } = useSaveRoom({
    onSettled: () => {
      queryClient.invalidateQueries(ROOMS_QUERY_KEY);
      navigation.goBack();
    },
  });

  const [room, setRoom] = useState(new Room());
  const [errors, setErrors] = useState<RoomInputErrors>({});

  useEffect(() => {
    const initialRoom = rooms.find((room) => room.id === route.params.roomId);
    initialRoom && setRoom(initialRoom);
  }, []);

  const save = async () => {
    if (!room.name) {
      setErrors((e) => ({ ...e, name: "You must enter a room name" }));
    } else {
      saveRoom({ ...room, id: route.params.roomId ?? nextId });
    }
  };

  return (
    <>
      <TextInput
        label="Name"
        value={room?.name}
        onChangeText={(text) => setRoom({ ...room, name: text })}
        style={styles.textInput}
      />
      {errors.name && <Caption style={styles.error}>{errors.name}</Caption>}
      <Button style={styles.saveButton} mode="contained" onPress={save}>
        Save
      </Button>
      <Modal visible={isLoading}>
        <ActivityIndicator size="large" />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginBottom: "10px",
  },
  saveButton: {
    marginTop: "10px",
  },
  error: {
    marginHorizontal: "10px",
    color: "red",
    fontSize: 18,
  },
});
