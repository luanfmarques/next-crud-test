import api from "@/utils/axios";
import { CreateParams, IClientUser, UpdateParams } from "./types";

async function getAll() {
  const { data } = await api.get<IClientUser[]>("/api/user");

  return data;
}

async function getById(id: number) {
  const { data } = await api.get<IClientUser>(`/api/user/${id}`);

  return data;
}

async function deletion(id: number) {
  await api.delete(`/api/user/${id}`);
}

async function create(params: CreateParams) {
  await api.post("/api/user", params);
}

async function update(params: UpdateParams) {
  await api.put("/api/user", params);
}

export const userService = {
  getAll,
  getById,
  deletion,
  create,
  update,
};
