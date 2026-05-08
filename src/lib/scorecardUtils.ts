import { slugifyName } from "./playerUtils";

const SHEET_BASE =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuyF0EPQcm-z2Y3vAx4nPWoIQ3tnghemFJMVGmKQYUL49aLHLr9aLxZO7cryubxjGB-C4PNes_J35-/pub";

// Slug → CSV URL for hole-by-hole event sheet. Empty/missing = no scorecard yet.
export const SCORECARD_URLS: Record<string, string | null> = {
  corica: `${SHEET_BASE}?gid=397283659&single=true&output=csv`,
  "coyote-creek": null,
  chardonnay: null,
  "poppy-ridge": null,
  presidio: null,
  finale: null,
};

export type HoleScores = number[]; // 18 entries (NaN if blank)

export type PlayerScorecard = {
  name: string;
  slug: string;
  holes: (number | null)[]; // length 18
  out: number | null;
  in_: number | null;
  total: number | null;
  hcp: number | null;
  net: number | null;
};

export type CourseScorecard = {
  par: (number | null)[]; // length 18
  parOut: number | null;
  parIn: number | null;
  parTotal: number | null;
  hcpRanking: (number | null)[]; // men's hdcp per hole, length 18
};

export type EventScorecard = {
  course: CourseScorecard;
  players: PlayerScorecard[];
};

const num = (v: string): number | null => {
  const t = (v || "").trim();
  if (!t) return null;
  const n = parseInt(t, 10);
  return isNaN(n) ? null : n;
};

const sumHoles = (holes: (number | null)[]): number | null => {
  let total = 0;
  let any = false;
  for (const h of holes) {
    if (h != null) {
      total += h;
      any = true;
    }
  }
  return any ? total : null;
};

const SKIP_LABELS = new Set(["", "HOLE", "BLACK", "BLUE", "WHITE", "RED", "PAR"]);

/**
 * Parse a Corica-style event sheet into a hole-by-hole scorecard.
 * Column layout (0-indexed):
 *  1: Name | 2..10: holes 1-9 | 11: OUT | 13..21: holes 10-18 | 22: IN | 23: TOT | 24: HCP | 25: NET
 * Par row has label "PAR" in col 1.
 * Men's hdcp row has "RED" in col 1 and the hdcp values in cols 2..10, 13..21 (but offset — see below).
 */
export function parseEventScorecard(rows: string[][]): EventScorecard {
  let par: (number | null)[] = Array(18).fill(null);
  let hcpRanking: (number | null)[] = Array(18).fill(null);
  const players: PlayerScorecard[] = [];

  const readHoles = (r: string[]): (number | null)[] => {
    const front = [2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => num(r[i] || ""));
    const back = [13, 14, 15, 16, 17, 18, 19, 20, 21].map((i) => num(r[i] || ""));
    return [...front, ...back];
  };

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const label = (r[1] || "").trim();
    const upper = label.toUpperCase();

    if (upper === "PAR") {
      par = readHoles(r);
      continue;
    }
    if (upper === "RED") {
      // Men's Hdcp ranks live on this row's hole columns
      hcpRanking = readHoles(r);
      continue;
    }
    if (SKIP_LABELS.has(upper)) continue;
    // Player row: must have a name and at least one hole or total
    const holes = readHoles(r);
    const total = num(r[23] || "");
    const hasAny = total != null || holes.some((h) => h != null);
    if (!hasAny) continue;

    players.push({
      name: label,
      slug: slugifyName(label),
      holes,
      out: sumHoles(holes.slice(0, 9)),
      in_: sumHoles(holes.slice(9, 18)),
      total,
      hcp: num(r[24] || ""),
      net: num(r[25] || ""),
    });
  }

  return {
    course: {
      par,
      parOut: sumHoles(par.slice(0, 9)),
      parIn: sumHoles(par.slice(9, 18)),
      parTotal: sumHoles(par),
      hcpRanking,
    },
    players,
  };
}

// Display metadata for each event (name + course label) keyed by slug
export const EVENT_META: Record<string, { name: string; subtitle: string }> = {
  corica: { name: "Corica", subtitle: "The North Course" },
  "coyote-creek": { name: "Coyote Creek", subtitle: "The Valley Course" },
  chardonnay: { name: "Chardonnay", subtitle: "" },
  "poppy-ridge": { name: "Poppy Ridge", subtitle: "" },
  presidio: { name: "Presidio", subtitle: "" },
  finale: { name: "Finale", subtitle: "Details coming soon" },
};
