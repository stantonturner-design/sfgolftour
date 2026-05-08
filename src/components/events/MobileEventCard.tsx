import { Link } from "react-router-dom";
import { ClipboardList, ExternalLink, BarChart3, Anchor, DollarSign, Lock, Globe, ScrollText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { slugifyName } from "@/lib/playerUtils";
import { SCORECARD_URLS } from "@/lib/scorecardUtils";

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
  courseUrl?: string;
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
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button variant="outline" size="sm" className="h-9 text-sm" disabled>
              <ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet
            </Button>
            <Button variant="outline" size="sm" className="h-9 text-sm" disabled>
              <BarChart3 className="mr-1.5 h-4 w-4" /> Handicaps
            </Button>
            <Button size="sm" className="col-span-2 h-9 text-sm" disabled>
              <ExternalLink className="mr-1.5 h-4 w-4" /> Round Recap
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
        {/* Title + Scorecard */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold tracking-tight">{evt.name}</h2>
            {evt.subtitle && (
              <p className="text-base text-muted-foreground mt-0.5">{evt.subtitle}</p>
            )}
          </div>
          {(() => {
            const slug = slugifyName(evt.name);
            const hasData = !!SCORECARD_URLS[slug];
            return (
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-2.5 text-xs shrink-0"
                asChild={hasData}
                disabled={!hasData}
              >
                {hasData ? (
                  <Link to={`/events/${slug}/scorecard`}>
                    <ScrollText className="mr-1 h-3.5 w-3.5" /> Scorecard
                  </Link>
                ) : (
                  <span>
                    <ScrollText className="mr-1 h-3.5 w-3.5" /> Scorecard
                  </span>
                )}
              </Button>
            );
          })()}
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
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button variant="outline" size="sm" className="h-9 text-sm" asChild>
            <Link to={`/tee-sheet?event=${encodeURIComponent(evt.name)}`}>
              <ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet
            </Link>
          </Button>
          {evt.handicaps ? (
            <Button variant="outline" size="sm" className="h-9 text-sm" asChild>
              <a href={evt.handicaps} target="_blank" rel="noopener noreferrer">
                <BarChart3 className="mr-1.5 h-4 w-4" /> Handicaps
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="h-9 text-sm" disabled>
              <BarChart3 className="mr-1.5 h-4 w-4" /> Handicaps
            </Button>
          )}
          {evt.results ? (
            <Button size="sm" className={`h-9 text-sm ${evt.courseUrl ? "" : "col-span-2"}`} asChild>
              <a href={evt.results} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4" /> Round Recap
              </a>
            </Button>
          ) : (
            <Button size="sm" className={`h-9 text-sm ${evt.courseUrl ? "" : "col-span-2"}`} disabled>
              <ExternalLink className="mr-1.5 h-4 w-4" /> Round Recap
            </Button>
          )}
          {evt.courseUrl && (
            <Button variant="ghost" size="sm" className="h-9 text-sm text-muted-foreground" asChild>
              <a href={evt.courseUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-1.5 h-4 w-4" /> Course Site
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MobileEventCard;
