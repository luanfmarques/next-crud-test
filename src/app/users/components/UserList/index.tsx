"use client";

import { Button } from "@/components/Button";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import DeleteUser from "./components/DeleteUser";
import LoadingComponent from "@/components/Loading";
import { useDeleteUser, useUsers } from "@/queries/useUserQueries";

export default function UserList() {
  const router = useRouter();

  const { data, isLoading } = useUsers();

  const { mutateAsync: deleteUser, isPending: isLoadingDelete } =
    useDeleteUser();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <main className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Usuários</h1>
        <Button
          size="md"
          onClick={() => router.push("/users/create")}
          disabled={isLoadingDelete}
          data-testId="create-user"
        >
          Criar Usuário
        </Button>
      </div>
      {data?.map((user) => (
        <Card key={user.id} data-testid={`user-${user.name}`}>
          <div className="px-4 py-4">
            <p>Nome: {user.name}</p>
            <p>E-mail: {user.email}</p>
            <div className="flex flex-row justify-between mt-4">
              <Button
                size="md"
                disabled={isLoadingDelete}
                onClick={() => router.push(`/users/${user.id}`)}
                data-testId="edit-button"
              >
                Editar
              </Button>
              <DeleteUser
                userId={user.id}
                isLoading={isLoadingDelete}
                deleteMutate={deleteUser}
              />
            </div>
          </div>
        </Card>
      ))}
    </main>
  );
}
