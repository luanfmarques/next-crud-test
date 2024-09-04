import { NextRequest, NextResponse } from "next/server";

import { destroy, getById } from "@/app/domain/user/actions";
import { IUser } from "@/app/domain/user/types";
import { findEntity } from "@/utils/findEntity";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  return findEntity<IUser, IUser | undefined>(
    Number(id),
    getById,
    async (user) => {
      return NextResponse.json(user, { status: 200 });
    }
  );
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  return findEntity<IUser, { message: string }>(
    Number(id),
    getById,
    async () => {
      await destroy(Number(id));

      return NextResponse.json({ message: "Ok" }, { status: 200 });
    }
  );
}
