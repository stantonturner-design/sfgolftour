import { Newspaper } from "lucide-react";

const News = () => (
  <div className="container py-16">
    <h1 className="font-display text-4xl font-bold">Tour News</h1>
    <p className="mt-2 text-muted-foreground">The latest updates and announcements from the SFGT.</p>
    <div className="mt-12 flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
      <Newspaper className="h-12 w-12 opacity-40" />
      <p className="mt-4">News articles will appear here once posted by admins.</p>
    </div>
  </div>
);

export default News;
