import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema } from "./userSchema";
import { UserFormType } from "./types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CreateParams } from "@/services/user/types";
import {
  useCreateUser,
  useUpdateUser,
  useUser,
} from "@/queries/useUserQueries";

export const useUserForm = (userId: number) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userSchema),
  });

  const { data: user, isLoading: isLoadingData } = useUser(Number(userId));

  const { mutateAsync: createUser, isPending: isLoadingCreate } =
    useCreateUser();

  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!userId) {
        await createUser(data);
        toast.success("Usuário criado com sucesso.");
      } else {
        await updateUser({ id: userId, ...data });
        toast.success("Usuário editado com sucesso.");
      }
      router.push("/users");
    } catch {
      if (!userId) {
        toast.error("Erro ao editar Usuário.");
      } else {
        toast.error("Erro ao criar Usuário");
      }
    }
  });

  const isSubmitting = isLoadingCreate || isLoadingUpdate;

  useEffect(() => {
    if (!isLoadingData && user) {
      Object.entries(user).forEach(([name, value]) => {
        if (name !== "id") {
          setValue(name as keyof CreateParams, value);
        }
      });
    }
  }, [user, isLoadingData, setValue]);

  return { isLoadingData, errors, register, isSubmitting, onSubmit, user };
};

export default useUserForm;
