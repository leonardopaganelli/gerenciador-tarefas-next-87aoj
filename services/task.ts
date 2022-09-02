import axios from "axios";

interface loginInterface {
  login: string;
  password: string;
}

interface taskData {
  _id: string;
  name: string;
  previsionDate: string;
}

interface taskListResponseInterface {
  data: taskData[];
}

interface createTaskInputInterface {
  name: string;
  previsionDate: string;
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
  data?: taskData[];
  error?: string;
}
const getTaskList = async ({status = "0", previsionDateStart, previsionDateEnd }: getTaskInputInterface): Promise<taskListServiceResponse> => {
  try {
    let query = `?status=${status}`

    if (previsionDateStart) {
      query += `&previsionDateStart=${previsionDateStart}`
    }

    if (previsionDateEnd) {
      query += `&previsionDateEnd=${previsionDateEnd}`
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
  } catch (error) {
    console.log(error);
    return {
      error: error?.response?.data?.error,
    };
  }
};

const addTask = async (
  taskToAdd: createTaskInputInterface
): Promise<unknown> => {
  try {
    const token = localStorage.getItem("token");
    const createTaskResponse: createTaskResponseInterface = await axios.post(
      "http://localhost:3000/api/task",
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
  } catch (error) {
    console.log(error);
    return {
      error: error?.response?.data?.error,
    };
  }
};

export { getTaskList, addTask };
export type { taskData, createTaskInputInterface, getTaskInputInterface };
