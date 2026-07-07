import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, ExternalLink, ClipboardList, Trophy, DollarSign, BarChart3, Anchor, Lock, Globe, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileEventCard from "@/components/events/MobileEventCard";
import { slugifyName } from "@/lib/playerUtils";
import { SCORECARD_URLS } from "@/lib/scorecardUtils";

import { EVENTS, type EventData } from "@/data/events";

const EventCard = ({ evt }: { evt: EventData }) => {
  const imageSection = (
    <div className="w-full shrink-0">
      <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
        <img
          src={evt.image}
          alt={evt.name}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          width={800}
          height={450}
        />
        {evt.isFinale && (
          <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground/40" />
          </div>
        )}
      </AspectRatio>
    </div>
  );

  if (evt.isFinale) {
    return (
      <Card className="overflow-hidden flex flex-col opacity-75">
        {imageSection}
        <div className="flex flex-1 flex-col p-7 gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">{evt.name}</h2>
            <p className="text-lg text-muted-foreground italic mt-1">{evt.subtitle}</p>
          </div>
          <div className="flex flex-col gap-1.5 text-base">
            <span className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground/40" />
              <span className="text-muted-foreground">Cash Prize Payout:</span>
              <span className="font-medium text-muted-foreground">TBD</span>
            </span>
            <span className="flex items-center gap-2">
              <Anchor className="h-4 w-4 text-muted-foreground/40" />
              <span className="text-muted-foreground">Anchor Day:</span>
              <span className="font-medium text-muted-foreground">TBD</span>
            </span>
          </div>
          <div className="mt-auto pt-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="h-9 text-sm" disabled>
                <FileText className="mr-1.5 h-4 w-4" /> Scorecard
              </Button>
              <Button variant="outline" size="sm" className="h-9 text-sm" disabled>
                <ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet
              </Button>
            </div>
            <Button size="sm" className="w-full h-9 text-sm" disabled>
              <ExternalLink className="mr-1.5 h-4 w-4" /> Round Recap
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden flex flex-col">
      {imageSection}
      <div className="flex flex-1 flex-col p-7 gap-5">
        {/* Header: title + Course Site (top-right) */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-3xl font-bold tracking-tight leading-tight">
              {evt.name}
            </h2>
            {evt.subtitle && (
              <p className="text-lg text-muted-foreground mt-0.5">
                {evt.subtitle}
              </p>
            )}
          </div>
          {evt.courseUrl && (
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs shrink-0" asChild>
              <a href={evt.courseUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-1.5 h-3.5 w-3.5" /> Course Site
              </a>
            </Button>
          )}
        </div>

        {/* Two-column details panel */}
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-base">
              <Anchor className="h-4.5 w-4.5 text-primary shrink-0" />
              <span className="text-muted-foreground">Anchor Day:</span>
              <span className="font-semibold text-lg">{evt.anchorDay}</span>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-3">
            <div className="flex items-center gap-2 text-base">
              <DollarSign className="h-4.5 w-4.5 text-primary shrink-0" />
              <span className="text-muted-foreground">Payout:</span>
              <span className="font-semibold text-lg">{evt.payoutDate}</span>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {evt.prizes.map((p) => (
                <Badge key={p.place} variant="secondary" className="text-xs font-semibold px-2 py-1">
                  {p.place}: {p.amount}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {evt.note && (
          <p className="text-sm text-muted-foreground italic">{evt.note}</p>
        )}

        {/* Action buttons: Course Site → [Scorecard | Tee Sheet] → Round Recap */}
        {(() => {
          const slug = slugifyName(evt.name);
          const hasResults = !!evt.results;
          return (
            <div className="mt-auto pt-2 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-9 text-sm" asChild>
                  <Link to={`/events/${slug}/scorecard`}>
                    <FileText className="mr-1.5 h-4 w-4" /> Scorecard
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-9 text-sm" asChild>
                  <Link to={`/tee-sheet?event=${encodeURIComponent(evt.name)}`}>
                    <ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet
                  </Link>
                </Button>
              </div>
              {hasResults ? (
                <Button size="sm" className="w-full h-9 text-sm" asChild>
                  <a href={evt.results} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-4 w-4" /> Round Recap
                  </a>
                </Button>
              ) : (
                <Button size="sm" className="w-full h-9 text-sm" disabled>
                  <ExternalLink className="mr-1.5 h-4 w-4" /> Round Recap
                </Button>
              )}
            </div>
          );
        })()}
      </div>
    </Card>
  );
};
const Events = () => {
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    // Wait a tick so cards have mounted
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => clearTimeout(t);
  }, [location.hash, isMobile]);

  return (
    <div className="container py-16">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="font-display text-4xl font-bold">Event Schedule</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        6 events this season — 5 regular season + the Finale.
      </p>

      {isMobile ? (
        <div className="mt-8 space-y-5">
          {EVENTS.map((evt) => (
            <div key={evt.name} id={slugifyName(evt.name)} className="scroll-mt-20">
              <MobileEventCard evt={evt} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS.map((evt) => (
            <div key={evt.name} id={slugifyName(evt.name)} className="scroll-mt-24">
              <EventCard evt={evt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
