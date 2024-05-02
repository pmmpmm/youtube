import axios from "axios";

const USER_API_CLIENT = import.meta.env.VITE_APP_USER_API_CLIENT;

export const apiV1Client = axios.create({
  baseURL: USER_API_CLIENT
});
