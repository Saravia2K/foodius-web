import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as { key: string; value: string };
  cookies().set(body.key, body.value, {
    maxAge: 31536000,
  });

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
};
