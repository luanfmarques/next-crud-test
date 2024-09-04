import { NextRequest, NextResponse } from "next/server";
import { create, edit, getAll } from "@/app/domain/user/actions";
import { IUser } from "@/app/domain/user/types";
import { schema } from "./schema";
import { validateSchema } from "@/utils/validateSchema";
import { ErrorBase } from "@/utils/ErrorHandler";

export async function GET() {
  const allUsers = await getAll();

  return NextResponse.json(allUsers);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  return validateSchema<IUser>(data, schema, async () => {
    const userCreated = await create(data);

    return NextResponse.json(userCreated, { status: 201 });
  });
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
