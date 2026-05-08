import { Calendar, ExternalLink, ClipboardList, Trophy, DollarSign, BarChart3, Anchor, Lock, Globe, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileEventCard from "@/components/events/MobileEventCard";
import { slugifyName } from "@/lib/playerUtils";
import { SCORECARD_URLS } from "@/lib/scorecardUtils";

import coricaImg from "@/assets/courses/corica-north.jpg";
import coyoteImg from "@/assets/courses/coyote-creek.jpg";
import chardonnayImg from "@/assets/courses/chardonnay.jpg";
import poppyImg from "@/assets/courses/poppy-ridge.jpg";
import presidioImg from "@/assets/courses/presidio.jpg";
import finaleImg from "@/assets/courses/finale.jpg";

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

const EVENTS: EventData[] = [
  {
    name: "Corica",
    subtitle: "The North Course",
    image: coricaImg,
    payoutDate: "May 2",
    anchorDay: "April 4",
    prizes: [
      { place: "Net 1", amount: "$300" },
      { place: "Net 2", amount: "$50" },
      { place: "Gross", amount: "$50" },
    ],
    teeSheet: "#",
    handicaps: "",
    results: "https://app.roundrecap.com/rounds/2df0ef64-663e-4ea0-9c11-b8d3623af707",
    courseUrl: "https://www.coricapark.com/",
  },
  {
    name: "Coyote Creek",
    subtitle: "The Valley Course",
    image: "https://playeasy.com/cdn-cgi/image/width=1200,fit=scale-down,format=auto,quality=85/https://storage.playeasy.com/facility-mgmt/060f01d2-5808-4a3f-b62d-d2d9e884398c",
    payoutDate: "June 13",
    anchorDay: "May 31",
    prizes: [
      { place: "Net 1", amount: "$300" },
      { place: "Net 2", amount: "$50" },
      { place: "Gross", amount: "$50" },
    ],
    teeSheet: "#",
    handicaps: "",
    results: "",
    courseUrl: "https://coyotecreekgolf.com/",
  },
  {
    name: "Chardonnay",
    subtitle: "",
    image: chardonnayImg,
    payoutDate: "August 1",
    anchorDay: "July 11",
    prizes: [
      { place: "Net 1", amount: "$TBD" },
      { place: "Net 2", amount: "$TBD" },
      { place: "Gross", amount: "$TBD" },
    ],
    teeSheet: "#",
    handicaps: "",
    results: "",
    courseUrl: "https://www.chardonnaygolfclub.com/",
  },
  {
    name: "Poppy Ridge",
    subtitle: "",
    image: poppyImg,
    payoutDate: "September 26",
    anchorDay: "TBD",
    prizes: [
      { place: "Net 1", amount: "$TBD" },
      { place: "Net 2", amount: "$TBD" },
      { place: "Gross", amount: "$TBD" },
    ],
    teeSheet: "#",
    handicaps: "",
    results: "",
    courseUrl: "https://poppyridgegolf.ncga.org/",
  },
  {
    name: "Presidio",
    subtitle: "",
    image: presidioImg,
    payoutDate: "November 7",
    anchorDay: "TBD",
    prizes: [
      { place: "Net 1", amount: "$TBD" },
      { place: "Net 2", amount: "$TBD" },
      { place: "Gross", amount: "$TBD" },
    ],
    teeSheet: "#",
    handicaps: "",
    results: "",
    courseUrl: "https://www.presidiogolf.com/",
  },
  {
    name: "Finale",
    subtitle: "Details coming soon",
    image: finaleImg,
    payoutDate: "TBD",
    anchorDay: "TBD",
    prizes: [],
    teeSheet: "#",
    handicaps: "",
    results: "",
    isFinale: true,
  },
];

const EventCard = ({ evt }: { evt: EventData }) => {
  const imageSection = (
    <div className="w-full aspect-[16/9] bg-muted relative shrink-0">
      <img src={evt.image} alt={evt.name} className="h-full w-full object-cover" loading="lazy" width={800} height={512} />
      {evt.isFinale && (
        <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center">
          <Lock className="h-8 w-8 text-muted-foreground/40" />
        </div>
      )}
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
          <div className="mt-auto pt-4 flex gap-2.5">
            <Button variant="outline" size="sm" className="h-9 px-4 text-sm" disabled>
              <ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-4 text-sm" disabled>
              <BarChart3 className="mr-1.5 h-4 w-4" /> Handicaps
            </Button>
            <Button size="sm" className="h-9 px-4 text-sm" disabled>
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
        {/* Two-column content panel */}
        <div className="flex gap-8">
          {/* Left column: identity + anchor day */}
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-display text-3xl font-bold tracking-tight leading-tight">
                  {evt.name}
                </h2>
                {(() => {
                  const slug = slugifyName(evt.name);
                  const hasData = !!SCORECARD_URLS[slug];
                  return (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2.5 text-xs"
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
              {evt.subtitle && (
                <p className="text-lg text-muted-foreground mt-0.5">
                  {evt.subtitle}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-base">
              <Anchor className="h-4.5 w-4.5 text-primary shrink-0" />
              <span className="text-muted-foreground">Anchor Day:</span>
              <span className="font-semibold text-lg">{evt.anchorDay}</span>
            </div>
          </div>

          {/* Right column: payout + prizes */}
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

        {/* Action buttons */}
        <div className="mt-auto pt-2 flex flex-wrap gap-2.5">
          <Button variant="outline" size="sm" className="h-9 px-4 text-sm" asChild>
            <Link to={`/tee-sheet?event=${encodeURIComponent(evt.name)}`}>
              <ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet
            </Link>
          </Button>
          {evt.handicaps ? (
            <Button variant="outline" size="sm" className="h-9 px-4 text-sm" asChild>
              <a href={evt.handicaps} target="_blank" rel="noopener noreferrer">
                <BarChart3 className="mr-1.5 h-4 w-4" /> Handicaps
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="h-9 px-4 text-sm" disabled>
              <BarChart3 className="mr-1.5 h-4 w-4" /> Handicaps
            </Button>
          )}
          {evt.results ? (
            <Button size="sm" className="h-9 px-4 text-sm" asChild>
              <a href={evt.results} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4" /> Round Recap
              </a>
            </Button>
          ) : (
            <Button size="sm" className="h-9 px-4 text-sm" disabled>
              <ExternalLink className="mr-1.5 h-4 w-4" /> Round Recap
            </Button>
          )}
          {evt.courseUrl && (
            <Button variant="ghost" size="sm" className="h-9 px-4 text-sm text-muted-foreground" asChild>
              <a href={evt.courseUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-1.5 h-4 w-4" /> Course Website
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
const Events = () => {
  const isMobile = useIsMobile();

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
            <MobileEventCard key={evt.name} evt={evt} />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS.map((evt) => (
            <EventCard key={evt.name} evt={evt} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
