import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Newspaper, ArrowRight, DollarSign, ClipboardList } from "lucide-react";
import { newsArticles } from "@/data/newsArticles";
import { Badge } from "@/components/ui/badge";
import { parseCSV } from "@/lib/csv";
import { format } from "date-fns";

import { SHEET_URL } from "@/lib/playerUtils";

const CURRENT_EVENT = {
  name: "Corica Park – North Course",
  shortName: "Corica",
  payoutDate: "May 2",
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
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary py-24 text-secondary-foreground md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary))_0%,transparent_60%)] shadow-md rounded-none" />
        </div>
        <div className="container relative text-center border-4 border-primary-foreground bg-[#25344b] border-none">
          <p className="mb-3 font-semibold uppercase tracking-[0.2em] text-xl text-[#fff3e0]">EST. 2022</p>
          <h1 className="text-5xl font-bold leading-tight text-[#fff3e0] font-sans bg-[#15841d] md:text-8xl border-4">
            San Francisco
            Golf Tour
            <br />Golf Tour
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg opacity-80 font-sans">
            Competitive amateur golf across the finest courses in the Bay Area. Join the tour, compete in events, and track your journey to the top.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 border-0">
            <Button size="lg" asChild>
              <Link to="/events">View Events</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <a href="https://www.roundrecap.com" target="_blank" rel="noopener noreferrer">View in Round Recap</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured info blocks */}
      <section className="container -mt-10 relative z-10">
        <div className="grid gap-5 md:grid-cols-5">

          {/* Current Event — featured panel (3 cols) */}
          <div className="md:col-span-3 rounded-xl bg-secondary text-secondary-foreground overflow-hidden shadow-lg">
            <div className="p-7 md:p-9 flex flex-col h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-1">Current Event</p>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">{CURRENT_EVENT.name}</h3>

              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <p className="text-secondary-foreground/60 text-xs uppercase tracking-wider mb-0.5">Cash Prize Payout</p>
                  <p className="font-semibold text-base flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-accent" />
                    {CURRENT_EVENT.payoutDate}
                  </p>
                </div>
                <div>
                  <p className="text-secondary-foreground/60 text-xs uppercase tracking-wider mb-0.5">Anchor Day</p>
                  <p className="font-semibold text-base flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-accent" />
                    April 4
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {CURRENT_EVENT.prizes.map((p) => (
                  <Badge key={p.place} className="bg-secondary-foreground/10 text-secondary-foreground border-secondary-foreground/20 text-sm font-semibold px-3 py-1">
                    {p.place}: {p.amount}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto pt-6 flex flex-wrap gap-3">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link to="/events">
                    View Event <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-secondary-foreground/25 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
                  <Link to={`/tee-sheet?event=${encodeURIComponent(CURRENT_EVENT.shortName)}`}>
                    <ClipboardList className="mr-1 h-4 w-4" /> Tee Sheet
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right column — two stacked panels (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-5">

            {/* Current Standings */}
            <div className="flex-1 rounded-xl border border-border bg-card shadow-sm p-5 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Standings</h3>
                </div>
                <Button variant="link" size="sm" className="text-xs h-auto p-0" asChild>
                  <Link to="/leaderboard">
                    Full Leaderboard <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-1.5">
                {topPlayers.length > 0 ? (
                  topPlayers.map((p) => (
                    <div key={p.rank} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/40 text-sm">
                      <span className="font-medium">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold mr-2">{p.rank}</span>
                        {p.name}
                      </span>
                      <span className="font-bold tabular-nums">{p.points.toFixed(1)}<span className="text-muted-foreground font-normal ml-0.5">pts</span></span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground py-2">Loading standings…</p>
                )}
              </div>
            </div>

            {/* Tour News */}
            <div className="flex-1 rounded-xl border border-border bg-card shadow-sm p-5 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tour News</h3>
                </div>
                <Button variant="link" size="sm" className="text-xs h-auto p-0" asChild>
                  <Link to="/news">
                    All News <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-1">
                {latestNews.slice(0, 3).map((article) => (
                  <Link
                    key={article.id}
                    to={`/news/${article.slug}`}
                    className="flex items-start justify-between gap-3 py-2.5 px-3 rounded-lg transition-colors hover:bg-muted/50 group"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm leading-snug group-hover:text-primary transition-colors">{article.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {format(new Date(article.publishDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-1 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Player Spotlight */}
      <section className="container py-16 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Player Spotlight</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl font-sans">Featured Player</h2>
            <p className="mt-4 text-muted-foreground">
              Each month, we highlight an outstanding tour member. Check back soon to see who's making waves on the SFGT circuit.
            </p>
            <Button variant="outline" className="mt-6" asChild>
              <Link to="/leaderboard">View All Players <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <Card className="overflow-hidden">
            <div className="flex h-64 items-center justify-center bg-muted">
              <div className="text-center text-muted-foreground">
                <Trophy className="mx-auto h-12 w-12 opacity-40" />
                <p className="mt-3 text-sm">Spotlight coming soon</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Latest</p>
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
                    <h3 className="mt-1 font-display text-lg font-semibold leading-snug">
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
