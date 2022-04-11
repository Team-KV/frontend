import axios, { AxiosError, AxiosResponse } from "axios";
import config from "config.json";

export default {
  get: (url: string) => {
    return axios.get(config.SERVER_URL + url, addConfig()).then((res) => res.data)
  },
  post: (url: string, content: any) => {
    return axios.post(config.SERVER_URL + url, content, addConfig()).then((res) => res.data);
  },
  update: (url: string, content: object) => {
    return axios.put(config.SERVER_URL + url, content, addConfig()).then((res) => res.data);
  },
  delete: (url: string) => {
    return axios.delete(config.SERVER_URL + url, addConfig()).then((res) => res.data);
  }
}

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token)
    return token;
  console.log('MUST LOG IN FIRST');
  return '';
}

const addConfig = () => {
  return {
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  }
}