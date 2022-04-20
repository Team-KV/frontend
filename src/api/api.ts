import axios, { AxiosError, AxiosResponse } from "axios";
import config from "config.json";

export default {
  get: (url: string) => {
    return axios.get(config.SERVER_URL + url, addConfig());
  },
  post: (url: string, content?: object) => {
    return axios.post(config.SERVER_URL + url, content, addConfig());
  },
  update: (url: string, content: object) => {
    return axios.put(config.SERVER_URL + url, content, addConfig());
  },
  delete: (url: string) => {
    return axios.delete(config.SERVER_URL + url, addConfig());
  },
  postFile: (url: string, content?: object) => {
    return axios.post(config.SERVER_URL + url, content, addConfigForPostFiles());
  },
  getFile: (url: string) => {
    return axios.get(config.SERVER_URL + url, addConfigForGetFile());
  },
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
      'X-localization': 'cs',
      'Authorization': 'Bearer ' + getToken()
    }
  }
}

const addConfigForPostFiles = () => {
  return {
    headers: {
      'X-localization': 'cs',
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'multipart/form-data'
    }
  }
}

const addConfigForGetFile = () => {
  return {
    headers: {
      'X-localization': 'cs',
      'Authorization': 'Bearer ' + getToken(),
      'responseType': 'blob',
    }
  }
}
