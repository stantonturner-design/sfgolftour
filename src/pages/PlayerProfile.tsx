import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Trophy, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { parseCSV } from "@/lib/csv";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  SHEET_URL, EVENT_NAMES, parsePlayerRows, getInitials,
  type PlayerData,
} from "@/lib/playerUtils";

const PROFILE_EVENTS = ["Corica", "Coyote Creek", "Chardonnay", "Poppy Ridge", "Presidio", "Finale"];

const PlayerProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetch(SHEET_URL)
      .then((r) => r.text())
      .then((text) => setPlayers(parsePlayerRows(parseCSV(text))))
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

  const statCards = [
    { label: "Wins", value: player.wins },
    { label: "Top 5", value: player.top5 },
    { label: "Top 10", value: player.top10 },
    { label: "Net Wins", value: player.netWins },
    { label: "Net Top 5", value: player.netTop5 },
    { label: "Net Top 10", value: player.netTop10 },
  ];

  // Map event points from the sheet events to the profile events
  // Sheet events: Baylands, Callippe, Poppy Hills, Presidio, Corica
  // For now we map Corica→index4, others→no data yet
  const getEventPoints = (eventName: string): number => {
    const mapping: Record<string, number> = {
      Corica: 4,
      // Future 2026 events will be mapped when columns are available
    };
    const idx = mapping[eventName];
    if (idx !== undefined) return player.eventPoints[idx] || 0;
    return 0;
  };

  return (
    <div className="container py-8 md:py-12">
      {/* Back link */}
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
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Avatar */}
          <div className="flex h-20 w-20 md:h-28 md:w-28 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl md:text-4xl">
            {getInitials(player.name)}
          </div>

          {/* Name + key stats */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              {player.name}
            </h1>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base opacity-90">
              <span className="flex items-center gap-1.5">
                <Trophy className="h-4 w-4" />
                Rank #{player.rank}
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="h-4 w-4" />
                {player.points.toFixed(1)} Points
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4" />
                {player.events} Events
              </span>
              <span>{player.birdies} Birdies</span>
            </div>
          </div>
        </div>

        {/* Season summary strip */}
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3">
          {statCards.map((s) => (
            <div
              key={s.label}
              className="rounded-lg bg-secondary-foreground/10 px-3 py-2.5 text-center"
            >
              <div className="text-xl md:text-2xl font-bold">{s.value}</div>
              <div className="text-xs opacity-75">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT — 2 column on desktop */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* LEFT — Event results table */}
        <div>
          <h2 className="font-display text-2xl font-bold mb-4">2026 Season Results</h2>

          {isMobile ? (
            <MobileEventResults player={player} getEventPoints={getEventPoints} />
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/60">
                    <TableHead>Event</TableHead>
                    <TableHead className="text-center">Gross Score</TableHead>
                    <TableHead className="text-center">Net Score</TableHead>
                    <TableHead className="text-center">Handicap</TableHead>
                    <TableHead className="text-center">Points</TableHead>
                    <TableHead className="text-center">Finish</TableHead>
                    <TableHead className="text-center">Net Finish</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PROFILE_EVENTS.map((event) => {
                    const pts = getEventPoints(event);
                    const played = pts > 0;
                    return (
                      <TableRow key={event}>
                        <TableCell className="font-medium whitespace-nowrap">{event}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{played ? "—" : "—"}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{played ? "—" : "—"}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{played ? "—" : "—"}</TableCell>
                        <TableCell className="text-center font-semibold">
                          {played ? pts.toFixed(1) : "—"}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">{played ? "—" : "—"}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{played ? "—" : "—"}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          <p className="mt-3 text-xs text-muted-foreground">
            Gross Score, Net Score, Handicap, Finish, and Net Finish will populate as event data becomes available in the sheet.
          </p>
        </div>

        {/* RIGHT — Summary sidebar */}
        <div className={isMobile ? "order-first" : ""}>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display text-lg font-bold">Season Summary</h3>
              <div className="space-y-3">
                {[
                  { label: "Rank", value: `#${player.rank}` },
                  { label: "Points", value: player.points.toFixed(1) },
                  { label: "Events", value: player.events },
                  { label: "Wins", value: player.wins },
                  { label: "Birdies", value: player.birdies },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>

              {player.roundRecapUrl && player.roundRecapUrl !== "0" && (
                <Button asChild className="w-full mt-4" size="sm">
                  <a
                    href={player.roundRecapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Full Stats in Round Recap
                    <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

/* Mobile event results — stacked cards instead of table */
const MobileEventResults = ({
  player,
  getEventPoints,
}: {
  player: PlayerData;
  getEventPoints: (e: string) => number;
}) => (
  <div className="space-y-3">
    {PROFILE_EVENTS.map((event) => {
      const pts = getEventPoints(event);
      const played = pts > 0;
      return (
        <div
          key={event}
          className={`rounded-lg border p-4 ${played ? "bg-card" : "bg-muted/30"}`}
        >
          <div className="font-semibold text-base mb-2">{event}</div>
          <div className="grid grid-cols-3 gap-y-2 gap-x-4 text-sm">
            <div>
              <div className="text-muted-foreground text-xs">Points</div>
              <div className="font-semibold">{played ? pts.toFixed(1) : "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Gross</div>
              <div className="font-semibold">—</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Net</div>
              <div className="font-semibold">—</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Handicap</div>
              <div className="font-semibold">—</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Finish</div>
              <div className="font-semibold">—</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Net Finish</div>
              <div className="font-semibold">—</div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default PlayerProfile;
