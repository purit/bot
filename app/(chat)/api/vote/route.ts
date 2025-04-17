// app/(chat)/api/vote/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'GET vote - OK' });
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Vote received:", body);

  return NextResponse.json({ status: "ok", received: body });
}
