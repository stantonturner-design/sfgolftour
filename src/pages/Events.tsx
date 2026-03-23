import { Calendar, ExternalLink, ClipboardList, Trophy, DollarSign, BarChart3, Anchor } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
}

const EVENTS: EventData[] = [
  {
    name: "Corica",
    subtitle: "The North Course",
    image: "/placeholder.svg",
    payoutDate: "5/2",
    anchorDay: "4/4",
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
    payoutDate: "6/13",
    anchorDay: "5/31",
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
    payoutDate: "8/1",
    anchorDay: "7/11",
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
    payoutDate: "9/26",
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
    payoutDate: "11/7",
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
];

const Events = () => {
  return (
    <div className="container py-16">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="font-display text-4xl font-bold">Event Schedule</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        The 5 tour events this season.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {EVENTS.map((evt) => (
          <Card key={evt.name} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Course photo */}
              <div className="sm:w-56 shrink-0">
                <AspectRatio ratio={16 / 10}>
                  <img
                    src={evt.image}
                    alt={evt.name}
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
              </div>

              {/* Event details */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="text-2xl">
                      {evt.name}
                      {evt.subtitle && (
                        <span className="ml-2 text-base font-normal text-muted-foreground">
                          ({evt.subtitle})
                        </span>
                      )}
                    </CardTitle>
                    <div className="mt-1.5 flex flex-col gap-0.5 text-sm text-muted-foreground">
                      <p className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        Cash Prize Payout: {evt.payoutDate}
                      </p>
                      <p className="flex items-center gap-1">
                        <Anchor className="h-3.5 w-3.5" />
                        Anchor Day: {evt.anchorDay}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/tee-sheet?event=${encodeURIComponent(evt.name)}`}>
                        <ClipboardList className="mr-1" /> Tee Sheet
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={evt.handicaps} target="_blank" rel="noopener noreferrer">
                        <BarChart3 className="mr-1" /> Handicaps
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={evt.results} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1" /> Results
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Prizes */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Trophy className="h-4 w-4 text-accent" />
                  {evt.prizes.map((p) => (
                    <Badge key={p.place} variant="secondary" className="text-xs font-medium">
                      {p.place}: {p.amount}
                    </Badge>
                  ))}
                </div>

                {/* Optional note */}
                {evt.note && (
                  <p className="text-xs text-muted-foreground italic">{evt.note}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
