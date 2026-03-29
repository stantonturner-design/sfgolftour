import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ClipboardList, ArrowLeft, Clock, Users, CalendarDays, Anchor, UserX, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { parseCSV } from "@/lib/csv";
import { slugifyName, parsePlayerRows, SHEET_URL, TEE_SHEET_URL } from "@/lib/playerUtils";

const EVENT_SECTION_MAP: Record<string, string[]> = {
  Corica: ["Corica NORTH", "Corica"],
  "Coyote Creek": ["Coyote Creek"],
  Chardonnay: ["Chardonnay"],
  "Poppy Ridge": ["Poppy Ridge"],
  Presidio: ["Presidio"],
};

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
  openSpots: number;
}

interface DateGroup {
  date: string;
  day: string;
  times: TeeTime[];
  totalOpen: number;
}

/** Try to parse a tee-time date string like "3/17" into a Date in the current year */
function parseTeeDate(dateStr: string): Date | null {
  const parts = dateStr.split("/");
  if (parts.length !== 2) return null;
  const month = parseInt(parts[0], 10) - 1;
  const day = parseInt(parts[1], 10);
  if (isNaN(month) || isNaN(day)) return null;
  return new Date(2026, month, day);
}

function isDatePast(dateStr: string): boolean {
  const d = parseTeeDate(dateStr);
  if (!d) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Consider a date "completed" if it's before today
  return d < today;
}

function buildGroups(teeTimes: TeeTime[]): DateGroup[] {
  const groups: DateGroup[] = [];
  for (const tt of teeTimes) {
    const key = `${tt.date}|${tt.day}`;
    const last = groups[groups.length - 1];
    if (last && `${last.date}|${last.day}` === key) {
      last.times.push(tt);
      last.totalOpen += tt.openSpots;
    } else {
      groups.push({ date: tt.date, day: tt.day, times: [tt], totalOpen: tt.openSpots });
    }
  }
  return groups;
}

