import { Link } from "react-router-dom";
import { Calendar, Trophy, ClipboardList, FileText, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FINALE_CHAMPIONSHIP as championship, type EventData } from "@/data/events";
import { slugifyName } from "@/lib/playerUtils";
import { SCORECARD_URLS } from "@/lib/scorecardUtils";

/** Finale destinations must be real, not the regular-season '#' placeholder. */
export function getFinaleActions(evt: EventData) {
  const slug = slugifyName(evt.name);
  return {
    scorecard: SCORECARD_URLS[slug] ? `/events/${slug}/scorecard` : null,
    teeSheet: evt.teeSheet && evt.teeSheet !== "#" ? evt.teeSheet : null,
    roundRecap: evt.results || null,
  };
}

const FinaleEventCard = ({ evt, mobile = false }: { evt: EventData; mobile?: boolean }) => {
  const actions = getFinaleActions(evt);
  const steps = [
    { value: championship.qualifyingPlayers, label: "qualifying players" },
    { value: championship.roundHoles, label: "hole championship round" },
    { value: `Top ${championship.playoffPlayers}`, label: `${championship.playoffHoles}-hole playoff` },
    { value: "1", label: "Tour Champion" },
  ];

  return (
    <Card className="overflow-hidden flex flex-col border-primary/40">
      <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
        <img src={evt.image} alt={championship.title} loading="lazy" width={800} height={450}
          className="absolute inset-0 h-full w-full object-cover object-center" />
      </AspectRatio>
      <div className={`flex flex-1 flex-col gap-4 border-t-4 border-primary ${mobile ? "p-5" : "p-7"}`}>
        <div>
          <Badge className="gap-1.5 mb-2 bg-primary text-primary-foreground">
            <Trophy className="h-3.5 w-3.5" /> TOUR CHAMPIONSHIP
          </Badge>
          <h2 className={`font-display font-bold ${mobile ? "text-2xl" : "text-3xl"}`}>{championship.title}</h2>
          <p className="mt-1 font-semibold text-primary">{championship.subtitle}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            After a season of competition across the Bay Area, the top 24 eligible players in the SFGT standings will compete for the 2026 Tour Championship.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div className="col-span-2">
            <dt className="text-muted-foreground flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> Date</dt>
            <dd className="font-semibold mt-0.5">{championship.weekday}, {championship.date}</dd>
          </div>
          <div><dt className="text-muted-foreground">Field</dt><dd className="font-semibold">{championship.qualifyingPlayers} Qualifiers</dd></div>
          <div><dt className="text-muted-foreground">Prize Purse</dt><dd className="font-semibold">{championship.prizePurse}</dd></div>
          <div className="col-span-2"><dt className="text-muted-foreground">Format</dt><dd className="font-semibold">18 Holes + Top 4 Playoff</dd></div>
        </dl>

        <section className="border-y border-primary/20 py-3" aria-label="Championship Format">
          <h3 className="text-sm font-semibold mb-2">Championship Format</h3>
          <ol className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
            {steps.map((step) => (
              <li key={step.label} className="min-w-0">
                <span className="block text-lg font-bold text-primary">{step.value}</span>
                <span className="block text-xs text-muted-foreground">{step.label}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-auto pt-1 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="h-9 text-sm" disabled={!actions.scorecard} asChild={!!actions.scorecard}>
              {actions.scorecard ? <Link to={actions.scorecard}><FileText className="mr-1.5 h-4 w-4" /> Scorecard</Link> : <><FileText className="mr-1.5 h-4 w-4" /> Scorecard</>}
            </Button>
            <Button variant="outline" size="sm" className="h-9 text-sm" disabled={!actions.teeSheet} asChild={!!actions.teeSheet}>
              {actions.teeSheet ? <a href={actions.teeSheet}><ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet</a> : <><ClipboardList className="mr-1.5 h-4 w-4" /> Tee Sheet</>}
            </Button>
          </div>
          <Button size="sm" className="w-full h-9 text-sm" disabled={!actions.roundRecap} asChild={!!actions.roundRecap}>
            {actions.roundRecap ? <a href={actions.roundRecap} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-1.5 h-4 w-4" /> Round Recap</a> : <><ExternalLink className="mr-1.5 h-4 w-4" /> Round Recap</>}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FinaleEventCard;