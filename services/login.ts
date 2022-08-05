import axios from "axios";

interface loginInterface {
  login: string;
  password: string;
}

interface dataInfo {
  token: string;
  email: string;
  name: string;
}

interface loginResponse {
  data: dataInfo;
}

interface loginServiceResponse {
  data?: dataInfo;
  error?: string;
}
const login = async (
  loginData: loginInterface
): Promise<loginServiceResponse> => {
  try {
    const loginResponse: loginResponse = await axios.post(
      "http://localhost:3000/api/login ",
      {
        ...loginData,
      }
    );

    return { data: loginResponse.data };
  } catch (error) {
    console.log(error);
    return {
      error: error?.response?.data?.error,
    };
  }
};

export default login;
