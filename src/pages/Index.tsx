import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Newspaper, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary py-24 text-secondary-foreground md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary))_0%,transparent_60%)]" />
        </div>
        <div className="container relative text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Est. 2025 &middot; San Francisco, CA
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
            San Francisco<br />Golf Tour
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg opacity-80">
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

      {/* Quick Links */}
      <section className="container -mt-10 relative z-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Calendar, title: "Upcoming Events", desc: "See the schedule and sign up for tee times", to: "/events" },
            { icon: Trophy, title: "Leaderboard", desc: "Season standings and player rankings", to: "/leaderboard" },
            { icon: Newspaper, title: "Tour News", desc: "Latest updates and announcements", to: "/news" },
          ].map((item) => (
            <Link key={item.to} to={item.to}>
              <Card className="group transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Player Spotlight */}
      <section className="container py-16 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Player Spotlight</p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Featured Player</h2>
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

      {/* News Preview */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Latest</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Tour News</h2>
            </div>
            <Button variant="link" asChild>
              <Link to="/news">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-40 bg-muted" />
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                  <h3 className="mt-1 font-display text-lg font-semibold">News Article {i}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Stay tuned for the latest updates from the San Francisco Golf Tour.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
