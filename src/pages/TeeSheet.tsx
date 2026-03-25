import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ClipboardList, ArrowLeft, Clock, Users, CalendarDays, Anchor } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parseCSV } from "@/lib/csv";
import { slugifyName, TEE_SHEET_URL } from "@/lib/playerUtils";

// Map event names to section headers in the sheet
const EVENT_SECTION_MAP: Record<string, string[]> = {
  Corica: ["Corica NORTH", "Corica"],
  "Coyote Creek": ["Coyote Creek"],
  Chardonnay: ["Chardonnay"],
  "Poppy Ridge": ["Poppy Ridge"],
  Presidio: ["Presidio"],
};

// Event metadata for context
const EVENT_META: Record<string, { subtitle: string; anchorDay: string }> = {
  Corica: { subtitle: "The North Course", anchorDay: "April 4" },
  "Coyote Creek": { subtitle: "The Valley Course", anchorDay: "May 31" },
  Chardonnay: { subtitle: "", anchorDay: "July 11" },
  "Poppy Ridge": { subtitle: "", anchorDay: "TBD" },
  Presidio: { subtitle: "", anchorDay: "TBD" },
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

  const meta = EVENT_META[eventName] || { subtitle: "", anchorDay: "" };

  useEffect(() => {
    fetch(TEE_SHEET_URL)
      .then((r) => r.text())
      .then((text) => {
        const rows = parseCSV(text);
        const sectionNames = EVENT_SECTION_MAP[eventName] || [eventName];

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

        const parsed: TeeTime[] = [];
        for (let i = sectionStart + 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row) break;

          const firstCell = row[0]?.trim() || "";
          if (!firstCell && !row[1]?.trim() && !row[2]?.trim()) break;
          if (firstCell === "Date" || firstCell === "Legend:") continue;
          if (row[3]?.trim()?.includes("AERATION")) continue;

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

  // Group tee times by date for smarter display
  const groupedByDate = useMemo(() => {
    const groups: { date: string; day: string; times: TeeTime[] }[] = [];
    for (const tt of teeTimes) {
      const key = `${tt.date}|${tt.day}`;
      const last = groups[groups.length - 1];
      if (last && `${last.date}|${last.day}` === key) {
        last.times.push(tt);
      } else {
        groups.push({ date: tt.date, day: tt.day, times: [tt] });
      }
    }
    return groups;
  }, [teeTimes]);

  const totalPlayers = useMemo(
    () => new Set(teeTimes.flatMap((tt) => tt.players)).size,
    [teeTimes]
  );

  const singleDate = groupedByDate.length === 1;

  return (
    <div className="container py-12 md:py-16">
      {/* Back nav */}
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
        <Link to="/events">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Events
        </Link>
      </Button>

      {/* Event header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <ClipboardList className="h-5 w-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Tee Sheet</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{eventName}</h1>
        {meta.subtitle && (
          <p className="text-base text-muted-foreground mt-0.5">{meta.subtitle}</p>
        )}

        {/* Stats bar */}
        {!loading && !error && teeTimes.length > 0 && (
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
            {meta.anchorDay && meta.anchorDay !== "TBD" && (
              <div className="flex items-center gap-1.5">
                <Anchor className="h-3.5 w-3.5 text-primary" />
                <span>Anchor Day: <span className="font-semibold text-foreground">{meta.anchorDay}</span></span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-primary" />
              <span><span className="font-semibold text-foreground">{totalPlayers}</span> players</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-primary" />
              <span><span className="font-semibold text-foreground">{teeTimes.length}</span> groups</span>
            </div>
          </div>
        )}
      </div>

      {loading && <p className="text-muted-foreground">Loading tee sheet…</p>}
      {error && <p className="text-destructive">{error}</p>}

      {!loading && !error && teeTimes.length === 0 && (
        <p className="text-muted-foreground">No tee sheet data available for this event.</p>
      )}

      {/* Tee time cards grouped by date in accordion */}
      {groupedByDate.length > 0 && (
        <Accordion type="multiple" defaultValue={groupedByDate.map((g) => g.date)} className="space-y-3">
          {groupedByDate.map((group) => (
            <AccordionItem key={group.date} value={group.date} className="border rounded-xl overflow-hidden bg-card">
              <AccordionTrigger className="px-4 md:px-5 py-4 hover:no-underline hover:bg-accent/30">
                <div className="flex items-center gap-3 text-left">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                    <CalendarDays className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-base font-bold text-foreground">
                      {group.day}, {group.date}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      · {group.times.length} {group.times.length === 1 ? "group" : "groups"}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 md:px-5 pb-4 pt-1">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.times.map((tt, idx) => (
                    <Card key={idx} className="overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 bg-secondary/60 border-b border-border">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-base font-bold text-foreground">{tt.time}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs font-semibold">
                          {tt.players.length} players
                        </Badge>
                      </div>
                      <CardContent className="p-0">
                        {tt.players.map((player, pIdx) => (
                          <Link
                            key={player}
                            to={`/player/${slugifyName(player)}`}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent/40 transition-colors ${
                              pIdx < tt.players.length - 1 ? "border-b border-border/50" : ""
                            }`}
                          >
                            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-xs font-bold text-primary shrink-0">
                              {pIdx + 1}
                            </span>
                            {player}
                          </Link>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default TeeSheet;
