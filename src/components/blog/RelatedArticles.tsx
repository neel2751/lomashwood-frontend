"use client";

import { ArrowRight, Clock, Calendar, TrendingUp, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
const Tabs = ({ 

  children 
}: { 
  value: string; 
  onValueChange: (value: string) => void; 
  children: React.ReactNode;
}) => <div>{children}</div>;

const TabsList = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
    {children}
  </div>
);

const TabsTrigger = ({ 
  children,
  onClick
}: { 
  value: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
  >
    {children}
  </button>
);

const TabsContent = ({  
  children,
  className 
}: { 
  value: string; 
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>{children}</div>
);
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  image: string;
  category: {
    name: string;
    slug: string;
    color?: string;
  };
  author?: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime?: number;
  views?: number;
  trending?: boolean;
  similarity?: number;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  currentArticleId?: string;
  title?: string;
  variant?: "grid" | "list" | "carousel" | "compact";
  maxArticles?: number;
  showCategory?: boolean;
  showAuthor?: boolean;
  showExcerpt?: boolean;
  showMetadata?: boolean;
  groupByCategory?: boolean;
  className?: string;
}

export default function RelatedArticles({
  articles,
  currentArticleId,
  title = "Related Articles",
  variant = "grid",
  maxArticles = 6,
  showCategory = true,
  showAuthor = false,
  showExcerpt = true,
  showMetadata = true,
  groupByCategory = false,
  className,
}: RelatedArticlesProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => article.id !== currentArticleId)
      .slice(0, maxArticles);
  }, [articles, currentArticleId, maxArticles]);

  const groupedArticles = useMemo(() => {
    if (!groupByCategory) return { all: filteredArticles };

    const groups: Record<string, RelatedArticle[]> = {
      all: filteredArticles,
    };

    filteredArticles.forEach((article) => {
      const categoryName = article.category.name;
      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }
      groups[categoryName].push(article);
    });

    return groups;
  }, [filteredArticles, groupByCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  if (filteredArticles.length === 0) {
    return null;
  }

  if (variant === "compact") {
    return (
      <div className={cn("space-y-4", className)}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="space-y-2">
          {filteredArticles.map((article) => (
            <a key={article.id} href={`/blog/${article.slug}`}>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group cursor-pointer">
                <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-medium line-clamp-2 text-sm group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  {showMetadata && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {article.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime} min</span>
                        </div>
                      )}
                      {article.trending && (
                        <Badge variant="secondary" className="h-4 px-1 text-xs">
                          <TrendingUp className="h-2 w-2" />
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          {filteredArticles.length > 3 && (
            <Button variant="ghost" asChild>
              <a href="/blog">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <a href={`/blog/${article.slug}`}>
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative h-48 sm:h-auto sm:w-64 flex-shrink-0 overflow-hidden bg-muted">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {showCategory && (
                      <Badge
                        className="absolute top-3 left-3"
                        style={{
                          backgroundColor: article.category.color || undefined,
                        }}
                      >
                        {article.category.name}
                      </Badge>
                    )}
                    {article.trending && (
                      <Badge variant="secondary" className="absolute top-3 right-3">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="space-y-3 flex-1">
                      {/* Metadata */}
                      {showMetadata && (
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                          {article.readTime && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{article.readTime} min</span>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      {showExcerpt && article.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Author */}
                    {showAuthor && article.author && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        <span className="text-sm text-muted-foreground">
                          By {article.author.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "carousel") {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="flex-shrink-0 w-80 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer snap-start"
            >
              <a href={`/blog/${article.slug}`}>
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {showCategory && (
                    <Badge
                      className="absolute top-3 left-3"
                      style={{
                        backgroundColor: article.category.color || undefined,
                      }}
                    >
                      {article.category.name}
                    </Badge>
                  )}
                </div>

                <CardHeader className="space-y-3">
                  {showMetadata && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {article.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime} min</span>
                        </div>
                      )}
                    </div>
                  )}

                  <h3 className="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {showExcerpt && article.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                </CardHeader>
              </a>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          {title}
        </h2>
        {filteredArticles.length > 3 && (
          <Button variant="ghost" asChild>
            <a href="/blog">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </div>

      {groupByCategory && Object.keys(groupedArticles).length > 2 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger 
              value="all" 
              onClick={() => setActiveTab("all")}
            >
              All
            </TabsTrigger>
            {Object.keys(groupedArticles)
              .filter((key) => key !== "all")
              .map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveTab(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
          </TabsList>

          {Object.entries(groupedArticles).map(([category, categoryArticles]) => (
            activeTab === category && (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      showCategory={showCategory}
                      showMetadata={showMetadata}
                      showExcerpt={showExcerpt}
                    />
                  ))}
                </div>
              </TabsContent>
            )
          ))}
        </Tabs>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              showCategory={showCategory}
              showMetadata={showMetadata}
              showExcerpt={showExcerpt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ArticleCard({
  article,
  showCategory,
  showMetadata,
  showExcerpt,
}: {
  article: RelatedArticle;
  showCategory: boolean;
  showMetadata: boolean;
  showExcerpt: boolean;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer h-full flex flex-col">
      <a href={`/blog/${article.slug}`}>
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {showCategory && (
            <Badge
              className="absolute top-3 left-3"
              style={{
                backgroundColor: article.category.color || undefined,
              }}
            >
              {article.category.name}
            </Badge>
          )}
          {article.trending && (
            <Badge variant="secondary" className="absolute top-3 right-3">
              <TrendingUp className="h-3 w-3" />
            </Badge>
          )}
        </div>

        <CardHeader className="flex-1 space-y-3">
          {showMetadata && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{formatDate(article.publishedAt)}</span>
              {article.readTime && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime} min</span>
                  </div>
                </>
              )}
            </div>
          )}

          <h3 className="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>

          {showExcerpt && article.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {article.excerpt}
            </p>
          )}
        </CardHeader>

        <CardFooter className="pt-0">
          <Button variant="ghost" size="sm" className="gap-1 group/btn p-0 h-auto">
            Read Article
            <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </a>
    </Card>
  );
}

export function RelatedArticlesSidebar({
  articles,
  maxArticles = 5,
  className,
}: {
  articles: RelatedArticle[];
  maxArticles?: number;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="font-semibold">You May Also Like</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {articles.slice(0, maxArticles).map((article, index) => (
          <div key={article.id}>
            {index > 0 && <Separator className="mb-4" />}
            <a href={`/blog/${article.slug}`}>
              <div className="flex gap-3 group cursor-pointer">
                <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  {article.readTime && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {article.readTime} min read
                    </p>
                  )}
                </div>
              </div>
            </a>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}