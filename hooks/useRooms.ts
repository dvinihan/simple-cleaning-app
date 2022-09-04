import { useQuery } from "react-query";
import { Room } from "../types";
import Constants from "expo-constants";

export const useRoomsQuery = () => {
  const roomsQuery = useQuery("rooms", () =>
    fetch(`${Constants.manifest?.extra?.SIMPLE_CLEANING_APP_API}/rooms`).then(
      (res) => res.json()
    )
  );

  const newData = sanitizeRoomsData(roomsQuery.data);

  return { ...roomsQuery, data: newData };
};

const sanitizeRoomsData = (data: unknown) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((item) => new Room(item));
};
