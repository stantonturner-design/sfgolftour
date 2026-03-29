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

export type CoricaResult = {
  name: string;
  slug: string;
  grossScore: number | null;
  netScore: number | null;
  handicap: number | null;
  grossRank: string;
  netRank: string;
  points: number;
  eventRank: string;
};

export type HandicapData = {
  name: string;
  slug: string;
  roundRecapUrl: string | null;
  preseason: number | null;
  corica: number | null;
  coyoteCreek: number | null;
  chardonnay: number | null;
  poppyRidge: number | null;
  presidio: number | null;
};

// 2026 season events
export const EVENT_NAMES = ["Corica", "Coyote Creek", "Chardonnay", "Poppy Ridge", "Presidio"];

const SHEET_BASE =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuyF0EPQcm-z2Y3vAx4nPWoIQ3tnghemFJMVGmKQYUL49aLHLr9aLxZO7cryubxjGB-C4PNes_J35-/pub";

export const SHEET_URL = `${SHEET_BASE}?gid=2060685145&single=true&output=csv`;
export const TEE_SHEET_URL = `${SHEET_BASE}?gid=1479662039&single=true&output=csv`;
export const HANDICAPS_URL = `${SHEET_BASE}?gid=1591080360&single=true&output=csv`;
export const CORICA_URL = `${SHEET_BASE}?gid=397283659&single=true&output=csv`;

/**
 * Parse the 2026 Leaderboard tab.
 * Column layout (0-indexed):
 *  1:RANK  2:GOLFER  3:POINTS  4:EVENTS
 *  6:Corica  7:Coyote Creek  8:Chardonnay  9:Poppy Ridge  10:Presidio
 *  12:WINS  13:TOP5  14:TOP10
 *  16:NET WINS  17:NET TOP5  18:NET TOP10
 *  20:BIRDIES
 */
export function parsePlayerRows(rows: string[][]): PlayerData[] {
  const parsed: PlayerData[] = [];
  for (let i = 3; i < rows.length; i++) {
    const r = rows[i];
    const rank = parseInt(r[1]);
    if (isNaN(rank)) continue;
    const name = (r[2] || "").trim();
    if (!name) continue;
    parsed.push({
      rank,
      name,
      slug: slugifyName(name),
      points: parseFloat(r[3]) || 0,
      events: parseInt(r[4]) || 0,
      eventPoints: [
        parseFloat(r[6]) || 0,
        parseFloat(r[7]) || 0,
        parseFloat(r[8]) || 0,
        parseFloat(r[9]) || 0,
        parseFloat(r[10]) || 0,
      ],
      wins: parseInt(r[12]) || 0,
      top5: parseInt(r[13]) || 0,
      top10: parseInt(r[14]) || 0,
      netWins: parseInt(r[16]) || 0,
      netTop5: parseInt(r[17]) || 0,
      netTop10: parseInt(r[18]) || 0,
      birdies: parseInt(r[20]) || 0,
      roundRecapUrl: "", // Not in 2026 sheet
    });
  }
  parsed.sort((a, b) => b.points - a.points);
  parsed.forEach((p, i) => (p.rank = i + 1));
  return parsed;
}

/**
 * Parse the Corica event results tab.
 * Player rows start at row index 6 (after header/par rows).
 * Col 1:Name  23:TOT(gross)  24:HCP  25:NET  26:GrossRank  27:NetRank  28:Points  29:EventRank
 */
export function parseCoricaResults(rows: string[][]): CoricaResult[] {
  const results: CoricaResult[] = [];
  for (let i = 6; i < rows.length; i++) {
    const r = rows[i];
    const name = (r[1] || "").trim();
    if (!name) continue;
    const grossStr = (r[23] || "").trim();
    const hcpStr = (r[24] || "").trim();
    const netStr = (r[25] || "").trim();
    const grossRankStr = (r[26] || "").trim();
    const netRankStr = (r[27] || "").trim();
    const pointsStr = (r[28] || "").trim();
    const eventRankStr = (r[29] || "").trim();

    results.push({
      name,
      slug: slugifyName(name),
      grossScore: grossStr ? parseInt(grossStr) || null : null,
      netScore: netStr ? parseInt(netStr) || null : null,
      handicap: hcpStr ? parseInt(hcpStr) || null : null,
      grossRank: grossRankStr === "N/A" ? "—" : grossRankStr || "—",
      netRank: netRankStr === "N/A" ? "—" : netRankStr || "—",
      points: parseFloat(pointsStr) || 0,
      eventRank: eventRankStr === "N/A" ? "—" : eventRankStr || "—",
    });
  }
  return results;
}

/**
 * Normalize "Last, First" → "First Last".
 */
export function normalizeSheetName(name: string): string {
  const parts = name.split(",").map((s) => s.trim());
  if (parts.length === 2 && parts[0] && parts[1]) {
    return `${parts[1]} ${parts[0]}`;
  }
  return name;
}

/**
 * Parse the Handicaps tab (with proper quoted-CSV support).
 * Col 1:Name(Last,First)  2:RoundRecapUrl  4:Preseason
 * 5:Corica  6:CoyoteCreek  7:Chardonnay  8:PoppyRidge  9:Presidio
 */
export function parseHandicaps(rows: string[][]): HandicapData[] {
  const data: HandicapData[] = [];
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    const rawName = (r[1] || "").trim();
    if (!rawName || rawName === "RR Home Page") continue;
    const name = normalizeSheetName(rawName);
    const rrUrl = (r[2] || "").trim();
    const parseHcp = (val: string) => {
      const v = parseFloat((val || "").trim());
      return isNaN(v) ? null : v;
    };
    data.push({
      name,
      slug: slugifyName(name),
      roundRecapUrl: rrUrl.startsWith("http") ? rrUrl : null,
      preseason: parseHcp(r[4]),
      corica: parseHcp(r[5]),
      coyoteCreek: parseHcp(r[6]),
      chardonnay: parseHcp(r[7]),
      poppyRidge: parseHcp(r[8]),
      presidio: parseHcp(r[9]),
    });
  }
  return data;
}

/**
 * Extract the RR Home Page URL from the Handicaps tab.
 * Scans for a row where column 1 contains "RR Home Page".
 */
export function parseRRHomePageUrl(rows: string[][]): string | null {
  for (let i = 0; i < rows.length; i++) {
    const label = (rows[i][1] || "").trim();
    if (label === "RR Home Page") {
      const url = (rows[i][2] || "").trim();
      return url.startsWith("http") ? url : null;
    }
  }
  return null;
}
