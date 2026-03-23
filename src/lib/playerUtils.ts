export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export type PlayerData = {
  rank: number;
  name: string;
  slug: string;
  points: number;
  birdies: number;
  events: number;
  wins: number;
  top5: number;
  top10: number;
  netWins: number;
  netTop5: number;
  netTop10: number;
  eventPoints: number[];
  roundRecapUrl: string;
};

export const EVENT_NAMES = ["Baylands", "Callippe", "Poppy Hills", "Presidio", "Corica"];

export const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFoFbbyxvSushAcAppZY8YEP-cDAXH5GhQCewq4QOgIW-WqIW7SDcHX4Xsz2UeP7tI4OYAjZTgQVOc/pub?gid=191837314&single=true&output=csv";

export function parsePlayerRows(rows: string[][]): PlayerData[] {
  const parsed: PlayerData[] = [];
  for (let i = 3; i < rows.length; i++) {
    const r = rows[i];
    const rank = parseInt(r[1]);
    if (isNaN(rank)) continue;
    const name = r[2] || "";
    parsed.push({
      rank,
      name,
      slug: slugifyName(name),
      points: parseFloat(r[3]) || 0,
      birdies: parseInt(r[4]) || 0,
      events: parseInt(r[6]) || 0,
      wins: parseInt(r[7]) || 0,
      top5: parseInt(r[8]) || 0,
      top10: parseInt(r[9]) || 0,
      netWins: parseInt(r[11]) || 0,
      netTop5: parseInt(r[12]) || 0,
      netTop10: parseInt(r[13]) || 0,
      eventPoints: [
        parseFloat(r[15]) || 0,
        parseFloat(r[16]) || 0,
        parseFloat(r[17]) || 0,
        parseFloat(r[18]) || 0,
        parseFloat(r[19]) || 0,
      ],
      roundRecapUrl: (r[10] || "").trim(),
    });
  }
  parsed.sort((a, b) => b.points - a.points);
  parsed.forEach((p, i) => (p.rank = i + 1));
  return parsed;
}
