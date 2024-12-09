import { ComfyDeploy } from "comfydeploy";
import { NextApiRequest, NextApiResponse } from 'next';

const cd = new ComfyDeploy({
  bearer: process.env.COMFY_DEPLOY_API_KEY!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { runId } = req.query;

  if (typeof runId !== 'string') {
    console.error("Error: Missing or invalid runId parameter.");
    return res.status(400).json({ error: "Missing or invalid runId parameter" });
  }

  console.log("Run ID received:", runId);

  try {
    const data = await cd.run.get({ runId });
    console.log("Data fetched successfully:", data);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching run status:", error);
    return res.status(500).json({ error: "Error fetching status" });
  }
}
