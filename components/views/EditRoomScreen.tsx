import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Caption,
  Dialog,
  FAB,
  Modal,
  TextInput,
} from "react-native-paper";
import { useQueryClient } from "react-query";
import {
  EDIT_ROOM_ROUTE,
  ROOMS_QUERY_KEY,
  ROOMS_ROUTE,
  TASKS_ROUTE,
} from "../../constants";
import { getRoomIdFromUrl } from "../../helpers/url";
import { useDeleteRoom } from "../../hooks/useDeleteRoom";
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
  const urlRoomId = getRoomIdFromUrl(route);

  const queryClient = useQueryClient();
  const { rooms, nextId } = useRoomsQuery();
  const roomId = urlRoomId ?? nextId;
  const { mutate: saveRoom, isLoading } = useSaveRoom({
    onSettled: () => {
      queryClient.invalidateQueries(ROOMS_QUERY_KEY);
      navigation.push(TASKS_ROUTE, {
        roomId,
        title: room.name,
      });
    },
  });
  const { mutate: doDelete } = useDeleteRoom({
    onSettled: () => {
      queryClient.invalidateQueries(ROOMS_QUERY_KEY);
      navigation.push(ROOMS_ROUTE, {});
    },
  });

  const [room, setRoom] = useState(new Room());
  const [errors, setErrors] = useState<RoomInputErrors>({});
  const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);

  useEffect(() => {
    const initialRoom = rooms.find((room) => room.id === urlRoomId);
    initialRoom && setRoom(initialRoom);
  }, []);

  const save = async () => {
    if (!room.name) {
      setErrors((e) => ({ ...e, name: "You must enter a room name" }));
    } else {
      saveRoom({ ...room, id: roomId });
    }
  };

  const deleteRoom = () => {
    doDelete(room.id);
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

      <FAB
        icon="delete"
        onPress={() => {
          setShouldShowDeleteModal(true);
        }}
        style={styles.fab}
      />
      <Dialog
        onDismiss={() => setShouldShowDeleteModal(false)}
        visible={shouldShowDeleteModal}
      >
        <Dialog.Content>
          <Dialog.Title>
            Are you sure you want to delete this room?
          </Dialog.Title>
          <Dialog.Actions>
            <Button onPress={deleteRoom}>Yes</Button>
            <Button onPress={() => setShouldShowDeleteModal(false)}>No</Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
