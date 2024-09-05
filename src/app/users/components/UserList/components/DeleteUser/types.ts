import { UseMutateAsyncFunction } from "@tanstack/react-query";

export interface IDeleteUserProps {
  userId: number;
  isLoading: boolean;
  deleteMutate: UseMutateAsyncFunction<void, Error, number, unknown>;
}
