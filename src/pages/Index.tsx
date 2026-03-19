import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Newspaper, ArrowRight, DollarSign, ClipboardList } from "lucide-react";
import { newsArticles } from "@/data/newsArticles";
import { Badge } from "@/components/ui/badge";
import { parseCSV } from "@/lib/csv";
import { format } from "date-fns";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFoFbbyxvSushAcAppZY8YEP-cDAXH5GhQCewq4QOgIW-WqIW7SDcHX4Xsz2UeP7tI4OYAjZTgQVOc/pub?gid=191837314&single=true&output=csv";

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
  const latestNews = newsArticles.slice(0, 3);
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
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary))_0%,transparent_60%)]" />
        </div>
        <div className="container relative text-center">
          <p className="mb-3 font-semibold uppercase tracking-[0.2em] text-sm text-secondary-foreground/70">EST. 2022</p>
          <h1 className="text-5xl font-bold leading-tight font-sans md:text-7xl">
            San Francisco
            <br />Golf Tour
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-secondary-foreground/80 font-sans">
            Competitive amateur golf across the finest courses in the Bay Area. Join the tour, compete in events, and track your journey to the top.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/events">View Events</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <Link to="/signup">Join the Tour</Link>
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
                      <span className="font-semibold">{p.points} pts</span>
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

      {/* Spacer */}
      <div className="py-8" />
    </div>
  );
};

export default Index;
