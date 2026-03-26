import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { parseCSV } from "@/lib/csv";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLeaderboard from "@/components/leaderboard/MobileLeaderboard";
import {
  SHEET_URL, EVENT_NAMES, parsePlayerRows, type PlayerData,
} from "@/lib/playerUtils";

const Leaderboard = () => {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [finishView, setFinishView] = useState<string>("event");
  const isMobile = useIsMobile();

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => setPlayers(parsePlayerRows(parseCSV(text))))
      .catch(() => setError("Failed to load standings. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const finishHeaders =
    finishView === "event"
      ? ["Wins", "Top 5", "Top 10"]
      : ["Net Wins", "Net Top 5", "Net Top 10"];

  const getFinishValues = (p: PlayerData) =>
    finishView === "event"
      ? [p.wins, p.top5, p.top10]
      : [p.netWins, p.netTop5, p.netTop10];

  return (
    <div className="container py-16">
      <div className="flex items-center gap-3">
        <Trophy className="h-8 w-8 text-primary" />
        <h1 className="font-display text-4xl font-bold">Leaderboard &amp; Standings</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Follow the season-long standings, per-event results, and birdie totals in one place.
      </p>

      {loading && <p className="mt-12 text-center text-muted-foreground">Loading standings…</p>}
      {error && <p className="mt-12 text-center text-destructive">{error}</p>}

      {!loading && !error && players.length > 0 && isMobile && (
        <MobileLeaderboard players={players} eventNames={EVENT_NAMES} />
      )}

      {!loading && !error && players.length > 0 && !isMobile && (
        <>
          <div className="mt-6 overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="border-b-0">
                  <TableHead colSpan={4} className="bg-secondary text-center text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground/90 border-r border-secondary-foreground/10 py-2.5">
                    Standings
                  </TableHead>
                  <TableHead colSpan={EVENT_NAMES.length} className="bg-secondary text-center text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground/90 border-r border-secondary-foreground/10 py-2.5">
                    Event Points
                  </TableHead>
                  <TableHead colSpan={3} className="bg-secondary text-center text-secondary-foreground/90 border-r border-secondary-foreground/10 py-2.5 min-w-[280px]">
                    <ToggleGroup
                      type="single"
                      value={finishView}
                      onValueChange={(v) => v && setFinishView(v)}
                      variant="outline"
                      size="sm"
                      className="gap-0"
                    >
                      <ToggleGroupItem value="event" className="text-xs h-7 px-3 rounded-r-none border-r-0 bg-secondary-foreground/5 border-secondary-foreground/20 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary font-semibold">
                        Event Rank Finishes
                      </ToggleGroupItem>
                      <ToggleGroupItem value="net" className="text-xs h-7 px-3 rounded-l-none bg-secondary-foreground/5 border-secondary-foreground/20 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary font-semibold">
                        Net Score Finishes
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </TableHead>
                  <TableHead className="bg-secondary text-center text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground/90 py-2.5">
                    BIRDIES
                  </TableHead>
                </TableRow>
                <TableRow className="bg-muted">
                  <TableHead className="w-14 text-center text-foreground/80 font-semibold">#</TableHead>
                  <TableHead className="text-foreground/80 font-semibold">Golfer</TableHead>
                  <TableHead className="text-center text-foreground/80 font-semibold">Points</TableHead>
                  <TableHead className="text-center border-r text-foreground/80 font-semibold">Events</TableHead>
                  {EVENT_NAMES.map((e, i) => (
                    <TableHead
                      key={e}
                      className={`text-center whitespace-nowrap text-foreground/80 font-semibold ${i === EVENT_NAMES.length - 1 ? "border-r" : ""}`}
                    >
                      {e}
                    </TableHead>
                  ))}
                  {finishHeaders.map((h, i) => (
                    <TableHead
                      key={h}
                      className={`text-center whitespace-nowrap w-[90px] min-w-[90px] max-w-[90px] text-foreground/80 font-semibold ${i === finishHeaders.length - 1 ? "border-r" : ""}`}
                    >
                      {h}
                    </TableHead>
                  ))}
                  <TableHead className="text-center text-foreground/80 font-semibold">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((p) => {
                  const finishVals = getFinishValues(p);
                  return (
                    <TableRow
                      key={p.rank}
                      className={p.rank <= 3 ? "bg-primary/5 font-medium" : p.rank > 24 ? "bg-muted/40" : ""}
                    >
                      <TableCell className="text-center font-bold text-foreground">{p.rank}</TableCell>
                      <TableCell className="whitespace-nowrap text-foreground font-medium">{p.name}</TableCell>
                      <TableCell className="text-center font-semibold text-foreground">{p.points.toFixed(1)}</TableCell>
                      <TableCell className="text-center border-r text-foreground/80">{p.events}</TableCell>
                      {p.eventPoints.map((ep, i) => (
                        <TableCell
                          key={i}
                          className={`text-center text-foreground/80 ${i === EVENT_NAMES.length - 1 ? "border-r" : ""}`}
                        >
                          {ep > 0 ? ep.toFixed(1) : "—"}
                        </TableCell>
                      ))}
                      {finishVals.map((v, i) => (
                        <TableCell
                          key={i}
                          className={`text-center w-[90px] min-w-[90px] max-w-[90px] text-foreground/80 ${i === finishHeaders.length - 1 ? "border-r" : ""}`}
                        >
                          {v}
                        </TableCell>
                      ))}
                      <TableCell className="text-center text-foreground/80">{p.birdies}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
