import { NextResponse } from "next/server";
import { ZodSchema } from "zod";
import { ErrorBase } from "./ErrorHandler";

export const validateSchema = <T>(
  data: JSON,
  schema: ZodSchema,
  handleValidData: () => Promise<NextResponse<T>>
) => {
  const validate = schema.safeParse(data);

  if (!validate.success) {
    const { errors } = validate.error;

    return NextResponse.json(
      new ErrorBase({ errors, message: "Invalid Request!" }),
      { status: 400 }
    );
  }

  return handleValidData();
};
