
import { deepl } from "../deps.ts";

const authKey = Deno.env.get("ENLIGHTEN_DEEPL_KEY") || "";
const translator = authKey && new deepl.Translator(authKey);


const CountRange = 1000; //ms
const CountThreshold = 10; //times
const LengthThreshold = 500;
let accesses = [] as number[];
export const TRANSLATE_ROUTE = new URLPattern({ pathname: "/api/translate/:from,:to" })

export async function handleTranslate(req: Request): Promise<Response | false> {
	{
		const match = TRANSLATE_ROUTE.exec(req.url);
		if (match) {
			if (translator) {
				const now = Date.now();
				accesses.push(now);
				accesses = accesses.filter(e => e > now - CountRange);
				if (accesses.length > CountThreshold) {
					return new Response(`Error: Too many request! Sorry!`);
				}
				const to = match.pathname.groups.to;
				const w = await req.text();
				if (w.length > LengthThreshold) {
					return new Response(`Error: Too long request`);
				}
				const revResult = await translator.translateText(w, null, to as deepl.TargetLanguageCode, { formality: "prefer_more" });
				return new Response(`${revResult.text}`);
			} else {
				return new Response(`Error: Could not initialise DeepL translator`);
			}
		}
	}
	return false;
}