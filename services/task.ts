import axios from "axios";
import { Task } from "../types/Task";

interface taskListResponseInterface {
  data: Task[];
}

interface createTaskInputInterface {
  name: string;
  previsionDate: string;
}

interface editTaskInputInterface {
  name: string;
  previsionDate: string;
  endDate: string;
}
interface getTaskInputInterface {
  status: string;
  previsionDateStart?: string;
  previsionDateEnd?: string;
}

interface createTaskResponseInterface {
  data: unknown;
}

interface taskListServiceResponse {
  data?: Task[];
  error?: string;
}
const getTaskList = async ({
  status,
  previsionDateStart,
  previsionDateEnd,
}: getTaskInputInterface): Promise<taskListServiceResponse> => {
  console.log("Fetching with params", {
    status,
    previsionDateStart,
    previsionDateEnd,
  });
  try {
    let query = `?status=${status}`;

    if (previsionDateStart) {
      query += `&previsionDateStart=${previsionDateStart}`;
    }

    if (previsionDateEnd) {
      query += `&previsionDateEnd=${previsionDateEnd}`;
    }

    const token = localStorage.getItem("token");
    const taskListResponse: taskListResponseInterface = await axios.get(
      `http://localhost:3000/api/task${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: taskListResponse.data };
  } catch (error: any) {
    return {
      error: error?.response?.data?.error,
    };
  }
};

const addTask = async (taskToEdit: Task): Promise<unknown> => {
  try {
    const token = localStorage.getItem("token");
    const createTaskResponse: createTaskResponseInterface = await axios.post(
      "http://localhost:3000/api/task",
      {
        ...taskToEdit,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: createTaskResponse.data };
  } catch (error: any) {
    throw error?.response?.data?.error;
  }
};

const editTask = async (taskToAdd: Task): Promise<unknown> => {
  try {
    const token = localStorage.getItem("token");
    const createTaskResponse: createTaskResponseInterface = await axios.put(
      `http://localhost:3000/api/task?id=${taskToAdd._id}`,
      {
        ...taskToAdd,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: createTaskResponse.data };
  } catch (error: any) {
    throw error?.response?.data?.error;
  }
};

export { getTaskList, addTask, editTask };
export type { createTaskInputInterface, getTaskInputInterface };
