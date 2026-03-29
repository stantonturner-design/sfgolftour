import { useParams, Link } from "react-router-dom";
import { getArticleBySlug } from "@/data/newsArticles";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const NewsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="container py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Article Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          This article doesn't exist or may have been removed.
        </p>
        <Button variant="outline" className="mt-6" asChild>
          <Link to="/news">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article>
      {/* Hero cover image */}
      <div className="relative h-[40vh] min-h-[320px] w-full overflow-hidden bg-secondary md:h-[50vh]">
        <img
          src={article.coverImage}
          alt={article.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container">
            <Badge
              variant="secondary"
              className="mb-3 bg-primary/90 text-primary-foreground"
            >
              {article.category}
            </Badge>
            <h1 className="max-w-3xl font-display text-3xl font-bold text-primary-foreground md:text-5xl">
              {article.title}
            </h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-primary-foreground/70">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.publishDate}>
                {format(new Date(article.publishDate), "MMMM d, yyyy")}
              </time>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="container py-10 md:py-16">
        <div className="mx-auto max-w-2xl">
          <p className="mb-8 text-lg font-medium leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-foreground/85 prose-p:leading-relaxed prose-p:mb-5
              prose-li:text-foreground/85 prose-li:my-1.5
              prose-ul:my-6 prose-ul:pl-5 prose-ol:my-6 prose-ol:pl-5
              prose-strong:text-foreground
              prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          <div className="mt-12 border-t pt-6">
            <Button variant="outline" asChild>
              <Link to="/news">
                <ArrowLeft className="mr-2 h-4 w-4" /> All News
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsArticle;
