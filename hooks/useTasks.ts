import { useQuery } from "react-query";
import { Task } from "../types";
import Constants from "expo-constants";

export const useTasksQuery = () => {
  const tasksQuery = useQuery("tasks", () =>
    fetch(`${Constants.manifest?.extra?.SIMPLE_CLEANING_APP_API}/tasks`).then(
      (res) => res.json()
    )
  );

  const newData = sanitizeTasksData(tasksQuery.data);

  return { ...tasksQuery, data: newData };
};

const sanitizeTasksData = (data: unknown) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map((item) => new Task(item));
};
