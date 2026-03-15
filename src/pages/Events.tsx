import { Calendar, ExternalLink, ClipboardList, Trophy, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface EventData {
  name: string;
  image: string;
  payoutDate: string;
  prizes: { place: string; amount: string }[];
  teeSheet: string;
  results: string;
  note?: string;
}

const EVENTS: EventData[] = [
  {
    name: "Baylands",
    image: "/placeholder.svg",
    payoutDate: "TBD",
    prizes: [
      { place: "1st", amount: "$TBD" },
      { place: "2nd", amount: "$TBD" },
      { place: "3rd", amount: "$TBD" },
    ],
    teeSheet: "#",
    results: "#",
  },
  {
    name: "Callippe",
    image: "/placeholder.svg",
    payoutDate: "TBD",
    prizes: [
      { place: "1st", amount: "$TBD" },
      { place: "2nd", amount: "$TBD" },
      { place: "3rd", amount: "$TBD" },
    ],
    teeSheet: "#",
    results: "#",
  },
  {
    name: "Poppy Hills",
    image: "/placeholder.svg",
    payoutDate: "TBD",
    prizes: [
      { place: "1st", amount: "$TBD" },
      { place: "2nd", amount: "$TBD" },
      { place: "3rd", amount: "$TBD" },
    ],
    teeSheet: "#",
    results: "#",
  },
  {
    name: "Presidio",
    image: "/placeholder.svg",
    payoutDate: "TBD",
    prizes: [
      { place: "1st", amount: "$TBD" },
      { place: "2nd", amount: "$TBD" },
      { place: "3rd", amount: "$TBD" },
    ],
    teeSheet: "#",
    results: "#",
  },
  {
    name: "Corica",
    image: "/placeholder.svg",
    payoutDate: "TBD",
    prizes: [
      { place: "1st", amount: "$TBD" },
      { place: "2nd", amount: "$TBD" },
      { place: "3rd", amount: "$TBD" },
    ],
    teeSheet: "#",
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
                    <CardTitle className="text-2xl">{evt.name}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      Payout: {evt.payoutDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/tee-sheet?event=${encodeURIComponent(evt.name)}`}>
                        <ClipboardList className="mr-1" /> Tee Sheet
                      </Link>
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
