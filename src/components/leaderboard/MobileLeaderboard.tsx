import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

interface Props {
  players: Player[];
  eventNames: string[];
}

const MobileLeaderboard = ({ players, eventNames }: Props) => {
  const [expandedRank, setExpandedRank] = useState<number | null>(null);
  const [cardFinishViews, setCardFinishViews] = useState<Record<number, string>>({});

  const toggle = (rank: number) =>
    setExpandedRank((prev) => (prev === rank ? null : rank));

  const getFinishView = (rank: number) => cardFinishViews[rank] || "event";
  const setFinishView = (rank: number, v: string) =>
    setCardFinishViews((prev) => ({ ...prev, [rank]: v }));

  return (
    <div className="mt-6 space-y-3">
      {/* Player cards */}
      {players.map((p) => {
        const isExpanded = expandedRank === p.rank;
        const finishView = getFinishView(p.rank);
        const finishLabels =
          finishView === "event"
            ? ["Wins", "Top 5", "Top 10"]
            : ["Net Wins", "Net Top 5", "Net Top 10"];
        const finishVals =
          finishView === "event"
            ? [p.wins, p.top5, p.top10]
            : [p.netWins, p.netTop5, p.netTop10];

        return (
          <div
            key={p.rank}
            className={`rounded-lg border overflow-hidden ${
              p.rank <= 3 ? "border-primary/30 bg-primary/5" : "bg-card"
            }`}
          >
            {/* Summary row */}
            <button
              onClick={() => toggle(p.rank)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left"
            >
              <span className="text-lg font-bold text-muted-foreground w-7 text-center shrink-0">
                {p.rank}
              </span>
              <span className="flex-1 font-semibold truncate">{p.name}</span>
              <span className="text-right shrink-0 flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {p.events} evt{p.events !== 1 ? "s" : ""}
                </span>
                <span className="font-bold text-lg">{p.points.toFixed(1)}</span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </span>
            </button>

            {/* Expanded detail */}
            {isExpanded && (
              <div className="border-t px-4 py-3 space-y-3 bg-muted/30">
                {/* Event points */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Event Points
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {eventNames.map((name, i) => (
                      <div key={name} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{name}</span>
                        <span className="font-medium">
                          {p.eventPoints[i] > 0 ? p.eventPoints[i].toFixed(1) : "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Finishes with in-card toggle */}
                <div>
                  <div className="flex justify-center mb-2">
                    <ToggleGroup
                      type="single"
                      value={finishView}
                      onValueChange={(v) => v && setFinishView(p.rank, v)}
                      variant="outline"
                      size="sm"
                      className="gap-0 w-full"
                    >
                      <ToggleGroupItem value="event" className="text-xs h-8 flex-1 rounded-r-none border-r-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary font-semibold">
                        Event Rank Finishes
                      </ToggleGroupItem>
                      <ToggleGroupItem value="net" className="text-xs h-8 flex-1 rounded-l-none data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary font-semibold">
                        Net Score Finishes
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {finishLabels.map((label, i) => (
                      <div key={label}>
                        <div className="text-lg font-bold">{finishVals[i]}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Birdies */}
                <div className="flex items-center justify-between text-sm pt-1 border-t">
                  <span className="text-muted-foreground font-medium">
                    Total Birdies
                  </span>
                  <span className="font-bold text-base">{p.birdies}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MobileLeaderboard;
