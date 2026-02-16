import { Calendar } from "lucide-react";

const Events = () => (
  <div className="container py-16">
    <h1 className="font-display text-4xl font-bold">Event Schedule</h1>
    <p className="mt-2 text-muted-foreground">Upcoming and past events for the San Francisco Golf Tour.</p>
    <div className="mt-12 flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
      <Calendar className="h-12 w-12 opacity-40" />
      <p className="mt-4">Events will appear here once the backend is connected.</p>
    </div>
  </div>
);

export default Events;
