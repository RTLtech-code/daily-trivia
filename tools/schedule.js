// Balanced-mix scheduler: spreads easy/medium/hard evenly and never puts two hard questions back to back.
// Deterministic (seeded), so rebuilding gives the same order.
function rng(seed){ return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(a, r){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const LEVELS = ["easy", "medium", "hard"];
function balance(items, prev, seed = 1){
  const r = rng(seed), pools = {}, total = items.length;
  LEVELS.forEach(l => pools[l] = shuffle(items.filter(i => i.d === l), r));
  const share = {}; LEVELS.forEach(l => share[l] = pools[l].length / total);
  const placed = { easy: 0, medium: 0, hard: 0 }, out = [];
  for (let pos = 1; pos <= total; pos++){
    const ok = LEVELS.filter(l => pools[l].length && !(l === "hard" && prev === "hard"));
    const pick = (ok.length ? ok : LEVELS.filter(l => pools[l].length))
      .sort((a, b) => (share[b] * pos - placed[b]) - (share[a] * pos - placed[a]))[0];
    out.push(pools[pick].shift()); placed[pick]++; prev = pick;
  }
  return out;
}
function report(items){
  let hardPairs = 0, weeksNoEasy = 0, weeks = 0;
  for (let i = 1; i < items.length; i++) if (items[i].d === "hard" && items[i - 1].d === "hard") hardPairs++;
  for (let i = 0; i + 7 <= items.length; i += 7){ weeks++; if (!items.slice(i, i + 7).some(x => x.d === "easy")) weeksNoEasy++; }
  const c = l => items.filter(i => i.d === l).length;
  return `${items.length} questions (easy ${c("easy")}, medium ${c("medium")}, hard ${c("hard")}); back-to-back hard: ${hardPairs}; weeks with no easy day: ${weeksNoEasy}/${weeks}`;
}
module.exports = { balance, report, LEVELS };
