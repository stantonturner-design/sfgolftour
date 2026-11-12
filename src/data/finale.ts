/** Championship presentation only. Never used to calculate season scoring or eligibility. */
export interface ChampionshipPlayer {
  id: string;
  name: string;
}

export interface ChampionshipGroup {
  id: string;
  label: string;
  teeTime: string | null;
  startingInformation: string | null;
  playerIds: string[];
}

export interface ChampionshipDetail {
  label: string;
  detail: string | null;
}

export interface ChampionshipResults {
  regulationLeaderboard: { playerId: string; score: number }[];
  playoffQualifiers: string[];
  playoffResults: { playerId: string; score: number }[];
  championId: string | null;
  photos: { src: string; alt: string }[];
  recap: string | null;
}

export const FINALE_CHAMPIONSHIP = {
  title: "2026 SFGT Finale",
  pageTitle: "2026 SFGT Tour Championship",
  subtitle: "The Road to the Championship Ends Here.",
  pageSubtitle: "The final stop. 24 competitors. One champion.",
  date: "November 14, 2026",
  weekday: "Saturday",
  venue: null as string | null,
  regulationCourse: "South Course",
  playoffCourse: "North Course",
  qualifyingPlayers: 24,
  roundHoles: 18,
  playoffPlayers: 4,
  playoffHoles: 9,
  prizePurse: null as string | null,
  qualifiedPlayers: [] as ChampionshipPlayer[],
  groups: [] as ChampionshipGroup[],
  schedule: [
    { label: "Arrival & check-in", detail: null },
    { label: "Opening announcements", detail: null },
    { label: "Championship round start", detail: null },
    { label: "Scorecard submission", detail: null },
    { label: "Playoff", detail: null },
    { label: "Awards & prize presentation", detail: null },
  ] as ChampionshipDetail[],
  scoring: [
    { label: "Scoring format", detail: null },
    { label: "Handicap application", detail: null },
    { label: "Determining the top four finalists", detail: null },
    { label: "Tiebreakers for playoff entry", detail: null },
    { label: "Nine-hole playoff scoring", detail: null },
    { label: "Resolving a final tie", detail: null },
    { label: "Scorecard verification", detail: null },
  ] as ChampionshipDetail[],
  rules: [
    { label: "Tees", detail: null },
    { label: "Handicaps", detail: null },
    { label: "Pace of play", detail: null },
    { label: "Playing conditions", detail: null },
    { label: "Scorecard requirements", detail: null },
    { label: "On-course procedures", detail: null },
    { label: "Committee rulings", detail: null },
  ] as ChampionshipDetail[],
  awards: [
    { label: "Tour Champion payout", detail: null },
    { label: "Additional placement payouts", detail: null },
    { label: "Special awards", detail: null },
    { label: "Trophy presentation", detail: null },
  ] as ChampionshipDetail[],
  results: null as ChampionshipResults | null,
};

export function getChampionshipGroupPlayers(
  group: ChampionshipGroup,
  players: ChampionshipPlayer[] = FINALE_CHAMPIONSHIP.qualifiedPlayers,
) {
  return group.playerIds.flatMap((id) => {
    const player = players.find((candidate) => candidate.id === id);
    return player ? [player] : [];
  });
}