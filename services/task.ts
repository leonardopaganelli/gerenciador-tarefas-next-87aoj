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

interface taskListServiceResponse {
  data?: taskData[];
  error?: string;
}
const getTaskList = async (): Promise<taskListServiceResponse> => {
  try {
    const token = localStorage.getItem("token")
    const taskListResponse: taskListResponseInterface = await axios.get(
      "http://localhost:3000/api/task ",
      {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
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

export { getTaskList };
export type { taskData };
