import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronDown, ClipboardList } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseCSV } from "@/lib/csv";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  SCORECARD_URLS,
  EVENT_META,
  parseEventScorecard,
  type EventScorecard as EventScorecardData,
} from "@/lib/scorecardUtils";
import {
  HANDICAPS_URL,
  SHEET_URL,
  parseHandicaps,
  parsePlayerRows,
  type HandicapData,
} from "@/lib/playerUtils";

// Map event slug → index into PlayerData.eventPoints
const EVENT_POINTS_INDEX: Record<string, number> = {
  corica: 0,
  "coyote-creek": 1,
  chardonnay: 2,
  "poppy-ridge": 3,
  presidio: 4,
};

// Latest posted HI for a player (most recent event back to preseason)
const latestIndex = (h: HandicapData | undefined): number | null => {
  if (!h) return null;
  const keys: (keyof HandicapData)[] = [
    "presidio",
    "poppyRidge",
    "chardonnay",
    "coyoteCreek",
    "corica",
    "preseason",
  ];
  for (const k of keys) {
    const v = h[k];
    if (typeof v === "number") return v;
  }
  return null;
};

const HOLE_NUMS = Array.from({ length: 18 }, (_, i) => i + 1);

// "John Smith" → "J. Smith"; passes through single-word names.
const shortName = (full: string): string => {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return full;
  return `${parts[0][0]}. ${parts.slice(1).join(" ")}`;
};

const toPar = (score: number | null, par: number | null): string => {
  if (score == null || par == null) return "";
  const diff = score - par;
  if (diff === 0) return "E";
  return diff > 0 ? `+${diff}` : `${diff}`;
};

const scoreCellClass = (score: number | null, par: number | null): string => {
  if (score == null || par == null) return "";
  const diff = score - par;
  if (diff <= -2) return "bg-primary/20 text-primary font-bold rounded-full";
  if (diff === -1) return "bg-primary/10 text-primary font-semibold rounded-full";
  if (diff === 0) return "";
  if (diff === 1) return "bg-muted text-foreground";
  return "bg-destructive/10 text-destructive font-semibold";
};

const EventScorecardPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const meta = slug ? EVENT_META[slug] : undefined;
  const url = slug ? SCORECARD_URLS[slug] : null;
  const isMobile = useIsMobile();

  const [data, setData] = useState<EventScorecardData | null>(null);
  const [indexMap, setIndexMap] = useState<Record<string, number | null>>({});
  const [eventPointsMap, setEventPointsMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      fetch(url).then((r) => r.text()),
      fetch(HANDICAPS_URL).then((r) => r.text()).catch(() => ""),
      fetch(SHEET_URL).then((r) => r.text()).catch(() => ""),
    ])
      .then(([text, hcpText, lbText]) => {
        setData(parseEventScorecard(parseCSV(text)));
        if (hcpText) {
          const hcps = parseHandicaps(parseCSV(hcpText));
          const map: Record<string, number | null> = {};
          for (const h of hcps) map[h.slug] = latestIndex(h);
          setIndexMap(map);
        }
        if (lbText && slug && EVENT_POINTS_INDEX[slug] != null) {
          const players = parsePlayerRows(parseCSV(lbText));
          const idx = EVENT_POINTS_INDEX[slug];
          const pmap: Record<string, number> = {};
          for (const p of players) pmap[p.slug] = p.eventPoints[idx] ?? 0;
          setEventPointsMap(pmap);
        }
      })
      .catch(() => setError("Could not load scorecard data."))
      .finally(() => setLoading(false));
  }, [url, slug]);

  const sortedPlayers = useMemo(() => {
    if (!data) return [];
    return [...data.players].sort((a, b) => {
      if (a.total == null) return 1;
      if (b.total == null) return -1;
      return a.total - b.total;
    });
  }, [data]);


  if (!meta) {
    return (
      <div className="container py-16">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
        <Link to="/events">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> All Events
        </Link>
      </Button>

      <div className="flex items-center gap-3 mb-2">
        <ClipboardList className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl md:text-4xl font-bold">
          {meta.name} Scorecard
        </h1>
      </div>
      {meta.subtitle && (
        <p className="text-muted-foreground italic">{meta.subtitle}</p>
      )}

      {!url && (
        <Card className="mt-8 p-8 text-center">
          <p className="text-muted-foreground">
            Scorecard data isn't available yet for this event. Check back after
            the event is played.
          </p>
        </Card>
      )}

      {url && loading && (
        <p className="mt-8 text-muted-foreground">Loading scorecard…</p>
      )}

      {error && <p className="mt-8 text-destructive">{error}</p>}

      {data && !loading && (
        <div className="mt-6 space-y-6">
          {isMobile ? (
            <MobileScorecard
              data={data}
              sortedPlayers={sortedPlayers}
              indexMap={indexMap}
              eventPointsMap={eventPointsMap}
            />
          ) : (
            <DesktopScorecard data={data} sortedPlayers={sortedPlayers} indexMap={indexMap} eventPointsMap={eventPointsMap} />
          )}
        </div>
      )}
    </div>
  );
};