/** Status badge component for consistent styling */
function StatusBadge({ openSpots, completed }: { openSpots: number; completed?: boolean }) {
  if (completed) {
    return (
      <Badge variant="secondary" className="border-border bg-muted text-muted-foreground text-xs font-semibold">
        Completed
      </Badge>
    );
  }
  if (openSpots > 0) {
    return (
      <Badge variant="secondary" className="border-primary/20 bg-primary/10 text-primary text-xs font-semibold">
        {openSpots} {openSpots === 1 ? "spot" : "spots"} open
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="border-accent bg-accent/60 text-accent-foreground text-xs font-semibold">
      Full
    </Badge>
  );
}

const TeeSheet = () => {
  const [searchParams] = useSearchParams();
  const eventName = searchParams.get("event") || "";
  const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);
  const [allPlayerNames, setAllPlayerNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUnscheduled, setShowUnscheduled] = useState(false);
  const [activeView, setActiveView] = useState<"upcoming" | "completed">("upcoming");

  const meta = EVENT_META[eventName] || { subtitle: "", anchorDay: "" };

  useEffect(() => {
    Promise.all([
      fetch(TEE_SHEET_URL).then((r) => r.text()),
      fetch(SHEET_URL).then((r) => r.text()),
    ])
      .then(([teeText, rosterText]) => {
        const rows = parseCSV(teeText);
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
        } else {
          const parsed: TeeTime[] = [];
          for (let i = sectionStart + 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row) break;
            const firstCell = row[0]?.trim() || "";
            if (!firstCell && !row[1]?.trim() && !row[2]?.trim()) break;
            if (firstCell === "Date" || firstCell === "Legend:") continue;
            if (row[3]?.trim()?.includes("AERATION")) continue;

            const slots = [row[3], row[4], row[5], row[6]].map((p) => p?.trim() || "");
            const players = slots.filter((p) => p && p !== "Booked" && p !== "Open");
            const openSpots = slots.filter((p) => p === "Open").length;
            if (players.length === 0 && openSpots === 0) continue;

            parsed.push({ date: firstCell, day: row[1]?.trim() || "", time: row[2]?.trim() || "", players, openSpots });
          }
          setTeeTimes(parsed);
        }

        const rosterRows = parseCSV(rosterText);
        const allPlayers = parsePlayerRows(rosterRows);
        setAllPlayerNames(allPlayers.map((p) => p.name));
      })
      .catch(() => setError("Unable to load tee sheet data."))
      .finally(() => setLoading(false));
  }, [eventName]);

  // Split into upcoming and completed
  const { upcomingGroups, completedGroups } = useMemo(() => {
    const allGroups = buildGroups(teeTimes);
    const upcoming: DateGroup[] = [];
    const completed: DateGroup[] = [];

    for (const g of allGroups) {
      if (isDatePast(g.date)) {
        completed.push(g);
      } else {
        upcoming.push(g);
      }
    }

    // Upcoming: open-spot days first, then full days. Chronological within each.
    upcoming.sort((a, b) => {
      const aHasOpen = a.totalOpen > 0 ? 0 : 1;
      const bHasOpen = b.totalOpen > 0 ? 0 : 1;
      if (aHasOpen !== bHasOpen) return aHasOpen - bHasOpen;
      const aDate = parseTeeDate(a.date)?.getTime() || 0;
      const bDate = parseTeeDate(b.date)?.getTime() || 0;
      return aDate - bDate;
    });

    // Within each upcoming group: open times first, then full, chronological within each
    for (const g of upcoming) {
      g.times.sort((a, b) => {
        const aHasOpen = a.openSpots > 0 ? 0 : 1;
        const bHasOpen = b.openSpots > 0 ? 0 : 1;
        return aHasOpen - bHasOpen;
      });
    }

    // Completed: chronological (most recent first)
    completed.sort((a, b) => {
      const aDate = parseTeeDate(a.date)?.getTime() || 0;
      const bDate = parseTeeDate(b.date)?.getTime() || 0;
      return bDate - aDate;
    });

    return { upcomingGroups: upcoming, completedGroups: completed };
  }, [teeTimes]);

  const scheduledNames = useMemo(
    () => new Set(teeTimes.flatMap((tt) => tt.players)),
    [teeTimes]
  );

  const totalPlayers = scheduledNames.size;

  const unscheduledPlayers = useMemo(() => {
    if (allPlayerNames.length === 0) return [];
    return allPlayerNames
      .filter((name) => !scheduledNames.has(name))
      .sort((a, b) => a.localeCompare(b));
  }, [allPlayerNames, scheduledNames]);

  const displayGroups = activeView === "upcoming" ? upcomingGroups : completedGroups;
  const isCompleted = activeView === "completed";

  return (
    <div className="container py-12 md:py-16">
      {/* Back nav */}
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
        <Link to="/events">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Events
        </Link>
      </Button>

      {/* Event header */}
      <div className="mb-6">
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
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4 text-sm text-muted-foreground">
            {meta.anchorDay && meta.anchorDay !== "TBD" && (
              <div className="flex items-center gap-1.5">
                <Anchor className="h-3.5 w-3.5 text-primary" />
                <span>Anchor Day: <span className="font-semibold text-foreground">{meta.anchorDay}</span></span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-primary" />
              <span><span className="font-semibold text-foreground">{totalPlayers}</span> scheduled</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-primary" />
              <span><span className="font-semibold text-foreground">{teeTimes.length}</span> groups</span>
            </div>
            {unscheduledPlayers.length > 0 && (
              <button
                onClick={() => setShowUnscheduled(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-accent hover:bg-accent/80 transition-colors cursor-pointer"
              >
                <UserX className="h-3.5 w-3.5 text-primary" />
                <span className="text-primary font-semibold">{unscheduledPlayers.length} not scheduled</span>
              </button>
            )}
          </div>
        )}
      </div>

      {loading && <p className="text-muted-foreground">Loading tee sheet…</p>}
      {error && <p className="text-destructive">{error}</p>}

      {!loading && !error && teeTimes.length === 0 && (
        <p className="text-muted-foreground">No tee sheet data available for this event.</p>
      )}

      {/* Toggle: Upcoming / Completed */}
      {!loading && !error && teeTimes.length > 0 && (
        <>
          <div className="flex gap-1 p-1 rounded-lg bg-muted mb-6 w-fit">
            <button
              onClick={() => setActiveView("upcoming")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeView === "upcoming"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Upcoming
              {upcomingGroups.length > 0 && (
                <span className="ml-1.5 text-xs opacity-70">({upcomingGroups.reduce((s, g) => s + g.times.length, 0)})</span>
              )}
            </button>
            <button
              onClick={() => setActiveView("completed")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeView === "completed"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Completed
              {completedGroups.length > 0 && (
                <span className="ml-1.5 text-xs opacity-70">({completedGroups.reduce((s, g) => s + g.times.length, 0)})</span>
              )}
            </button>
          </div>

          {displayGroups.length === 0 && (
            <p className="text-muted-foreground text-sm">
              {isCompleted ? "No completed tee times yet." : "No upcoming tee times."}
            </p>
          )}

          {/* Tee time accordion */}
          <Accordion
            type="multiple"
            defaultValue={[]}
            key={activeView}
            className="space-y-3"
          >
            {displayGroups.map((group) => (
              <AccordionItem key={group.date} value={group.date} className="border border-border rounded-xl overflow-hidden bg-card">
                <AccordionTrigger className="px-4 md:px-5 py-4 hover:no-underline hover:bg-muted/50">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <CalendarDays className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-base font-bold ${isCompleted ? "text-muted-foreground" : "text-foreground"}`}>
                        {group.day}, {group.date}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        · {group.times.length} {group.times.length === 1 ? "group" : "groups"}
                      </span>
                      <StatusBadge openSpots={group.totalOpen} completed={isCompleted} />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-5 pb-4 pt-1">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.times.map((tt, idx) => (
                      <TeeTimeCard key={idx} tt={tt} completed={isCompleted} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}

      {/* Unscheduled players modal */}
      <Dialog open={showUnscheduled} onOpenChange={setShowUnscheduled}>
        <DialogContent className="max-w-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-primary" />
              Not Yet Scheduled
            </DialogTitle>
            <DialogDescription>
              {unscheduledPlayers.length} player{unscheduledPlayers.length !== 1 ? "s" : ""} still need to schedule their round for {eventName}.
            </DialogDescription>
          </DialogHeader>
          <div className="divide-y divide-border overflow-y-auto max-h-[50vh] -mx-1 px-1">
            {unscheduledPlayers.map((name) => (
              <Link
                key={name}
                to={`/player/${slugifyName(name)}`}
                onClick={() => setShowUnscheduled(false)}
                className="flex items-center gap-3 py-2.5 px-2 text-sm font-medium text-foreground hover:bg-accent/40 rounded-md transition-colors"
              >
                <span className="flex items-center justify-center h-7 w-7 rounded-full bg-accent text-xs font-bold text-primary shrink-0">
                  {name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
                </span>
                {name}
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

/** Individual tee time card */
function TeeTimeCard({ tt, completed }: { tt: TeeTime; completed: boolean }) {
  return (
    <Card className="overflow-hidden border-border">
      <div className={`flex items-center justify-between px-4 py-3 border-b border-border ${
        completed ? "bg-muted/40" : "bg-accent/30"
      }`}>
        <div className="flex items-center gap-2">
          <Clock className={`h-4 w-4 ${completed ? "text-muted-foreground" : "text-primary"}`} />
          <span className={`text-base font-bold ${completed ? "text-muted-foreground" : "text-foreground"}`}>{tt.time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary" className="text-xs font-semibold border-border">
            {tt.players.length} {tt.players.length === 1 ? "player" : "players"}
          </Badge>
          {!completed && tt.openSpots > 0 && (
            <StatusBadge openSpots={tt.openSpots} />
          )}
        </div>
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
  );
}

export default TeeSheet;
