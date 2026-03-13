import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { parseCSV } from "@/lib/csv";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFoFbbyxvSushAcAppZY8YEP-cDAXH5GhQCewq4QOgIW-WqIW7SDcHX4Xsz2UeP7tI4OYAjZTgQVOc/pub?gid=191837314&single=true&output=csv";

const EVENT_NAMES = ["Baylands", "Callippe", "Poppy Hills", "Presidio", "Corica"];

type PlayerEvent = { name: string; score: number; rank: number };

const Events = () => {
  const [eventData, setEventData] = useState<Record<string, PlayerEvent[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        const rows = parseCSV(text);
        const data: Record<string, PlayerEvent[]> = {};
        EVENT_NAMES.forEach((evt, idx) => {
          const col = 15 + idx; // columns 15-19 hold event scores
          const players: PlayerEvent[] = [];
          for (let i = 3; i < rows.length; i++) {
            const r = rows[i];
            const score = parseFloat(r[col]) || 0;
            const name = r[2] || "";
            if (score > 0 && name) players.push({ name, score, rank: 0 });
          }
          players.sort((a, b) => b.score - a.score);
          players.forEach((p, i) => (p.rank = i + 1));
          data[evt] = players;
        });
        setEventData(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-16">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="font-display text-4xl font-bold">Event Schedule</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Results from each of the 5 tour events this season.
      </p>

      {loading ? (
        <p className="mt-12 text-center text-muted-foreground">Loading events…</p>
      ) : (
        <Tabs defaultValue={EVENT_NAMES[0]} className="mt-8">
          <TabsList className="flex flex-wrap h-auto gap-1">
            {EVENT_NAMES.map((evt) => (
              <TabsTrigger key={evt} value={evt}>{evt}</TabsTrigger>
            ))}
          </TabsList>

          {EVENT_NAMES.map((evt) => (
            <TabsContent key={evt} value={evt}>
              <div className="overflow-x-auto rounded-lg border mt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/60">
                      <TableHead className="w-16 text-center">#</TableHead>
                      <TableHead>Golfer</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(eventData[evt] || []).map((p) => (
                      <TableRow
                        key={p.name}
                        className={p.rank <= 3 ? "bg-primary/5 font-medium" : ""}
                      >
                        <TableCell className="text-center font-bold">{p.rank}</TableCell>
                        <TableCell className="whitespace-nowrap">{p.name}</TableCell>
                        <TableCell className="text-right font-semibold">{p.score}</TableCell>
                      </TableRow>
                    ))}
                    {(eventData[evt] || []).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                          No results yet for this event.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default Events;
