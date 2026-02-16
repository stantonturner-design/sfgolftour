import { Trophy } from "lucide-react";

const Leaderboard = () => (
  <div className="container py-16">
    <h1 className="font-display text-4xl font-bold">Leaderboard & Standings</h1>
    <p className="mt-2 text-muted-foreground">Season-long standings and per-event results.</p>
    <div className="mt-12 flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
      <Trophy className="h-12 w-12 opacity-40" />
      <p className="mt-4">Standings will appear here once scores are submitted.</p>
    </div>
  </div>
);

export default Leaderboard;
