import { z } from "zod";
import { IUser } from "@/domain/user/types";
import { userSchema } from "./userSchema";

export interface IUserFormProps {
  userId?: number;
}

export type UserFormType = z.infer<typeof userSchema>;

export type UserFormProps = {
  initialData: IUser;
};
