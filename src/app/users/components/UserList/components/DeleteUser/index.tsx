import { Button } from "@/components/Button";
import LoadingComponent from "@/components/Loading";
import React from "react";
import { toast } from "react-toastify";
import { IDeleteUserProps } from "./types";

const DeleteUser = ({ userId, isLoading, deleteMutate }: IDeleteUserProps) => {
  const handleDeleteUser = async () => {
    try {
      await deleteMutate(userId);
      toast.success("Sucesso ao excluir o Usuário.");
    } catch {
      toast.error("Erro ao excluir o Usuário.");
    }
  };

  return (
    <Button
      size="md"
      onClick={() => handleDeleteUser()}
      className="bg-red-800 hover:bg-red-700"
      disabled={isLoading}
      data-testId="delete-button"
    >
      {!isLoading ? "Excluir" : <LoadingComponent color="white" size={20} />}
    </Button>
  );
};

export default DeleteUser;
