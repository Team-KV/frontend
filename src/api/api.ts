import axios, { AxiosError, AxiosResponse } from "axios";
import config from "config.json";

const handleError = (({ response }: any) => {
  switch(response.status) {
    case 401: 
      window.location = window.location.protocol + "//" + window.location.host + "/login" as any;
      break;
  }
})

export default {
  get: (url: string) => {
    return axios.get(config.SERVER_URL + url, addConfig()).then((res) => res.data).catch(handleError)
  },
  post: (url: string, content: object) => {
    return axios.post(config.SERVER_URL + url, content, addConfig()).then((res) => res.data).catch(handleError);
  },
  update: (url: string, content: object) => {
    return axios.put(config.SERVER_URL + url, content, addConfig()).then((res) => res.data).catch(handleError);
  },
  delete: (url: string) => {
    return axios.delete(config.SERVER_URL + url, addConfig()).then((res) => res.data).catch(handleError);
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