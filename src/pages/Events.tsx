import { Calendar, ExternalLink, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const EVENTS = [
  {
    name: "Baylands",
    image: "/placeholder.svg",
    teeSheet: "#",
    results: "#",
  },
  {
    name: "Callippe",
    image: "/placeholder.svg",
    teeSheet: "#",
    results: "#",
  },
  {
    name: "Poppy Hills",
    image: "/placeholder.svg",
    teeSheet: "#",
    results: "#",
  },
  {
    name: "Presidio",
    image: "/placeholder.svg",
    teeSheet: "#",
    results: "#",
  },
  {
    name: "Corica",
    image: "/placeholder.svg",
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
              <div className="sm:w-64 shrink-0">
                <AspectRatio ratio={16 / 10}>
                  <img
                    src={evt.image}
                    alt={evt.name}
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="flex flex-1 items-center justify-between p-6 gap-4 flex-wrap">
                <CardTitle className="text-2xl">{evt.name}</CardTitle>
                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <a href={evt.teeSheet} target="_blank" rel="noopener noreferrer">
                      <ClipboardList className="mr-1" /> Tee Sheet
                    </a>
                  </Button>
                  <Button asChild>
                    <a href={evt.results} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1" /> Results
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
