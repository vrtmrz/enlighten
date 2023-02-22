import { serve } from "./deps.ts";
import { serveDir } from "./deps.ts";

import { handleTranslate } from "./route/translate.ts";
async function handler(req: Request): Promise<Response> {

	return await handleTranslate(req) || serveDir(req, {
		fsRoot: "./client/dist/",
		// urlRoot: "static"
	})

}

const port = Number(Deno.env.get("ENLIGHTEN_PORT") || "") || 3000;

console.log(`Listening on http://localhost:${port}`);
serve(handler, { port: port });
