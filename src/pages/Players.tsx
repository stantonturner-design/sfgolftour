import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { parseCSV } from "@/lib/csv";
import {
  SHEET_URL, parsePlayerRows, getInitials,
  type PlayerData,
} from "@/lib/playerUtils";

const Players = () => {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        const parsed = parsePlayerRows(parseCSV(text));
        // Sort alphabetically by first name
        parsed.sort((a, b) => a.name.localeCompare(b.name));
        setPlayers(parsed);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
            <Link key={p.slug} to={`/players/${p.slug}`}>
              <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full cursor-pointer">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                    {getInitials(p.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Rank #{p.rank} · {p.points.toFixed(1)} pts
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Players;
