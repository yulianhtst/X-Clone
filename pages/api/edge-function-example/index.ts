import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const redirectUrl = "/api/about";

  return new Response(
    JSON.stringify({
      body: request.body,
      query: searchParams.get("query"),
      cookies: request.cookies,
    }),
    {
      status: 200,
      headers: {
        // Location: redirectUrl,
        "content-type": "application/json",
      },
    }
  );
}
