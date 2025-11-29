export function onRequest({ request }: { request: Request }): Response {
  if (request.method !== "GET") {
    return new Response("Method not allowed", {
      status: 405,
      headers: {
        "Allow": "GET",
        "Cache-Control": "no-store",
      },
    });
  }

  const body = JSON.stringify({
    ok: true,
    time: new Date().toISOString(),
  });

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
