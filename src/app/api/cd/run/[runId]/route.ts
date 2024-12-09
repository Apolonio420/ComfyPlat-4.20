import { ComfyDeploy } from "comfydeploy";

const cd = new ComfyDeploy({
  bearer: process.env.COMFY_DEPLOY_API_KEY!,
});

export async function GET(
  _request: Request,
  context: { params: Record<string, string> }
): Promise<Response> {
  const { runId } = context.params;

  if (!runId) {
    return new Response("Missing runId parameter", { status: 400 });
  }

  try {
    const data = await cd.run.get({ runId });
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching run status:", error);
    return new Response("Error fetching status", { status: 500 });
  }
} 