import { Calendar, ExternalLink, ClipboardList, Trophy, DollarSign, BarChart3, Anchor, Lock } from "lucide-react";
import { Link } from "react-router-dom";
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

const EVENTS: EventData[] = [
  {
    name: "Corica",
    subtitle: "The North Course",
    image: "/placeholder.svg",
    payoutDate: "May 2",
    anchorDay: "April 4",
    prizes: [
      { place: "Net 1", amount: "$300" },
      { place: "Net 2", amount: "$50" },
      { place: "Gross", amount: "$50" },
    ],
    teeSheet: "#",
    handicaps: "#",
    results: "#",
  },
  {
    name: "Coyote Creek",
    subtitle: "The Valley Course",
    image: "/placeholder.svg",
    payoutDate: "June 13",
    anchorDay: "May 31",
    prizes: [
      { place: "Net 1", amount: "$TBD" },
      { place: "Net 2", amount: "$TBD" },
      { place: "Gross", amount: "$TBD" },
    ],
    teeSheet: "#",
    handicaps: "#",
    results: "#",
  },
  {
    name: "Chardonnay",
    subtitle: "",
    image: "/placeholder.svg",
    payoutDate: "August 1",
    anchorDay: "July 11",
    prizes: [
      { place: "Net 1", amount: "$TBD" },
      { place: "Net 2", amount: "$TBD" },
      { place: "Gross", amount: "$TBD" },
    ],
    teeSheet: "#",
    handicaps: "#",
    results: "#",
  },
  {
    name: "Poppy Ridge",
    subtitle: "",
    image: "/placeholder.svg",
    payoutDate: "September 26",
    anchorDay: "TBD",
    prizes: [
      { place: "Net 1", amount: "$TBD" },
      { place: "Net 2", amount: "$TBD" },
      { place: "Gross", amount: "$TBD" },
    ],
    teeSheet: "#",
    handicaps: "#",
    results: "#",
  },
  {
    name: "Presidio",
    subtitle: "",
    image: "/placeholder.svg",
    payoutDate: "November 7",
    anchorDay: "TBD",
    prizes: [
      { place: "Net 1", amount: "$TBD" },
      { place: "Net 2", amount: "$TBD" },
      { place: "Gross", amount: "$TBD" },
    ],
    teeSheet: "#",
    handicaps: "#",
    results: "#",
  },
  {
    name: "Finale",
    subtitle: "Details coming soon",
    image: "/placeholder.svg",
    payoutDate: "TBD",
    anchorDay: "TBD",
    prizes: [],
    teeSheet: "#",
    handicaps: "#",
    results: "#",
    isFinale: true,
  },
];

const EventCard = ({ evt }: { evt: EventData }) => {
  if (evt.isFinale) {
    return (
      <Card className="overflow-hidden flex flex-col opacity-80">
        <div className="aspect-[16/9] bg-muted relative">
          <img src={evt.image} alt={evt.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground/50" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h2 className="font-display text-xl font-bold tracking-tight">{evt.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground italic">{evt.subtitle}</p>

          <div className="mt-3 flex flex-col gap-1 text-sm">
            <span className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground/50" />
              <span className="text-muted-foreground">Payout:</span>
              <span className="font-medium text-muted-foreground">TBD</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Anchor className="h-3.5 w-3.5 text-muted-foreground/50" />
              <span className="text-muted-foreground">Anchor Day:</span>
              <span className="font-medium text-muted-foreground">TBD</span>
            </span>
          </div>

          <div className="mt-auto pt-4 flex gap-1.5">
            <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs" disabled>
              <ClipboardList className="mr-1 h-3 w-3" /> Tee Sheet
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs" disabled>
              <BarChart3 className="mr-1 h-3 w-3" /> Handicaps
            </Button>
            <Button size="sm" className="h-7 px-2.5 text-xs" disabled>
              <ExternalLink className="mr-1 h-3 w-3" /> Results
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="aspect-[16/9] bg-muted">
        <img src={evt.image} alt={evt.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-xl font-bold tracking-tight">
          {evt.name}
          {evt.subtitle && (
            <span className="ml-1.5 text-sm font-normal text-muted-foreground">
              ({evt.subtitle})
            </span>
          )}
        </h2>

        {/* Dates */}
        <div className="mt-2.5 flex flex-col gap-1 text-sm">
          <span className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">Payout:</span>
            <span className="font-semibold">{evt.payoutDate}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Anchor className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">Anchor Day:</span>
            <span className="font-semibold">{evt.anchorDay}</span>
          </span>
        </div>

        {/* Prizes */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <Trophy className="h-4 w-4 text-primary" />
          {evt.prizes.map((p) => (
            <Badge key={p.place} variant="secondary" className="text-xs font-semibold px-2.5 py-1">
              {p.place}: {p.amount}
            </Badge>
          ))}
        </div>

        {evt.note && (
          <p className="mt-2 text-xs text-muted-foreground italic">{evt.note}</p>
        )}

        {/* Buttons */}
        <div className="mt-auto pt-4 flex gap-1.5">
          <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs" asChild>
            <Link to={`/tee-sheet?event=${encodeURIComponent(evt.name)}`}>
              <ClipboardList className="mr-1 h-3 w-3" /> Tee Sheet
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs" asChild>
            <a href={evt.handicaps} target="_blank" rel="noopener noreferrer">
              <BarChart3 className="mr-1 h-3 w-3" /> Handicaps
            </a>
          </Button>
          <Button size="sm" className="h-7 px-2.5 text-xs" asChild>
            <a href={evt.results} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1 h-3 w-3" /> Results
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Events = () => {
  return (
    <div className="container py-16">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="font-display text-4xl font-bold">Event Schedule</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        6 events this season — 5 regular season + the Finale.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {EVENTS.map((evt) => (
          <EventCard key={evt.name} evt={evt} />
        ))}
      </div>
    </div>
  );
};

export default Events;
