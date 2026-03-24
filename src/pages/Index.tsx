import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Newspaper, ArrowRight, DollarSign, ClipboardList, Anchor, User, ExternalLink } from "lucide-react";
import { newsArticles } from "@/data/newsArticles";
import { Badge } from "@/components/ui/badge";
import { parseCSV } from "@/lib/csv";
import { format } from "date-fns";

import { SHEET_URL, CORICA_URL, parseCoricaResults, slugifyName } from "@/lib/playerUtils";
import sfgtLogo from "@/assets/sfgt-logo.png";
import coricaImg from "@/assets/courses/corica-north.jpg";

const CURRENT_EVENT = {
  name: "Corica Park – North Course",
  shortName: "Corica",
  payoutDate: "May 2",
  anchorDay: "April 4",
  image: coricaImg,
  prizes: [
    { place: "Net 1", amount: "$300" },
    { place: "Net 2", amount: "$50" },
    { place: "Gross", amount: "$50" },
  ],
};

type TopPlayer = { rank: number; name: string; points: number };

const Index = () => {
  const latestNews = [...newsArticles]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 3);
  const [topPlayers, setTopPlayers] = useState<TopPlayer[]>([]);
  const [netLeader, setNetLeader] = useState<{ name: string; score: number } | null>(null);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        const rows = parseCSV(text);
        const parsed: TopPlayer[] = [];
        for (let i = 3; i < rows.length && parsed.length < 3; i++) {
          const r = rows[i];
          const rank = parseInt(r[1]);
          if (isNaN(rank)) continue;
          parsed.push({ rank, name: r[2] || "", points: parseFloat(r[3]) || 0 });
        }
        setTopPlayers(parsed);
      })
      .catch(() => {});

    fetch(CORICA_URL)
      .then((res) => res.text())
      .then((text) => {
        const results = parseCoricaResults(parseCSV(text));
        const withNet = results.filter((r) => r.netScore !== null);
        if (withNet.length > 0) {
          withNet.sort((a, b) => a.netScore! - b.netScore!);
          setNetLeader({ name: withNet[0].name, score: withNet[0].netScore! });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        {/* Layered background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,hsl(115_80%_25%/0.5)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(39_75%_92%/0.08)_0%,transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(115_60%_18%/0.3)_0%,transparent_35%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <div className="container relative flex flex-col items-center text-center py-6 md:py-8">
          <p className="mb-2 md:mb-3 font-semibold uppercase tracking-[0.3em] text-[10px] md:text-[11px] text-primary-foreground/40">
            Est. 2022 · Bay Area
          </p>
          <div className="relative">
            <div className="absolute -inset-6 md:-inset-12 rounded-full bg-primary/15 blur-3xl" />
            <img
              src={sfgtLogo}
              alt="San Francisco Golf Tour"
              className="relative h-24 w-auto md:h-40 object-contain drop-shadow-[0_4px_24px_rgba(9,101,0,0.3)]"
            />
          </div>
        </div>
      </section>

      {/* Featured info blocks */}
      <section className="container -mt-6 md:-mt-10 relative z-10 mb-4">
        <div className="grid gap-4 md:gap-5 md:grid-cols-5">

          {/* Current Event — featured panel (3 cols) */}
          <div className="md:col-span-3 rounded-xl bg-accent text-accent-foreground overflow-hidden shadow-lg border border-border relative">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-primary/30 z-10" />

            <div className="flex flex-col md:flex-row h-full">
              {/* Course image — right side on desktop, top on mobile */}
              <div className="relative md:order-2 md:w-2/5 h-44 md:h-auto">
                <img
                  src={CURRENT_EVENT.image}
                  alt={CURRENT_EVENT.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-accent/60 via-transparent to-transparent" />
              </div>

              {/* Content — left side */}
              <div className="md:order-1 md:w-3/5 p-5 md:p-7 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-md bg-primary/10">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Current Event</p>
                </div>

                <h3 className="text-xl md:text-2xl font-bold leading-tight">{CURRENT_EVENT.name}</h3>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-card/60 border border-border/50 p-3">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold mb-1">Cash Payout</p>
                    <p className="font-bold text-sm flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-primary" />
                      {CURRENT_EVENT.payoutDate}
                    </p>
                  </div>
                  <div className="rounded-lg bg-card/60 border border-border/50 p-3">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold mb-1">Anchor Day</p>
                    <p className="font-bold text-sm flex items-center gap-1.5">
                      <Anchor className="h-3.5 w-3.5 text-primary" />
                      {CURRENT_EVENT.anchorDay}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {CURRENT_EVENT.prizes.map((p) => (
                    <Badge key={p.place} className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold px-2.5 py-0.5">
                      {p.place}: {p.amount}
                    </Badge>
                  ))}
                </div>

                {netLeader && (
                  <div className="mt-3 rounded-lg bg-primary/5 border border-primary/15 p-3 flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                      <Trophy className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Current Net Leader</p>
                      <p className="font-bold text-sm">{netLeader.name} <span className="text-muted-foreground font-normal">· {netLeader.score}</span></p>
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-5 flex flex-wrap gap-2.5">
                  <Button size="default" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" asChild>
                    <Link to="/events">
                      View Event <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="default" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5" asChild>
                    <Link to={`/tee-sheet?event=${encodeURIComponent(CURRENT_EVENT.shortName)}`}>
                      <ClipboardList className="mr-1 h-4 w-4" /> Tee Sheet
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — two stacked panels (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-4 md:gap-5">

            {/* Current Standings */}
            <div className="flex-1 rounded-xl border border-border bg-card shadow-sm p-4 md:p-5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5 text-primary" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Standings</h3>
                </div>
                <Button variant="link" size="sm" className="text-xs h-auto p-0" asChild>
                  <Link to="/leaderboard">
                    Full Leaderboard <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-1">
                {topPlayers.length > 0 ? (
                  topPlayers.map((p) => (
                    <div key={p.rank} className="flex items-center justify-between py-1.5 px-2.5 rounded-md bg-accent/50 text-sm">
                      <span className="font-medium">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold mr-1.5">{p.rank}</span>
                        {p.name}
                      </span>
                      <span className="font-bold tabular-nums text-sm">{p.points.toFixed(1)}<span className="text-muted-foreground font-normal ml-0.5 text-xs">pts</span></span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground py-2">Loading standings…</p>
                )}
              </div>
            </div>

            {/* Tour News */}
            <div className="flex-1 rounded-xl border border-border bg-card shadow-sm p-4 md:p-5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <Newspaper className="h-3.5 w-3.5 text-primary" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tour News</h3>
                </div>
                <Button variant="link" size="sm" className="text-xs h-auto p-0" asChild>
                  <Link to="/news">
                    All News <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <div className="divide-y divide-border">
                {latestNews.slice(0, 3).map((article) => (
                  <Link
                    key={article.id}
                    to={`/news/${article.slug}`}
                    className="flex items-start justify-between gap-2 py-2 transition-colors hover:bg-accent/30 group -mx-2 px-2 first:pt-0 last:pb-0 rounded-md"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm leading-snug group-hover:text-primary transition-colors">{article.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {format(new Date(article.publishDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground/30 group-hover:text-primary shrink-0 mt-1 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Player Spotlight + Round Recap */}
      <section className="container my-6 md:my-8">
        <div className="grid gap-4 md:gap-5 md:grid-cols-5">

          {/* Player Spotlight */}
          <div className="md:col-span-3 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="p-5 md:p-7">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center h-6 w-6 rounded-md bg-primary/10">
                  <User className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Player Spotlight</p>
              </div>

              {topPlayers.length > 0 ? (
                <Link to={`/players/${slugifyName(topPlayers[0].name)}`} className="group block">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/20 shrink-0">
                      <span className="text-xl font-bold text-primary">
                        {topPlayers[0].name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {topPlayers[0].name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tour Points Leader · <span className="font-semibold text-foreground">{topPlayers[0].points.toFixed(1)} pts</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1 group-hover:text-primary transition-colors">
                        View Profile <ArrowRight className="h-3 w-3" />
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <p className="text-sm text-muted-foreground">Loading spotlight…</p>
              )}
            </div>
          </div>

          {/* Round Recap */}
          <a
            href="https://roundrecap.com"
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-2 rounded-xl border border-border bg-card shadow-sm p-5 md:p-7 flex flex-col items-center justify-center text-center group hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/15 transition-colors">
              <span className="text-2xl font-black text-primary">R</span>
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
              Round Recap
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 max-w-[200px]">
              Full round stats, hole-by-hole breakdowns & more
            </p>
            <p className="text-xs text-primary mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Open Round Recap <ExternalLink className="h-3 w-3" />
            </p>
          </a>

        </div>
      </section>

      {/* Latest News */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Latest</p>
              <h2 className="mt-2 text-3xl font-bold font-sans">Tour News</h2>
            </div>
            <Button variant="link" asChild>
              <Link to="/news">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {latestNews.map((article) => (
              <Link key={article.id} to={`/news/${article.slug}`} className="group">
                <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(article.publishDate), "MMM d, yyyy")}
                    </p>
                    <h3 className="mt-1 font-sans text-lg font-semibold leading-snug">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
