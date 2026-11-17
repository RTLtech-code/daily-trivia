// Usage: node tools/add-batch.js batch.json
// batch.json = { "yellowstone": [ {d,q,a,w,f,s,u}, ... ], "parks": [...], "roadtrips": [...] }
// d = "easy" | "medium" | "hard". New questions are placed with the balanced-mix scheduler
// (spread evenly, never two hard in a row, continuing from the last scheduled day) and APPENDED
// with new ids. Existing order never changes, so every scheduled day stays the same for everyone.
const fs = require("fs"), path = require("path"), { balance, report, LEVELS } = require("./schedule");
const qdir = path.join(__dirname, "..", "questions");
const prefix = { yellowstone: "ys", parks: "np", roadtrips: "rt" };
const batch = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
for (const [cat, items] of Object.entries(batch)) {
  const bad = items.filter(i => !LEVELS.includes(i.d));
  if (bad.length) throw new Error(`${cat}: ${bad.length} question(s) missing d (easy/medium/hard)`);
  const file = path.join(qdir, cat + ".json"), bank = JSON.parse(fs.readFileSync(file, "utf8"));
  const last = bank.items[bank.items.length - 1];
  let n = bank.items.length;
  for (const it of balance(items, last && last.d, n)) bank.items.push({ id: `${prefix[cat]}-${String(++n).padStart(3, "0")}`, ...it });
  fs.writeFileSync(file, JSON.stringify(bank, null, 1) + "\n");
  console.log(`${cat}: +${items.length} -> ${report(bank.items)}`);
}
