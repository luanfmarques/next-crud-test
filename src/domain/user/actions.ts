import { PrismaClient } from "@prisma/client";
import { IUser } from "./types";
import { ErrorBase } from "@/utils/ErrorHandler";

const prisma = new PrismaClient();

export async function getAll() {
  const users = await prisma.user.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  return users;
}

export async function getById(id: IUser["id"]) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function create(user: IUser) {
  try {
    const create = await prisma.user.create({
      data: { ...user },
    });

    return create;
  } catch (err) {
    throw new ErrorBase({
      errors: ["Error on create User"],
      message: "Error",
    });
  }
}

export async function edit(id: IUser["id"], user: Omit<Event, "id">) {
  try {
    const userUpdate = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    });

    return userUpdate;
  } catch (err) {
    throw new ErrorBase({
      errors: ["Error on edit User"],
      message: "Error",
    });
  }
}

export async function destroy(id: IUser["id"]) {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    throw new ErrorBase({
      errors: ["Error on delete User"],
      message: "Error",
    });
  }
}
