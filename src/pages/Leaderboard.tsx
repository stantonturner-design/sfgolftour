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
import { parseCSV } from "@/lib/csv";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFoFbbyxvSushAcAppZY8YEP-cDAXH5GhQCewq4QOgIW-WqIW7SDcHX4Xsz2UeP7tI4OYAjZTgQVOc/pub?gid=191837314&single=true&output=csv";

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
  eventScores: { name: string; score: number }[];
};

const EVENT_NAMES = ["Baylands", "Callippe", "Poppy Hills", "Presidio", "Corica"];

const Leaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        const rows = parseCSV(text);
        // Data rows start at index 3 (row 4), columns offset by 1 (col B = index 1)
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
            eventScores: EVENT_NAMES.map((name, idx) => ({
              name,
              score: parseFloat(r[15 + idx]) || 0,
            })),
          });
        }
        setPlayers(parsed);
      })
      .catch(() => setError("Failed to load standings. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-16">
      <div className="flex items-center gap-3">
        <Trophy className="h-8 w-8 text-primary" />
        <h1 className="font-display text-4xl font-bold">Leaderboard &amp; Standings</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Season-long standings and per-event results — powered by the live Google Sheet.
      </p>

      {loading && (
        <p className="mt-12 text-center text-muted-foreground">Loading standings…</p>
      )}

      {error && (
        <p className="mt-12 text-center text-destructive">{error}</p>
      )}

      {!loading && !error && players.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/60">
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead>Golfer</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Birdies</TableHead>
                <TableHead className="text-right">Events</TableHead>
                <TableHead className="text-right">Wins</TableHead>
                <TableHead className="text-right">Top 5</TableHead>
                <TableHead className="text-right">Top 10</TableHead>
                {EVENT_NAMES.map((e) => (
                  <TableHead key={e} className="text-right whitespace-nowrap">
                    {e}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((p) => (
                <TableRow
                  key={p.rank}
                  className={p.rank <= 3 ? "bg-primary/5 font-medium" : ""}
                >
                  <TableCell className="text-center font-bold">{p.rank}</TableCell>
                  <TableCell className="whitespace-nowrap">{p.name}</TableCell>
                  <TableCell className="text-right font-semibold">{p.points}</TableCell>
                  <TableCell className="text-right">{p.birdies}</TableCell>
                  <TableCell className="text-right">{p.events}</TableCell>
                  <TableCell className="text-right">{p.wins}</TableCell>
                  <TableCell className="text-right">{p.top5}</TableCell>
                  <TableCell className="text-right">{p.top10}</TableCell>
                  {p.eventScores.map((es) => (
                    <TableCell key={es.name} className="text-right">
                      {es.score > 0 ? es.score : "—"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
