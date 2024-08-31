import { NextRequest, NextResponse } from "next/server";
import { create, getAll } from "@/app/domain/user/actions";
import { IUser } from "@/app/domain/user/types";
import { schema } from "./schema";
import { validateSchema } from "@/utils/validateSchema";

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
