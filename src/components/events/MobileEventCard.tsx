import { Link } from "react-router-dom";
import { ClipboardList, ExternalLink, BarChart3, Anchor, DollarSign, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventData {
  name: string;
  subtitle: string;
  image: string;
  payoutDate: string;
  anchorDay: string;
  prizes: { place: string; amount: string }[];
  teeSheet: string;
  handicaps: string;
  results: string;
  note?: string;
  isFinale?: boolean;
}

const MobileEventCard = ({ evt }: { evt: EventData }) => {
  if (evt.isFinale) {
    return (
      <Card className="overflow-hidden opacity-75">
        <div className="w-full aspect-[16/9] bg-muted relative">
          <img
            src={evt.image}
            alt={evt.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground/40" />
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <h2 className="font-display text-2xl font-bold">{evt.name}</h2>
            <p className="text-base text-muted-foreground italic">{evt.subtitle}</p>
          </div>
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground/40" />
              <span>Cash Prize Payout:</span>
              <span className="font-medium">TBD</span>
            </div>
            <div className="flex items-center gap-2">
              <Anchor className="h-4 w-4 text-muted-foreground/40" />
              <span>Anchor Day:</span>
              <span className="font-medium">TBD</span>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" size="sm" className="flex-1 h-9 text-sm" disabled>
              <ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet
            </Button>
            <Button variant="outline" size="sm" className="flex-1 h-9 text-sm" disabled>
              <BarChart3 className="mr-1.5 h-4 w-4" /> Handicaps
            </Button>
            <Button size="sm" className="flex-1 h-9 text-sm" disabled>
              <ExternalLink className="mr-1.5 h-4 w-4" /> Results
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      {/* Image */}
      <div className="w-full aspect-[16/9] bg-muted">
        <img
          src={evt.image}
          alt={evt.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content — stacked vertically */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">{evt.name}</h2>
          {evt.subtitle && (
            <p className="text-base text-muted-foreground mt-0.5">{evt.subtitle}</p>
          )}
        </div>

        {/* Dates */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-primary shrink-0" />
            <span className="text-muted-foreground">Cash Prize Payout:</span>
            <span className="font-semibold">{evt.payoutDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Anchor className="h-4 w-4 text-primary shrink-0" />
            <span className="text-muted-foreground">Anchor Day:</span>
            <span className="font-semibold">{evt.anchorDay}</span>
          </div>
        </div>

        {/* Prize chips */}
        {evt.prizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {evt.prizes.map((p) => (
              <Badge key={p.place} variant="secondary" className="text-xs font-semibold px-2 py-1">
                {p.place}: {p.amount}
              </Badge>
            ))}
          </div>
        )}

        {evt.note && (
          <p className="text-sm text-muted-foreground italic">{evt.note}</p>
        )}

        {/* Buttons — equal width row */}
        <div className="flex gap-2 pt-1">
          <Button variant="outline" size="sm" className="flex-1 h-9 text-sm" asChild>
            <Link to={`/tee-sheet?event=${encodeURIComponent(evt.name)}`}>
              <ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 h-9 text-sm" asChild>
            <a href={evt.handicaps} target="_blank" rel="noopener noreferrer">
              <BarChart3 className="mr-1.5 h-4 w-4" /> Handicaps
            </a>
          </Button>
          <Button size="sm" className="flex-1 h-9 text-sm" asChild>
            <a href={evt.results} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-4 w-4" /> Results
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MobileEventCard;
