import { ComfyDeploy } from "comfydeploy";
import { NextRequest, NextResponse } from 'next/server';

const cd = new ComfyDeploy({
  bearer: process.env.COMFY_DEPLOY_API_KEY!,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ runId: string }> }
) {
  const { runId } = await params;

  if (!runId) {
    console.error("Error: Missing or invalid runId parameter.");
    return NextResponse.json({ error: "Missing or invalid runId parameter" }, { status: 400 });
  }

  console.log("Run ID received:", runId);

  try {
    const data = await cd.run.get({ runId });
    console.log("Data fetched successfully:", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching run status:", error);
    return NextResponse.json({ error: "Error fetching status" }, { status: 500 });
  }
}
