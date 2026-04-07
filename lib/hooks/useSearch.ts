"use client";

import { useState, useMemo, useCallback, useRef } from "react";

interface UseSearchOptions<T> {
  data: T[];
  keys: (item: T) => string | string[];
  debounce?: number;
}

interface UseSearchReturn<T> {
  query: string;
  setQuery: (value: string) => void;
  results: T[];
}

export function useSearch<T>({
  data,
  keys,
  debounce = 0,
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [query, setQueryRaw] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setQuery = useCallback(
    (value: string) => {
      setQueryRaw(value);
      if (debounce > 0) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setDebouncedQuery(value), debounce);
      } else {
        setDebouncedQuery(value);
      }
    },
    [debounce]
  );

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return data;

    return data.filter((item) => {
      const fields = keys(item);
      const values = Array.isArray(fields) ? fields : [fields];
      return values.some((v) => v.toLowerCase().includes(q));
    });
  }, [data, debouncedQuery, keys]);

  return { query, setQuery, results };
}