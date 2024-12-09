import { ComfyDeploy } from "comfydeploy";

const cd = new ComfyDeploy({
  bearer: process.env.COMFY_DEPLOY_API_KEY!,
});

export async function GET(
  request: Request,
  { params }: { params: Record<string, string> }
): Promise<Response> {
  // Agregar logs detallados
  console.log("Request object:", request);
  console.log("Context params received:", params);

  const runId = params?.runId;

  if (!runId) {
    console.error("Error: Missing runId parameter.");
    return new Response("Missing runId parameter", { status: 400 });
  }

  console.log("Run ID received:", runId);

  try {
    const data = await cd.run.get({ runId });
    console.log("Data fetched successfully:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching run status:", error);
    return new Response("Error fetching status", { status: 500 });
  }
}
