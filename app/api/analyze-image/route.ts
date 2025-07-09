import { NextRequest } from "next/server";
import { exec } from "child_process";

export async function POST(req: NextRequest): Promise<Response> {
  const { imageUrl } = await req.json();

  return new Promise((resolve) => {
    exec(`python3 ./utils/analyzeImage.py "${imageUrl}"`, (err, stdout) => {
      if (err || !stdout) {
        return resolve(
          new Response(JSON.stringify({ error: "Image analysis failed" }), {
            status: 500,
          })
        );
      }

      const [width, height, grayscale, edges] = stdout.trim().split(",");

      return resolve(
        new Response(
          JSON.stringify({
            width: Number(width),
            height: Number(height),
            isGrayscale: grayscale === "True",
            edgeCount: Number(edges),
          }),
          { status: 200 }
        )
      );
    });
  });
}
