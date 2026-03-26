import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Trophy, Target, Award, Star, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { parseCSV } from "@/lib/csv";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  SHEET_URL, CORICA_URL, HANDICAPS_URL, EVENT_NAMES,
  parsePlayerRows, parseCoricaResults, parseHandicaps, getInitials,
  type PlayerData, type CoricaResult, type HandicapData,
} from "@/lib/playerUtils";

const PROFILE_EVENTS = ["Corica", "Coyote Creek", "Chardonnay", "Poppy Ridge", "Presidio", "Finale"];

type EventRowData = {
  played: boolean;
  grossScore: number | null;
  netScore: number | null;
  handicap: number | null;
  points: number;
  grossFinish: string;
  netFinish: string;
};

const PlayerProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [coricaResults, setCoricaResults] = useState<CoricaResult[]>([]);
  const [handicaps, setHandicaps] = useState<HandicapData[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    Promise.all([
      fetch(SHEET_URL).then((r) => r.text()),
      fetch(CORICA_URL).then((r) => r.text()),
      fetch(HANDICAPS_URL).then((r) => r.text()),
    ])
      .then(([leaderboardText, coricaText, handicapsText]) => {
        setPlayers(parsePlayerRows(parseCSV(leaderboardText)));
        setCoricaResults(parseCoricaResults(parseCSV(coricaText)));
        setHandicaps(parseHandicaps(parseCSV(handicapsText)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const player = players.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="container py-16 text-center text-muted-foreground">
        Loading player profile…
      </div>
    );
  }

  if (!player) {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg text-muted-foreground">Player not found.</p>
        <Link to="/players" className="mt-4 inline-block text-primary underline">
          ← Back to Player Directory
        </Link>
      </div>
    );
  }

  const corica = coricaResults.find((c) => c.slug === player.slug);
  const hcpData = handicaps.find((h) => h.slug === player.slug);

  const statCards = [
    { label: "Wins", value: player.wins },
    { label: "Top 5", value: player.top5 },
    { label: "Top 10", value: player.top10 },
    { label: "Net Wins", value: player.netWins },
    { label: "Net Top 5", value: player.netTop5 },
    { label: "Net Top 10", value: player.netTop10 },
  ];

  const getEventData = (eventName: string): EventRowData => {
    const eventIdx: Record<string, number> = {
      Corica: 0, "Coyote Creek": 1, Chardonnay: 2, "Poppy Ridge": 3, Presidio: 4,
    };
    const idx = eventIdx[eventName];
    const pts = idx !== undefined ? (player.eventPoints[idx] || 0) : 0;
    const played = pts > 0;

    if (eventName === "Corica" && corica) {
      const hcp = corica.handicap ?? (hcpData?.corica ?? null);
      return {
        played: corica.grossScore !== null || corica.points > 0,
        grossScore: corica.grossScore,
        netScore: corica.netScore,
        handicap: hcp,
        points: corica.points,
        grossFinish: corica.grossRank,
        netFinish: corica.netRank,
      };
    }

    const hcpMap: Record<string, keyof HandicapData> = {
      "Coyote Creek": "coyoteCreek", Chardonnay: "chardonnay",
      "Poppy Ridge": "poppyRidge", Presidio: "presidio",
    };
    const hcpKey = hcpMap[eventName];
    const eventHcp = hcpKey && hcpData ? (hcpData[hcpKey] as number | null) : null;

    return {
      played, grossScore: null, netScore: null, handicap: eventHcp,
      points: pts, grossFinish: "—", netFinish: "—",
    };
  };

  // Compute snapshot stats
  const allEventData = PROFILE_EVENTS.map((e) => ({ name: e, ...getEventData(e) }));
  const playedEvents = allEventData.filter((e) => e.played);

  const bestGrossFinish = playedEvents.reduce((best: string, e) => {
    if (e.grossFinish === "—") return best;
    const num = parseInt(e.grossFinish);
    const bestNum = parseInt(best);
    if (isNaN(num)) return best;
    if (best === "—" || isNaN(bestNum) || num < bestNum) return e.grossFinish;
    return best;
  }, "—");

  const bestNetFinish = playedEvents.reduce((best: string, e) => {
    if (e.netFinish === "—") return best;
    const num = parseInt(e.netFinish);
    const bestNum = parseInt(best);
    if (isNaN(num)) return best;
    if (best === "—" || isNaN(bestNum) || num < bestNum) return e.netFinish;
    return best;
  }, "—");

  const bestEvent = playedEvents.length > 0
    ? playedEvents.reduce((a, b) => (b.points > a.points ? b : a)).name
    : "—";

  const mostRecentEvent = playedEvents.length > 0
    ? playedEvents[playedEvents.length - 1].name
    : "—";

  const currentHandicap = (() => {
    if (!hcpData) return "—";
    const keys: (keyof HandicapData)[] = ["presidio", "poppyRidge", "chardonnay", "coyoteCreek", "corica", "preseason"];
    for (const k of keys) {
      const v = hcpData[k];
      if (v !== null && v !== undefined && typeof v === "number") return v;
    }
    return "—";
  })();

  return (
    <div className="container py-8 md:py-12">
      <Link
        to="/players"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Player Directory
      </Link>

      {/* HERO SECTION */}
      <div className="rounded-xl bg-secondary text-secondary-foreground p-6 md:p-10 relative">
        {player.roundRecapUrl && player.roundRecapUrl !== "0" && (
          <Button asChild size="lg" className="absolute top-4 right-4 md:top-6 md:right-6">
            <a href={player.roundRecapUrl} target="_blank" rel="noopener noreferrer">
              Round Recap
              <ExternalLink className="h-4 w-4 ml-1.5" />
            </a>
          </Button>
        )}
        {(!player.roundRecapUrl || player.roundRecapUrl === "0") && (
          <Button size="lg" className="absolute top-4 right-4 md:top-6 md:right-6" disabled>
            Round Recap
            <ExternalLink className="h-4 w-4 ml-1.5" />
          </Button>
        )}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex h-20 w-20 md:h-28 md:w-28 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl md:text-4xl">
            {getInitials(player.name)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              {player.name}
            </h1>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base opacity-90">
              <span className="flex items-center gap-1.5">
                <Trophy className="h-4 w-4" /> Rank #{player.rank}
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="h-4 w-4" /> {player.points.toFixed(1)} Points
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4" /> {player.events} Events
              </span>
              <span>{player.birdies} Birdies</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className="rounded-lg bg-secondary-foreground/10 px-3 py-2.5 text-center">
              <div className="text-xl md:text-2xl font-bold">{s.value}</div>
              <div className="text-xs opacity-75">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <h2 className="font-display text-2xl font-bold mb-4">2026 Season Results</h2>

          {isMobile ? (
            <MobileEventResults getEventData={getEventData} />
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/60">
                    <TableHead>Round</TableHead>
                    <TableHead className="text-center">Handicap</TableHead>
                    <TableHead className="text-center">Gross Score</TableHead>
                    <TableHead className="text-center">Net Score</TableHead>
                    <TableHead className="text-center">Points</TableHead>
                    <TableHead className="text-center">Gross Finish</TableHead>
                    <TableHead className="text-center">Net Finish</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PROFILE_EVENTS.map((event) => {
                    const d = getEventData(event);
                    return (
                      <TableRow key={event}>
                        <TableCell className="font-medium whitespace-nowrap">{event}</TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {d.handicap !== null ? d.handicap : "—"}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {d.grossScore !== null ? d.grossScore : "—"}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {d.netScore !== null ? d.netScore : "—"}
                        </TableCell>
                        <TableCell className="text-center font-semibold">
                          {d.played ? d.points.toFixed(1) : "—"}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {d.played ? d.grossFinish : "—"}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {d.played ? d.netFinish : "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          <p className="mt-3 text-xs text-muted-foreground">
            Detailed scores populate as event results become available in the sheet.
          </p>
        </div>

        {/* RIGHT — Player Snapshot */}
        <div className={isMobile ? "order-first" : ""}>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Player Snapshot
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Best Finish", value: bestGrossFinish },
                  { label: "Best Net Finish", value: bestNetFinish },
                  { label: "Best Event", value: bestEvent },
                  { label: "Most Recent Event", value: mostRecentEvent },
                  { label: "Current Handicap", value: currentHandicap },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>

              {player.roundRecapUrl && player.roundRecapUrl !== "0" ? (
                <Button asChild className="w-full mt-4" size="sm">
                  <a href={player.roundRecapUrl} target="_blank" rel="noopener noreferrer">
                    View Round Recap
                    <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                  </a>
                </Button>
              ) : (
                <Button className="w-full mt-4" size="sm" disabled>
                  Round Recap Unavailable
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

/* Mobile event results — updated column order */
const MobileEventResults = ({
  getEventData,
}: {
  getEventData: (e: string) => EventRowData;
}) => (
  <div className="space-y-3">
    {PROFILE_EVENTS.map((event) => {
      const d = getEventData(event);
      return (
        <div
          key={event}
          className={`rounded-lg border p-4 ${d.played ? "bg-card" : "bg-muted/30"}`}
        >
          <div className="font-semibold text-base mb-2">{event}</div>
          <div className="grid grid-cols-3 gap-y-2 gap-x-4 text-sm">
            <div>
              <div className="text-muted-foreground text-xs">Handicap</div>
              <div className="font-semibold">{d.handicap !== null ? d.handicap : "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Gross</div>
              <div className="font-semibold">{d.grossScore !== null ? d.grossScore : "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Net</div>
              <div className="font-semibold">{d.netScore !== null ? d.netScore : "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Points</div>
              <div className="font-semibold">{d.played ? d.points.toFixed(1) : "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Gross Finish</div>
              <div className="font-semibold">{d.played ? d.grossFinish : "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Net Finish</div>
              <div className="font-semibold">{d.played ? d.netFinish : "—"}</div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default PlayerProfile;