// ---------- Desktop ----------
const DesktopScorecard = ({
  data,
  sortedPlayers,
  indexMap,
  eventPointsMap,
}: {
  data: EventScorecardData;
  sortedPlayers: EventScorecardData["players"];
  indexMap: Record<string, number | null>;
  eventPointsMap: Record<string, number>;
}) => {
  const { course } = data;
  return (
    <Card className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-muted/50 border-b">
            <th className="sticky left-0 bg-muted/50 text-left px-3 py-2 font-semibold min-w-[220px]">
              Player
            </th>
            {HOLE_NUMS.slice(0, 9).map((h) => (
              <th key={h} className="px-2 py-2 text-center font-semibold w-10">
                {h}
              </th>
            ))}
            <th className="px-2 py-2 text-center font-semibold bg-muted">OUT</th>
            {HOLE_NUMS.slice(9).map((h) => (
              <th key={h} className="px-2 py-2 text-center font-semibold w-10">
                {h}
              </th>
            ))}
            <th className="px-2 py-2 text-center font-semibold bg-muted">IN</th>
            <th className="px-3 py-2 text-center font-semibold bg-muted">TOT</th>
            <th className="px-2 py-2 text-center font-semibold">HCP</th>
            <th className="px-3 py-2 text-center font-semibold bg-muted">NET</th>
            <th className="px-3 py-2 text-center font-semibold bg-muted">PTS</th>
          </tr>
          <tr className="border-b bg-accent/40 text-xs">
            <th className="sticky left-0 bg-accent/40 text-left px-3 py-1.5 font-semibold text-muted-foreground">
              Par
            </th>
            {course.par.slice(0, 9).map((p, i) => (
              <td key={i} className="px-2 py-1.5 text-center text-muted-foreground">
                {p ?? ""}
              </td>
            ))}
            <td className="px-2 py-1.5 text-center font-semibold bg-muted">
              {course.parOut ?? ""}
            </td>
            {course.par.slice(9).map((p, i) => (
              <td key={i} className="px-2 py-1.5 text-center text-muted-foreground">
                {p ?? ""}
              </td>
            ))}
            <td className="px-2 py-1.5 text-center font-semibold bg-muted">
              {course.parIn ?? ""}
            </td>
            <td className="px-3 py-1.5 text-center font-semibold bg-muted">
              {course.parTotal ?? ""}
            </td>
            <td colSpan={3} />
          </tr>
          {course.hcpRanking.some((h) => h != null) && (
            <tr className="border-b text-xs">
              <th className="sticky left-0 bg-card text-left px-3 py-1.5 font-medium text-muted-foreground">
                Hdcp
              </th>
              {course.hcpRanking.slice(0, 9).map((h, i) => (
                <td key={i} className="px-2 py-1.5 text-center text-muted-foreground">
                  {h ?? ""}
                </td>
              ))}
              <td className="bg-muted/50" />
              {course.hcpRanking.slice(9).map((h, i) => (
                <td key={i} className="px-2 py-1.5 text-center text-muted-foreground">
                  {h ?? ""}
                </td>
              ))}
              <td className="bg-muted/50" colSpan={5} />
            </tr>
          )}
        </thead>
        <tbody>
          {sortedPlayers.map((p) => (
            <tr key={p.slug} className="border-b last:border-b-0 hover:bg-muted/30">
              <td className="sticky left-0 bg-card px-3 py-2 font-semibold whitespace-nowrap">
                <Link to={`/players/${p.slug}`} className="hover:text-primary">
                  {p.name}
                </Link>
                {indexMap[p.slug] != null && (
                  <span className="ml-1.5 text-xs font-normal text-muted-foreground tabular-nums">
                    ({indexMap[p.slug]!.toFixed(1)})
                  </span>
                )}
              </td>
              {p.holes.slice(0, 9).map((s, i) => (
                <td key={i} className="px-1 py-1 text-center">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 ${scoreCellClass(
                      s,
                      course.par[i]
                    )}`}
                  >
                    {s ?? ""}
                  </span>
                </td>
              ))}
              <td className="px-2 py-2 text-center font-semibold bg-muted/40">
                {p.out ?? ""}
              </td>
              {p.holes.slice(9).map((s, i) => (
                <td key={i} className="px-1 py-1 text-center">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 ${scoreCellClass(
                      s,
                      course.par[i + 9]
                    )}`}
                  >
                    {s ?? ""}
                  </span>
                </td>
              ))}
              <td className="px-2 py-2 text-center font-semibold bg-muted/40">
                {p.in_ ?? ""}
              </td>
              <td className="px-3 py-2 text-center font-bold bg-muted/40">
                {p.total ?? ""}
                {p.total != null && course.parTotal != null && (
                  <span className="text-xs text-muted-foreground ml-1">
                    ({toPar(p.total, course.parTotal)})
                  </span>
                )}
              </td>
              <td className="px-2 py-2 text-center text-muted-foreground">
                {p.hcp ?? ""}
              </td>
              <td className="px-3 py-2 text-center font-bold bg-muted/40">
                {p.net ?? ""}
              </td>
              <td className="px-3 py-2 text-center font-bold bg-muted/40 tabular-nums">
                {eventPointsMap[p.slug] != null && eventPointsMap[p.slug] > 0
                  ? eventPointsMap[p.slug].toFixed(1)
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

// ---------- Mobile: jump-to-player + collapsible cards, ranked by event points ----------
const MobileScorecard = ({
  data,
  sortedPlayers,
  indexMap,
  eventPointsMap,
}: {
  data: EventScorecardData;
  sortedPlayers: EventScorecardData["players"];
  indexMap: Record<string, number | null>;
  eventPointsMap: Record<string, number>;
}) => {
  const { course } = data;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (slug: string) =>
    setExpanded((e) => ({ ...e, [slug]: !e[slug] }));

  // Rank by event points (desc); tiebreak on net.
  const displayed = useMemo(() => {
    const nullsLast = (v: number | null) =>
      v == null ? Number.POSITIVE_INFINITY : v;
    return [...sortedPlayers].sort((a, b) => {
      const pa = eventPointsMap[a.slug] ?? 0;
      const pb = eventPointsMap[b.slug] ?? 0;
      if (pb !== pa) return pb - pa;
      return nullsLast(a.net) - nullsLast(b.net);
    });
  }, [sortedPlayers, eventPointsMap]);

  // Player jump dropdown (alphabetical for easy lookup)
  const jumpOptions = useMemo(
    () => [...sortedPlayers].sort((a, b) => a.name.localeCompare(b.name)),
    [sortedPlayers]
  );

  const jumpToPlayer = (slug: string) => {
    setExpanded((e) => ({ ...e, [slug]: true }));
    requestAnimationFrame(() => {
      const el = document.getElementById(`player-${slug}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="space-y-3">
      {/* Jump-to-player dropdown */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 py-2 -mx-1 px-1">
        <Select value="" onValueChange={jumpToPlayer}>
          <SelectTrigger className="h-9 w-full">
            <SelectValue placeholder="Find a player…" />
          </SelectTrigger>
          <SelectContent>
            {jumpOptions.map((p) => (
              <SelectItem key={p.slug} value={p.slug}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {displayed.map((p, idx) => {
        const isOpen = !!expanded[p.slug];
        const toParTotal =
          p.total != null && course.parTotal != null
            ? toPar(p.total, course.parTotal)
            : "";
        return (
          <Card key={p.slug} id={`player-${p.slug}`} className="overflow-hidden scroll-mt-16">
            <button
              type="button"
              onClick={() => toggle(p.slug)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/30 transition-colors"
            >
              <span className="text-xs text-muted-foreground font-semibold w-5 shrink-0">
                {idx + 1}
              </span>
              <span className="font-semibold truncate flex-1 min-w-0">
                {shortName(p.name)}
              </span>
              <span className="text-sm tabular-nums shrink-0 text-muted-foreground">
                {p.total ?? "—"}
                {toParTotal && (
                  <span className="ml-1 text-xs">({toParTotal})</span>
                )}
              </span>
              <span className="text-sm font-bold tabular-nums shrink-0 w-10 text-right">
                {p.net ?? "—"}
              </span>
              {eventPointsMap[p.slug] != null && eventPointsMap[p.slug] > 0 && (
                <span className="shrink-0 inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-bold tabular-nums px-2 py-0.5">
                  {eventPointsMap[p.slug].toFixed(1)}
                </span>
              )}
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-3 pb-3 pt-1 border-t bg-muted/10">
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-2 mt-2 gap-3">
                  <Link
                    to={`/players/${p.slug}`}
                    className="hover:text-primary font-medium"
                  >
                    View player profile →
                  </Link>
                  <span className="tabular-nums">
                    Index{" "}
                    <span className="text-foreground font-medium">
                      {indexMap[p.slug] != null ? indexMap[p.slug]!.toFixed(1) : "—"}
                    </span>
                    <span className="mx-1.5 text-muted-foreground/50">·</span>
                    Course HCP{" "}
                    <span className="text-foreground font-medium">{p.hcp ?? "—"}</span>
                  </span>
                </div>
                <NineHoleRow
                  label="Front"
                  holes={p.holes.slice(0, 9)}
                  par={course.par.slice(0, 9)}
                  sub={p.out}
                  subPar={course.parOut}
                />
                <div className="mt-2">
                  <NineHoleRow
                    label="Back"
                    holes={p.holes.slice(9)}
                    par={course.par.slice(9)}
                    sub={p.in_}
                    subPar={course.parIn}
                    startHole={10}
                  />
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

const NineHoleRow = ({
  label,
  holes,
  par,
  sub,
  subPar,
  startHole = 1,
}: {
  label: string;
  holes: (number | null)[];
  par: (number | null)[];
  sub: number | null;
  subPar: number | null;
  startHole?: number;
}) => (
  <div>
    <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-muted-foreground mb-1">
      <span>{label} 9</span>
      <span>
        {sub ?? "—"}
        {sub != null && subPar != null && ` (${toPar(sub, subPar)})`}
      </span>
    </div>
    <div className="grid grid-cols-9 gap-0.5 text-center">
      {holes.map((_, i) => (
        <div key={i} className="text-[10px] text-muted-foreground">
          {startHole + i}
        </div>
      ))}
      {holes.map((s, i) => (
        <div
          key={`s-${i}`}
          className={`text-sm h-7 flex items-center justify-center ${scoreCellClass(
            s,
            par[i]
          )}`}
        >
          {s ?? "—"}
        </div>
      ))}
      {par.map((p, i) => (
        <div key={`p-${i}`} className="text-[10px] text-muted-foreground/70">
          {p ?? ""}
        </div>
      ))}
    </div>
  </div>
);

export default EventScorecardPage;
