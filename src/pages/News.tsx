import { Link } from "react-router-dom";
import { newsArticles } from "@/data/newsArticles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

const News = () => {
  const sorted = [...newsArticles].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  const [featured, ...rest] = sorted;

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold">Tour News</h1>
        <p className="mt-2 text-muted-foreground">
          The latest updates and announcements from the SFGT.
        </p>
      </div>

      {/* Featured article */}
      <Link to={`/news/${featured.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={featured.coverImage}
            alt={featured.title}
            className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-[420px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <Badge variant="secondary" className="mb-2 bg-primary/90 text-primary-foreground">
              {featured.category}
            </Badge>
            <h2 className="max-w-2xl font-display text-2xl font-bold text-primary-foreground md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/75 md:text-base">
              {featured.excerpt}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-primary-foreground/60">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={featured.publishDate}>
                {format(new Date(featured.publishDate), "MMMM d, yyyy")}
              </time>
            </div>
          </div>
        </div>
      </Link>

      {/* Article grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((article) => (
          <Link key={article.id} to={`/news/${article.slug}`} className="group">
            <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge
                  variant="secondary"
                  className="absolute left-3 top-3 bg-primary/90 text-primary-foreground text-xs"
                >
                  {article.category}
                </Badge>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={article.publishDate}>
                    {format(new Date(article.publishDate), "MMM d, yyyy")}
                  </time>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
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
  );
};

export default News;
