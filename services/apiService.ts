import axios, { Method } from "axios";

export const executeRequest = (
  {endpoint, method, body}: { endpoint: string, method: Method, body?: any}
)=> {
    const headers = { 'Content-Type': 'application/json'} as any

    const URL = `http://localhost:3000/api/${endpoint}`;

    return axios.request({
        url: URL,
        method,
        data: body || '',
        headers,
        timeout: 3000,
    })
};

