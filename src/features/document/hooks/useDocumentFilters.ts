"use client";

import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useMemo, useState } from "react";

export function useDocumentFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const safeSearchParams = useMemo(() => {
    return searchParams ?? new URLSearchParams();
  }, [searchParams]);

  const page = Number(safeSearchParams.get("page") ?? 1);
  const search = safeSearchParams.get("search") ?? "";

  const [keyword, setKeyword] = useState(search);

  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    setKeyword(search);
  }, [search]);

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(safeSearchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value.trim()) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      return params.toString();
    },
    [safeSearchParams],
  );

  useEffect(() => {
    const nextQuery = createQueryString({
      search: debouncedKeyword,
      page: "1",
    });

    const currentQuery = safeSearchParams.toString();

    if (nextQuery !== currentQuery) {
      router.replace(`${pathname}?${nextQuery}`);
    }
  }, [debouncedKeyword, createQueryString, pathname, router, safeSearchParams]);

  const setPage = useCallback(
    (nextPage: number) => {
      const nextQuery = createQueryString({
        page: String(nextPage),
      });

      router.push(`${pathname}?${nextQuery}`);
    },
    [createQueryString, pathname, router],
  );

  return {
    page,
    search,
    keyword,
    setKeyword,
    setPage,
  };
}
