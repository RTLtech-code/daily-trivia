// Validates questions/*.json: required fields, https sources, unique ids/questions, 3 wrong answers.
const fs = require("fs"), path = require("path");
const qdir = path.join(__dirname, "..", "questions");
const norm = t => t.toLowerCase().replace(/[^a-z0-9]/g, "");
let fail = 0; const allQ = new Set();
for (const f of fs.readdirSync(qdir).filter(f => f.endsWith(".json"))) {
  const bank = JSON.parse(fs.readFileSync(path.join(qdir, f), "utf8"));
  const ids = new Set(); let bad = 0, dup = 0;
  bank.items.forEach((i, n) => {
    const problems = [];
    if (!i || !i.id || !i.q || !i.a || !i.f || !i.s) problems.push("missing field");
    if (!Array.isArray(i.w) || i.w.length !== 3) problems.push("needs 3 wrong answers");
    else if (i.w.includes(i.a) || new Set(i.w).size !== 3) problems.push("duplicate choice");
    if (!/^https:\/\//.test(i.u || "")) problems.push("source URL");
    if (ids.has(i.id)) problems.push("duplicate id"); ids.add(i.id);
    if (allQ.has(norm(i.q))) { problems.push("duplicate question"); dup++; } allQ.add(norm(i.q));
    if (problems.length) { bad++; console.log(`  ${f} #${n + 1} ${i && i.id}: ${problems.join(", ")}`); }
  });
  console.log(`${f}: ${bank.items.length} questions, ${bad} with problems`);
  fail += bad;
}
process.exit(fail ? 1 : 0);
