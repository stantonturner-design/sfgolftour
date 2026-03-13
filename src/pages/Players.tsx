import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
};

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
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
          });
        }
        setPlayers(parsed);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const initials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="container py-12">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="font-display text-4xl font-bold">Player Directory</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Browse all {players.length > 0 ? `${players.length} ` : ""}tour members and their stats.
      </p>

      {loading && (
        <p className="mt-12 text-center text-muted-foreground">Loading players…</p>
      )}

      {!loading && players.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {players.map((p) => (
            <Card key={p.name} className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {initials(p.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Rank #{p.rank} · {p.points} pts
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>{p.events} events</span>
                    <span>{p.wins} wins</span>
                    <span>{p.birdies} birdies</span>
                    {p.top5 > 0 && <span>{p.top5} top-5</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Players;
