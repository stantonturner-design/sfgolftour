import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ClipboardList, ArrowLeft, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parseCSV } from "@/lib/csv";

import { TEE_SHEET_URL } from "@/lib/playerUtils";

// Map event names to section headers in the sheet
const EVENT_SECTION_MAP: Record<string, string[]> = {
  Baylands: ["Baylands"],
  Callippe: ["Callippe Preserve", "Callippe"],
  "Poppy Hills": ["Poppy Hills (Pebble Beach)", "Poppy Hills"],
  Presidio: ["Presidio"],
  Corica: ["Corica NORTH", "Corica"],
};

interface TeeTime {
  date: string;
  day: string;
  time: string;
  players: string[];
}

const TeeSheet = () => {
  const [searchParams] = useSearchParams();
  const eventName = searchParams.get("event") || "";
  const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(SHEET_URL)
      .then((r) => r.text())
      .then((text) => {
        const rows = parseCSV(text);

        // Find matching section headers for this event
        const sectionNames = EVENT_SECTION_MAP[eventName] || [eventName];

        // Find the section start
        let sectionStart = -1;
        for (let i = 0; i < rows.length; i++) {
          const firstCell = rows[i]?.[0]?.trim() || "";
          if (sectionNames.some((s) => firstCell.toLowerCase().includes(s.toLowerCase()))) {
            sectionStart = i;
            break;
          }
        }

        if (sectionStart === -1) {
          setTeeTimes([]);
          return;
        }

        // Parse rows after section header until next empty row or next section
        const parsed: TeeTime[] = [];
        for (let i = sectionStart + 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row) break;

          const firstCell = row[0]?.trim() || "";

          // Empty row = end of section
          if (!firstCell && !row[1]?.trim() && !row[2]?.trim()) break;

          // Skip header rows (Date, Day, Time...)
          if (firstCell === "Date" || firstCell === "Legend:") continue;

          // Skip AERATION DAYS
          if (row[3]?.trim()?.includes("AERATION")) continue;

          // Valid tee time row: has a date-like first cell and at least one player
          const players = [row[3], row[4], row[5], row[6]]
            .map((p) => p?.trim() || "")
            .filter((p) => p && p !== "Booked" && p !== "Open");

          if (players.length === 0) continue;

          parsed.push({
            date: firstCell,
            day: row[1]?.trim() || "",
            time: row[2]?.trim() || "",
            players,
          });
        }

        setTeeTimes(parsed);
      })
      .catch(() => setError("Unable to load tee sheet data."))
      .finally(() => setLoading(false));
  }, [eventName]);

  return (
    <div className="container py-16">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/events">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Events
        </Link>
      </Button>

      <div className="flex items-center gap-3">
        <ClipboardList className="h-8 w-8 text-primary" />
        <h1 className="font-display text-4xl font-bold">Tee Sheet</h1>
      </div>
      <p className="mt-2 text-muted-foreground">{eventName} — Tee Times</p>

      {loading && <p className="mt-8 text-muted-foreground">Loading tee sheet…</p>}
      {error && <p className="mt-8 text-destructive">{error}</p>}

      {!loading && !error && teeTimes.length === 0 && (
        <p className="mt-8 text-muted-foreground">No tee sheet data available for this event.</p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teeTimes.map((tt, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {tt.time}
                </span>
                <Badge variant="outline" className="text-xs">
                  {tt.date} ({tt.day})
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tt.players.map((player) => (
                <div
                  key={player}
                  className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm font-medium"
                >
                  {player}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeeSheet;
