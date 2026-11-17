// Usage: node tools/add-batch.js batch.json
// batch.json = { "yellowstone": [ {q,a,w,f,s,u}, ... ], "parks": [...], "roadtrips": [...] }
// New questions are shuffled (so topics mix) and APPENDED with new ids. Existing order never changes,
// which keeps every past and scheduled day the same for everyone.
const fs = require("fs"), path = require("path");
const qdir = path.join(__dirname, "..", "questions");
const prefix = { yellowstone: "ys", parks: "np", roadtrips: "rt" };
const batch = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
for (const [cat, items] of Object.entries(batch)) {
  const file = path.join(qdir, cat + ".json"), bank = JSON.parse(fs.readFileSync(file, "utf8"));
  const mixed = items.slice().sort(() => Math.random() - 0.5);
  let n = bank.items.length;
  for (const it of mixed) bank.items.push({ id: `${prefix[cat]}-${String(++n).padStart(3, "0")}`, ...it });
  fs.writeFileSync(file, JSON.stringify(bank, null, 1) + "\n");
  console.log(`${cat}: +${items.length} -> ${bank.items.length}`);
}
