import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Flag, Trophy, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FINALE_CHAMPIONSHIP as championship, getChampionshipGroupPlayers, type ChampionshipDetail } from "@/data/finale";

const DetailList = ({ items, fallback }: { items: ChampionshipDetail[]; fallback: string }) => (
  <dl className="divide-y divide-border">
    {items.map((item) => (
      <div key={item.label} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-2 sm:gap-4">
        <dt className="font-medium text-foreground">{item.label}</dt>
        <dd>{item.detail ?? fallback}</dd>
      </div>
    ))}
  </dl>
);

const Finale2026 = () => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  const stats = [
    { value: championship.qualifyingPlayers, label: "Qualifying Players" },
    { value: championship.roundHoles, label: "Regulation Holes" },
    { value: championship.playoffPlayers, label: "Playoff Finalists" },
  ];
  const progression = [
    { title: `${championship.qualifyingPlayers} eligible qualifying players`, detail: "The championship field." },
    { title: `${championship.roundHoles}-hole championship round`, detail: `All competitors play the ${championship.regulationCourse}.` },
    { title: `Top ${championship.playoffPlayers} advance`, detail: `${championship.playoffHoles} additional holes on the ${championship.playoffCourse}.` },
    { title: "One 2026 SFGT Tour Champion", detail: "Scoring and tiebreaker rules to be confirmed." },
  ];

  return (
    <div className="container max-w-3xl lg:max-w-5xl px-4 py-8 md:py-12">
      <Button variant="ghost" size="sm" className="mb-6 -ml-3 text-muted-foreground" asChild>
        <Link to="/events#finale"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Events</Link>
      </Button>
      <header className="border-b border-primary/20 pb-6 md:pb-8">
        <Badge variant="outline" className="mb-3 border-primary/30 text-primary">2026 FINALE</Badge>
        <div className="flex items-start gap-3">
          <Trophy className="h-8 w-8 shrink-0 mt-1 text-primary" />
          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">{championship.pageTitle}</h1>
        </div>
        <p className="mt-3 text-base md:text-lg text-muted-foreground italic">{championship.pageSubtitle}</p>
        <p className="mt-4 flex items-center gap-2 text-sm md:text-base font-semibold">
          <Calendar className="h-4 w-4 text-primary shrink-0" />{championship.weekday}, {championship.date}
        </p>
        {championship.venue && <p className="mt-2 text-sm text-muted-foreground">{championship.venue}</p>}
      </header>

      <section aria-label="Championship overview" className="py-6 md:py-8">
        <dl className="grid grid-cols-3 divide-x divide-primary/20 bg-accent/40 py-4 md:py-5">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 text-center">
              <dd className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</dd>
              <dt className="mt-1 text-xs md:text-sm font-medium">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground">
          After a season of competition across the Bay Area, the top 24 regular-season players will compete for the 2026 Tour Championship. Following all competitors playing the 18-hole South Course, the top 4 players will advance to play 9 additional holes on the North Course to determine the 2026 Champion.
        </p>
      </section>

      <section aria-labelledby="championship-field" className="border-y border-primary/20 py-6">
        <h2 id="championship-field" className="flex items-start gap-2 text-xl md:text-2xl font-bold leading-tight">
          <Users className="mt-1 h-5 w-5 shrink-0 text-primary" />Championship Field &amp; Groupings
        </h2>
        {championship.groups.length === 0 ? (
          <p className="mt-4 border-l-2 border-primary/40 bg-accent/40 p-4 text-sm md:text-base text-muted-foreground">
            Official championship groupings and starting information will be announced soon.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {championship.groups.map((group) => (
              <Card key={group.id} className="p-4">
                <h3 className="font-semibold">{group.label}</h3>
                <p className="mt-1 flex items-center gap-2 text-sm text-primary"><Clock className="h-4 w-4" />{group.teeTime ?? "Starting time to be announced"}</p>
                {group.startingInformation && <p className="mt-1 text-sm text-muted-foreground">{group.startingInformation}</p>}
                <ul className="mt-3 border-t pt-3 space-y-2 text-sm">
                  {getChampionshipGroupPlayers(group).map((player) => <li key={player.id}>{player.name}</li>)}
                </ul>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Accordion type="multiple" className="mt-6 space-y-2 motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:transition-none">
        <AccordionItem value="format" className="rounded-lg border px-4 md:px-5">
          <AccordionTrigger className="min-h-14 text-left text-sm md:text-base font-semibold">1. Championship Format</AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            <ol className="space-y-4">
              {progression.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">{index + 1}</span>
                  <div><p className="font-semibold text-foreground">{step.title}</p><p>{step.detail}</p></div>
                </li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="schedule" className="rounded-lg border px-4 md:px-5">
          <AccordionTrigger className="min-h-14 text-left text-sm md:text-base font-semibold">2. Schedule &amp; What to Expect</AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground"><DetailList items={championship.schedule} fallback="Details to be confirmed" /></AccordionContent>
        </AccordionItem>
        <AccordionItem value="scoring" className="rounded-lg border px-4 md:px-5">
          <AccordionTrigger className="min-h-14 text-left text-sm md:text-base font-semibold">3. Scoring &amp; Tiebreakers</AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground"><DetailList items={championship.scoring} fallback="Rules to be confirmed" /></AccordionContent>
        </AccordionItem>
        <AccordionItem value="rules" className="rounded-lg border px-4 md:px-5">
          <AccordionTrigger className="min-h-14 text-left text-sm md:text-base font-semibold">4. Championship Rules</AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-4">
            <DetailList items={championship.rules} fallback="Rules to be confirmed" />
            <Button variant="outline" asChild><Link to="/rules"><Flag className="mr-2 h-4 w-4" /> General SFGT Rules</Link></Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="prizes" className="rounded-lg border px-4 md:px-5">
          <AccordionTrigger className="min-h-14 text-left text-sm md:text-base font-semibold">5. Prizes &amp; Awards</AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground space-y-4">
            <p>{championship.prizePurse ? `Championship prize purse: ${championship.prizePurse}` : "Championship prize details will be announced soon."}</p>
            <DetailList items={championship.awards} fallback="Details to be confirmed" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Finale2026;
