import { apiV1Client } from "@/service/ApiV1Client";

type UserRes = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

const getUser = async ({ queryKey }: any): Promise<UserRes> =>
  await apiV1Client.get<UserRes>(`/user/${queryKey[1]}`).then((response) => response.data);

const createUser = async (name: string, email: string, password: string): Promise<UserRes | undefined> =>
  await apiV1Client
    .post<UserRes | undefined>(`/user`, {
      name: name,
      email: email,
      password: password
    })
    .then((response) => response.data)
    .catch((_) => undefined);

const login = async (email: string, password: string): Promise<UserRes | undefined> =>
  await apiV1Client
    .post<UserRes | undefined>(`/token`, {
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response);

      return response.data;
    })
    .catch((_) => undefined);

export default { getUser, createUser, login };
