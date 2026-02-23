import { useState, useEffect } from "react";

interface SearchResult {
  id: string;
  title: string;
  type: "product" | "category" | "blog" | "page";
  url: string;
  image?: string;
  category?: string;
}

interface SearchData {
  results: SearchResult[];
}

interface UseSearchReturn {
  data: SearchData | null;
  isLoading: boolean;
  error: Error | null;
}

export function useSearch(query: string): UseSearchReturn {
  const [data, setData] = useState<SearchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return { data, isLoading, error };
}