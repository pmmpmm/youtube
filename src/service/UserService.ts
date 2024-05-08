import { apiV1Client } from "@/service/ApiV1Client";

type UserRes = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateToken = {
  accessToken: string,
  refreshToken: string,
}

const getUser = async (): Promise<UserRes> =>
  await apiV1Client.get<UserRes>("/user").then((response) => response.data);

const createUser = async (name: string, email: string, password: string): Promise<UserRes | undefined> =>
  await apiV1Client
    .post<UserRes | undefined>(`/user`, {
      name: name,
      email: email,
      password: password
    })
    .then((response) => response.data)
    .catch((_) => undefined);

const login = async (email: string, password: string): Promise<CreateToken | undefined> =>
  await apiV1Client
    .post<CreateToken | undefined>(`/token`, {
      email: email,
      password: password
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN, response.data?.accessToken);
        localStorage.setItem(import.meta.env.VITE_REFRESH_TOKEN, response.data?.refreshToken);
      }

      return response.data;
    })
    .catch((_) => undefined);

export default { getUser, createUser, login };
