import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const Players = () => {
  return (
    <div className="container py-12">
      <h1 className="font-display text-4xl font-bold">Players</h1>
      <p className="mt-2 text-muted-foreground">Browse tour members and player profiles.</p>
      <Card className="mt-8">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <Users className="h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 text-muted-foreground">Player directory coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Players;
