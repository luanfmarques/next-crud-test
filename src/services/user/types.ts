import { IUser } from "@/domain/user/types";

export interface IClientUser extends IUser {}

export interface CreateParams {
  name: string;
  email: string;
}

export interface UpdateParams extends CreateParams {
  id: number;
}
