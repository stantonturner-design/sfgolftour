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

      {/* Three info blocks */}
      <section className="container -mt-10 relative z-10">
        <div className="grid gap-4 md:grid-cols-3">

          {/* Current Event */}
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Current Event</h3>
              </div>
              <div>
                <p className="font-semibold">{CURRENT_EVENT.name}</p>
                <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" /> Payout: {CURRENT_EVENT.payoutDate}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Trophy className="h-4 w-4 text-accent" />
                {CURRENT_EVENT.prizes.map((p) => (
                  <Badge key={p.place} variant="secondary" className="text-xs font-medium">
                    {p.place}: {p.amount}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to={`/tee-sheet?event=${encodeURIComponent(CURRENT_EVENT.shortName)}`}>
                  <ClipboardList className="mr-1 h-4 w-4" /> View Tee Sheet
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Current Standings */}
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Current Standings</h3>
              </div>
              <div className="space-y-2">
                {topPlayers.length > 0 ? (
                  topPlayers.map((p) => (
                    <div key={p.rank} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2 text-sm">
                      <span className="font-medium">
                        <span className="mr-2 text-muted-foreground">{p.rank}.</span>
                        {p.name}
                      </span>
                      <span className="font-semibold">{p.points.toFixed(1)} pts</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Loading standings…</p>
                )}
              </div>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/leaderboard">
                  Full Leaderboard <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Tour News */}
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Newspaper className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Tour News</h3>
              </div>
              <div className="space-y-2">
                {latestNews.map((article) => (
                  <Link
                    key={article.id}
                    to={`/news/${article.slug}`}
                    className="block rounded-md border border-border bg-muted/30 px-3 py-2 text-sm transition-colors hover:bg-muted/60"
                  >
                    <p className="font-medium leading-snug">{article.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {format(new Date(article.publishDate), "MMM d, yyyy")}
                    </p>
                  </Link>
                ))}
              </div>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/news">
                  All News <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

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
