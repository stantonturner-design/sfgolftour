import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { parseCSV } from "@/lib/csv";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLeaderboard from "@/components/leaderboard/MobileLeaderboard";

const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTFoFbbyxvSushAcAppZY8YEP-cDAXH5GhQCewq4QOgIW-WqIW7SDcHX4Xsz2UeP7tI4OYAjZTgQVOc/pub?gid=191837314&single=true&output=csv";

const EVENT_NAMES = ["Baylands", "Callippe", "Poppy Hills", "Presidio", "Corica"];

type Player = {
  rank: number;
  name: string;
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
};

const Leaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [finishView, setFinishView] = useState<string>("event");
  const isMobile = useIsMobile();

  useEffect(() => {
    fetch(SHEET_URL).
    then((res) => res.text()).
    then((text) => {
      const rows = parseCSV(text);
      const parsed: Player[] = [];
      for (let i = 3; i < rows.length; i++) {
        const r = rows[i];
        const rank = parseInt(r[1]);
        if (isNaN(rank)) continue;
        parsed.push({
          rank,
          name: r[2] || "",
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
          parseFloat(r[19]) || 0]

        });
      }
      parsed.sort((a, b) => b.points - a.points);
      parsed.forEach((p, i) => p.rank = i + 1);
      setPlayers(parsed);
    }).
    catch(() => setError("Failed to load standings. Please try again later.")).
    finally(() => setLoading(false));
  }, []);

  const finishHeaders =
  finishView === "event" ?
  ["Wins", "Top 5", "Top 10"] :
  ["Net Wins", "Net Top 5", "Net Top 10"];

  const getFinishValues = (p: Player) =>
  finishView === "event" ?
  [p.wins, p.top5, p.top10] :
  [p.netWins, p.netTop5, p.netTop10];

  return (
    <div className="container py-16">
      <div className="flex items-center gap-3">
        <Trophy className="h-8 w-8 text-primary" />
        <h1 className="font-display text-4xl font-bold">Leaderboard &amp; Standings</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Season-long standings and per-event results — powered by the live Google Sheet.
      </p>

      {loading &&
      <p className="mt-12 text-center text-muted-foreground">Loading standings…</p>
      }

      {error &&
      <p className="mt-12 text-center text-destructive">{error}</p>
      }

      {!loading && !error && players.length > 0 && isMobile && (
        <MobileLeaderboard players={players} eventNames={EVENT_NAMES} />
      )}

      {!loading && !error && players.length > 0 && !isMobile &&
      <>
          {/* Toggle positioned above table, aligned right over finishes section */}
          <div className="mt-6 flex justify-end">
            <div style={{ marginRight: '90px' }}>
              <ToggleGroup
              type="single"
              value={finishView}
              onValueChange={(v) => v && setFinishView(v)}
              variant="outline"
              size="sm">
              
                <ToggleGroupItem value="event" className="text-xs h-7 px-3">
                  Event Rank
                </ToggleGroupItem>
                <ToggleGroupItem value="net" className="text-xs h-7 px-3">
                  Net Score
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="mt-2 overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                {/* Section header row */}
                <TableRow className="border-b-0">
                  <TableHead colSpan={4} className="bg-secondary/15 text-center text-sm font-bold uppercase tracking-wider text-secondary-foreground border-r">
                    Standings
                  </TableHead>
                  <TableHead colSpan={EVENT_NAMES.length} className="bg-secondary/15 text-center text-sm font-bold uppercase tracking-wider text-secondary-foreground border-r">
                    Event Points
                  </TableHead>
                  <TableHead colSpan={3} className="bg-secondary/15 text-center text-sm font-bold uppercase tracking-wider text-secondary-foreground border-r">
                    {finishView === "event" ? "Event Rank Finishes" : "Net Score Finishes"}
                  </TableHead>
                  <TableHead className="bg-secondary/15 text-center text-sm font-bold uppercase tracking-wider text-secondary-foreground">
                    BIRDIES
                  </TableHead>
                </TableRow>
                {/* Column header row */}
                <TableRow className="bg-muted/60">
                  <TableHead className="w-14 text-center">#</TableHead>
                  <TableHead>Golfer</TableHead>
                  <TableHead className="text-center">Points</TableHead>
                  <TableHead className="text-center border-r">Events</TableHead>
                  {EVENT_NAMES.map((e, i) =>
                <TableHead
                  key={e}
                  className={`text-center whitespace-nowrap ${i === EVENT_NAMES.length - 1 ? "border-r" : ""}`}>
                  
                      {e}
                    </TableHead>
                )}
                  {finishHeaders.map((h, i) =>
                <TableHead
                  key={h}
                  className={`text-center whitespace-nowrap w-[90px] min-w-[90px] max-w-[90px] ${i === finishHeaders.length - 1 ? "border-r" : ""}`}>
                  
                      {h}
                    </TableHead>
                )}
                  <TableHead className="text-center">
                    <div>
                      Total
                    </div>
                    <div className="text-[10px] font-normal text-muted-foreground">{"\n"}</div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((p) => {const finishVals = getFinishValues(p);return (
                  <TableRow
                    key={p.rank}
                    className={p.rank <= 3 ? "bg-primary/5 font-medium" : ""}>
                    
                      <TableCell className="text-center font-bold">{p.rank}</TableCell>
                      <TableCell className="whitespace-nowrap">{p.name}</TableCell>
                      <TableCell className="text-center font-semibold">{p.points}</TableCell>
                      <TableCell className="text-center border-r">{p.events}</TableCell>
                      {p.eventPoints.map((ep, i) =>
                    <TableCell
                      key={i}
                      className={`text-center ${i === EVENT_NAMES.length - 1 ? "border-r" : ""}`}>
                      
                          {ep > 0 ? ep.toFixed(1) : "—"}
                        </TableCell>
                    )}
                      {finishVals.map((v, i) =>
                    <TableCell
                      key={i}
                      className={`text-center w-[90px] min-w-[90px] max-w-[90px] ${i === finishHeaders.length - 1 ? "border-r" : ""}`}>
                      
                          {v}
                        </TableCell>
                    )}
                      <TableCell className="text-center">{p.birdies}</TableCell>
                    </TableRow>);

              })}
              </TableBody>
            </Table>
          </div>
        </>
      }
    </div>);

};

export default Leaderboard;