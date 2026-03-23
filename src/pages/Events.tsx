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
      <Card className="overflow-hidden flex flex-col opacity-75">
        <div className="h-36 bg-muted relative">
          <img src={evt.image} alt={evt.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground/40" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 gap-3">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">{evt.name}</h2>
            <p className="text-base text-muted-foreground italic mt-1">{evt.subtitle}</p>
          </div>

          <div className="flex flex-col gap-1 text-base">
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

          <div className="mt-auto pt-4 flex gap-2">
            <Button variant="outline" size="sm" className="h-9 px-4 text-sm" disabled>
              <ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-4 text-sm" disabled>
              <BarChart3 className="mr-1.5 h-4 w-4" /> Handicaps
            </Button>
            <Button size="sm" className="h-9 px-4 text-sm" disabled>
              <ExternalLink className="mr-1.5 h-4 w-4" /> Results
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="h-36 bg-muted">
        <img src={evt.image} alt={evt.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6 gap-4">
        {/* Two-column content area */}
        <div className="flex gap-6">
          {/* Left: name, subtitle, anchor day */}
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-3xl font-bold tracking-tight leading-tight">
              {evt.name}
            </h2>
            {evt.subtitle && (
              <p className="text-base text-muted-foreground mt-0.5">
                {evt.subtitle}
              </p>
            )}
            <div className="mt-3 flex items-center gap-2 text-base">
              <Anchor className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">Anchor Day:</span>
              <span className="font-semibold">{evt.anchorDay}</span>
            </div>
          </div>

          {/* Right: payout date + prize chips */}
          <div className="shrink-0 text-right flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-base">
              <DollarSign className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">Payout:</span>
              <span className="font-semibold">{evt.payoutDate}</span>
            </div>
            <div className="flex flex-wrap justify-end gap-1.5 mt-1">
              {evt.prizes.map((p) => (
                <Badge key={p.place} variant="secondary" className="text-sm font-semibold px-3 py-1">
                  {p.place}: {p.amount}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {evt.note && (
          <p className="text-sm text-muted-foreground italic">{evt.note}</p>
        )}

        {/* Buttons */}
        <div className="mt-auto pt-2 flex gap-2">
          <Button variant="outline" size="sm" className="h-9 px-4 text-sm" asChild>
            <Link to={`/tee-sheet?event=${encodeURIComponent(evt.name)}`}>
              <ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="h-9 px-4 text-sm" asChild>
            <a href={evt.handicaps} target="_blank" rel="noopener noreferrer">
              <BarChart3 className="mr-1.5 h-4 w-4" /> Handicaps
            </a>
          </Button>
          <Button size="sm" className="h-9 px-4 text-sm" asChild>
            <a href={evt.results} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-4 w-4" /> Results
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Events;
