import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ClipboardList, ArrowLeft, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parseCSV } from "@/lib/csv";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFoFbbyxvSushAcAppZY8YEP-cDAXH5GhQCewq4QOgIW-WqIW7SDcHX4Xsz2UeP7tI4OYAjZTgQVOc/pub?gid=1979318911&single=true&output=csv";

interface Player {
  name: string;
  finaleIndex: string;
  courseHcp: string;
}

interface TeeGroup {
  groupNumber: number;
  players: Player[];
}

const TeeSheet = () => {
  const [searchParams] = useSearchParams();
  const eventName = searchParams.get("event") || "Finale";
  const [groups, setGroups] = useState<TeeGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(SHEET_URL)
      .then((r) => r.text())
      .then((text) => {
        const rows = parseCSV(text);
        // Finale Groups are in the last 3 populated columns (index 30, 31, 32)
        // Data rows start at index 3 (row 4)
        const players: Player[] = [];
        for (let i = 3; i < rows.length; i++) {
          const row = rows[i];
          if (!row) continue;
          const name = row[30]?.trim();
          const finaleIndex = row[31]?.trim();
          const courseHcp = row[32]?.trim();
          if (name && name !== "" && name !== "GOLFER") {
            players.push({ name, finaleIndex: finaleIndex || "—", courseHcp: courseHcp || "—" });
          }
        }

        // Split into groups of 4
        const parsed: TeeGroup[] = [];
        for (let i = 0; i < players.length; i += 4) {
          parsed.push({
            groupNumber: parsed.length + 1,
            players: players.slice(i, i + 4),
          });
        }
        setGroups(parsed);
      })
      .catch(() => setError("Unable to load tee sheet data."))
      .finally(() => setLoading(false));
  }, []);

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
      <p className="mt-2 text-muted-foreground">{eventName} — Group Assignments</p>

      {loading && <p className="mt-8 text-muted-foreground">Loading tee sheet…</p>}
      {error && <p className="mt-8 text-destructive">{error}</p>}

      {!loading && !error && groups.length === 0 && (
        <p className="mt-8 text-muted-foreground">No tee sheet data available for this event.</p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <Card key={g.groupNumber}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-4 w-4 text-primary" />
                Group {g.groupNumber}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {g.players.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2"
                >
                  <span className="font-medium text-sm">{p.name}</span>
                  <div className="flex gap-1.5">
                    <Badge variant="outline" className="text-xs">
                      HI {p.finaleIndex}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      CHP {p.courseHcp}
                    </Badge>
                  </div>
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
