import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as { key: string };
  cookies().delete(body.key);

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
};
