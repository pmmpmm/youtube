import axios from "axios";

export const apiV1Client = axios.create({
  baseURL: "http://localhost:3000/api/v1"
});
