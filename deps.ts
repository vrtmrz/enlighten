import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.177.0/http/file_server.ts";
import * as deepl from 'npm:deepl-node';
// import * as deepl from 'https://ga.jspm.io/npm:deepl-node@1.8.0/dist/index.js';
// import * as deepl from "https://cdn.skypack.dev/deepl-node";

export { serve, serveDir, deepl }