// Re-spreads difficulty across days that nobody has seen yet. Keeps every past day, today AND tomorrow
// exactly as they are (tomorrow is protected so visitors in later time zones never see a change mid-day).
// Usage: node tools/rebalance-future.js
const fs = require("fs"), path = require("path"), { balance, report } = require("./schedule");
const LAUNCH = Date.UTC(2026, 10, 17), now = new Date();
const today = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - LAUNCH) / 864e5) + 1;
const keep = today + 1; // days 1..tomorrow stay fixed
for (const f of ["yellowstone", "parks", "roadtrips"]) {
  const file = path.join(__dirname, "..", "questions", f + ".json"), bank = JSON.parse(fs.readFileSync(file, "utf8"));
  const fixed = bank.items.slice(0, keep), rest = balance(bank.items.slice(keep), fixed[fixed.length - 1].d, keep);
  bank.items = fixed.concat(rest);
  fs.writeFileSync(file, JSON.stringify(bank, null, 1) + "\n");
  console.log(`${f} (days 1-${keep} kept): ${report(bank.items)}`);
}
