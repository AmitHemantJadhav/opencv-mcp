// app/api/analyze-image/route.ts

import { exec } from "child_process";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { imageUrl } = await req.json();

  return new Promise((resolve) => {
    exec(`python3 ./utils/analyzeImage.py "${imageUrl}"`, (err, stdout) => {
      if (err) {
        resolve(new Response(JSON.stringify({ error: "Image analysis failed" }), { status: 500 }));
      } else {
        const [width, height, grayscale, edges] = stdout.trim().split(",");
        resolve(
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
      }
    });
  });
}
