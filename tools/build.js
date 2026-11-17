// Builds:
//  - squarespace-code-block.html : paste into Squarespace (loads questions from config.questionsUrl)
//  - preview.html                : local test page on a mock of the site background (loads ./questions/)
const fs = require("fs"), path = require("path");
const dir = path.join(__dirname, "..");
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json"), "utf8"));
const tpl = fs.readFileSync(path.join(dir, "squarespace-template.html"), "utf8");
const block = tpl.replace("__SRC__", cfg.questionsUrl);
fs.writeFileSync(path.join(dir, "squarespace-code-block.html"), block);
const preview = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Trivia preview</title>
<style>body{margin:0;background:#eae6e1;color:#121212;font-family:Georgia,serif}main{padding:32px 16px}
/* hostile site-style simulation: these must not leak into the widget */ p{letter-spacing:.05em} button{text-transform:uppercase;font-family:Courier}</style></head>
<body><main><h1 style="text-align:center;font-weight:400">Mock page title</h1>${tpl.replace("__SRC__", "questions/")}</main></body></html>`;
fs.writeFileSync(path.join(dir, "preview.html"), preview);
console.log("squarespace-code-block.html", (Buffer.byteLength(block) / 1024).toFixed(1) + " KB, questions from", cfg.questionsUrl);
