import { Link } from "react-router-dom";
import { Calendar, Trophy, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FINALE_CHAMPIONSHIP as championship } from "@/data/finale";
import type { EventData } from "@/data/events";

const FinaleEventCard = ({ evt, mobile = false }: { evt: EventData; mobile?: boolean }) => (
  <Card className="overflow-hidden flex h-full flex-col border-primary/40">
    <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
      <img src={evt.image} alt={championship.title} loading="lazy" width={800} height={450}
        className="absolute inset-0 h-full w-full object-cover object-center" />
    </AspectRatio>
    <div className={`flex flex-1 flex-col gap-4 ${mobile ? "p-5" : "p-7"}`}>
      <div>
        <Badge className="gap-1.5 mb-2 bg-primary text-primary-foreground">
          <Trophy className="h-3.5 w-3.5" /> TOUR CHAMPIONSHIP
        </Badge>
        <h2 className={`font-display font-bold ${mobile ? "text-2xl" : "text-3xl"}`}>{championship.title}</h2>
        <p className="mt-1 font-semibold text-primary">{championship.subtitle}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          The top {championship.qualifyingPlayers} eligible players compete for the 2026 SFGT Tour Championship.
        </p>
      </div>
      <p className="flex items-start gap-2 text-sm font-semibold">
        <Calendar className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
        {championship.weekday}, {championship.date}
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-primary/20 pt-3 text-sm font-semibold">
        <span>{championship.qualifyingPlayers} Qualifiers</span>
        <span>{championship.roundHoles} Holes + Top {championship.playoffPlayers} Playoff</span>
      </div>
      <Button className="mt-auto w-full min-h-11 h-auto py-2" asChild>
        <Link to="/finale-2026">View Championship Details <ArrowRight className="ml-2 h-4 w-4 shrink-0" /></Link>
      </Button>
    </div>
  </Card>
);

export default FinaleEventCard;
