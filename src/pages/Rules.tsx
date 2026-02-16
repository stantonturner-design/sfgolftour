import { BookOpen } from "lucide-react";

const Rules = () => (
  <div className="container py-16">
    <h1 className="font-display text-4xl font-bold">Tour Rules</h1>
    <p className="mt-2 text-muted-foreground">Official rules and format for the San Francisco Golf Tour.</p>
    <div className="mt-12 flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
      <BookOpen className="h-12 w-12 opacity-40" />
      <p className="mt-4">Tour rules will be posted here by the admin.</p>
    </div>
  </div>
);

export default Rules;
