import { userService } from "@/services/user/userService";
import UserForm from "../components/UserForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function UserDetails({
  params,
}: {
  params: { id: string };
}) {
  const userId = Number(params.id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user", userId],
    queryFn: () => userService.getById(userId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserForm userId={userId} />
    </HydrationBoundary>
  );
}
