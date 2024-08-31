import { ErrorBase } from "@/utils/ErrorHandler";
import { NextRequest, NextResponse } from "next/server";

import { destroy, getById, edit } from "@/app/domain/user/actions";
import { validateSchema } from "@/utils/validateSchema";
import { schema } from "../schema";
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

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const id = body.id;

  if (!id) {
    return NextResponse.json(
      new ErrorBase({ errors: ["id is missing"], message: "Invalid Request!" }),
      { status: 400 }
    );
  }

  return validateSchema<IUser>(body, schema, async () => {
    const { id, ...rest } = body;

    const response = await edit(id, rest);

    return NextResponse.json(response, { status: 200 });
  });
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
