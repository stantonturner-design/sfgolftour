import { Trophy, Medal } from "lucide-react";
import { getEventPurse, getPrizeBreakdown, formatPrize, type EventData } from "@/data/events";

interface PrizeMoneyProps {
  evt: EventData;
  align?: "left" | "right";
  className?: string;
}

const ICONS = [Trophy, Medal, Trophy];

const PrizeMoney = ({ evt, align = "left", className = "" }: PrizeMoneyProps) => {
  const purse = getEventPurse(evt);
  if (purse <= 0) return null;

  const rows = getPrizeBreakdown(evt).filter((r) => r.amount > 0);

  return (
    <div
      className={`rounded-lg border border-border/60 bg-muted/40 p-3 ${
        align === "right" ? "text-right" : ""
      } ${className}`}
    >
      <div
        className={`flex items-baseline gap-2 ${
          align === "right" ? "justify-end" : "justify-between"
        }`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
          Prize Money
        </p>
        <p className="text-sm font-bold text-primary">{formatPrize(purse)} Purse</p>
      </div>
      <ul className="mt-2 space-y-1">
        {rows.map((row, i) => {
          const Icon = ICONS[i] ?? Trophy;
          return (
            <li
              key={row.label}
              className={`flex items-center gap-2 text-sm ${
                align === "right" ? "justify-end" : "justify-between"
              }`}
            >
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                {row.label}
              </span>
              <span className="font-semibold tabular-nums">{formatPrize(row.amount)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PrizeMoney;
