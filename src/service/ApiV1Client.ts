import axios from "axios";

const USER_API_CLIENT = import.meta.env.VITE_APP_USER_API_CLIENT;

export const apiV1Client = axios.create({
  baseURL: USER_API_CLIENT
});

apiV1Client.interceptors.request.use(
  function (config) {
      if (config.headers) {
          if (config.headers["Content-Type"] === undefined) {
              config.headers["Content-Type"] = 'application/json'
          }

          const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN)
          if (accessToken) {
              config.headers["Authorization"] = `Bearer ${accessToken}`
          }
      }

      return config;
  }
)
