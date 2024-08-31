import { NextResponse } from "next/server";
import { ErrorBase } from "./ErrorHandler";

export async function findEntity<T, R>(
  id: number,
  getEntityById: (id: number) => Promise<T | null>,
  handleOnFind: (entity?: T) => Promise<NextResponse<R>>
) {
  const entity = await getEntityById(id);

  if (!entity) {
    return NextResponse.json(
      new ErrorBase({
        errors: ["Entity not found"],
        message: "Not Found",
      }),
      { status: 404 }
    );
  }

  return handleOnFind(entity);
}
