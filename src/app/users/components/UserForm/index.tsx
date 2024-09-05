"use client";

import { Input } from "@/components/Input";
import useUserForm from "./useUserForm";
import { Button } from "@/components/Button";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LoadingComponent from "@/components/Loading";
import { IUserFormProps } from "./types";

export default function UserForm({ userId }: IUserFormProps) {
  const router = useRouter();
  const { isSubmitting, onSubmit, errors, register, isLoadingData, user } =
    useUserForm(Number(userId));

  const goBack = () => router.push("/users");

  if (isLoadingData) {
    return <LoadingComponent />;
  }

  if (userId && !user) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-3">
        <Button
          onClick={goBack}
          disabled={isSubmitting}
          variant="icon"
          size="icon"
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-xl">
          {userId ? "Editar Usuário" : "Cadastrar Usuário"}
        </h1>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <Input
          type="text"
          {...register("name")}
          data-testId="input-name"
          placeholder="Nome"
          error={errors.name?.message}
        />
        <Input
          type="email"
          {...register("email")}
          data-testId="input-email"
          placeholder="E-mail"
          error={errors.email?.message}
        />
        <div className="flex justify-between">
          <Button
            variant="outlined"
            disabled={isSubmitting}
            onClick={(e) => {
              e.preventDefault();
              goBack();
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            data-testId="save-button"
          >
            {isSubmitting ? (
              <LoadingComponent color="white" size={20} />
            ) : (
              "Salvar"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
