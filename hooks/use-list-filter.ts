// src/hooks/useListFilter.ts
import { useState, useEffect, type ChangeEvent } from "react";
import useDebounce from "./use-debounce";

export interface BaseFilterParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filter?: Record<string, any>;
  [key: string]: any;
}

export function useListFilter<T extends BaseFilterParams>(
  initialState: T,
  options?: {
    resetDependency?: any;
    searchKey?: string;
    debounceTime?: number;
  }
) {
  const searchField = options?.searchKey ?? "search";
  const debounceTime = options?.debounceTime ?? 500;

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, debounceTime);

  const [params, setParams] = useState<T>(initialState);

  // 👉 1. Reset params khi dependency thay đổi
  useEffect(() => {
    if (
      options?.resetDependency !== undefined &&
      options?.resetDependency !== params[searchField]
    ) {
      setParams({
        ...initialState,
        page: 0, // Reset về trang đầu
        [searchField]: options.resetDependency,
      } as T);
      setSearchTerm("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.resetDependency]);

  // 👉 2. Sync search vào params
  useEffect(() => {
    // Chỉ update nếu giá trị thực sự thay đổi để tránh loop
    if (params.filter?.[searchField] !== debouncedSearch) {
      setParams((prev) => ({
        ...prev,
        page: 0,
        filter: {
          ...prev.filter,
          [searchField]: debouncedSearch,
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // 👉 3. Handler Search input
  const handleSearch = (value: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof value === "string") {
      setSearchTerm(value);
    } else {
      setSearchTerm(value.currentTarget.value);
    }
  };

  // 👉 4. Handler Sort
  const handleSortChange = (
    field: string,
    order: "asc" | "desc" | undefined
  ) => {
    setParams((prev) => ({
      ...prev,
      page: 0,
      sortBy: order ? field : undefined,
      sortOrder: order,
    }));
  };

  // 👉 5. Handler Filter dynamic (Đã sửa đổi)
  // Nhận vào một object các filter cần thay đổi: { status: 'active', branchId: 1 }
  const handleFilterChange = (newFilters: Record<string, any>) => {
    setParams((prev) => {
      // Xử lý logic: nếu value là "all" thì gán undefined
      const processedFilters = Object.entries(newFilters).reduce(
        (acc, [key, value]) => {
          acc[key] = value === "all" ? undefined : value;
          return acc;
        },
        {} as Record<string, any>
      );

      return {
        ...prev,
        page: 0, // Luôn reset về trang 1 khi filter
        filter: {
          ...(prev.filter ?? {}), // Giữ lại các filter cũ
          ...processedFilters, // Ghi đè các filter mới
        },
      };
    });
  };

  // 👉 6. Handler Pagination
  const handlePageChange = (page: number, pageSize?: number) => {
    setParams((prev) => ({
      ...prev,
      page,
      pageSize: pageSize ?? prev.pageSize,
    }));
  };

  // 👉 7. Helper để reset toàn bộ filter về mặc định (Optional nhưng hữu dụng)
  const resetFilters = () => {
    setParams((prev) => ({
      ...prev,
      page: 0,
      filter: {},
    }));
    setSearchTerm("");
  };

  return {
    params,
    searchTerm,
    setParams,
    handlers: {
      handleSearch,
      handleSortChange,
      handleFilterChange,
      handlePageChange,
      resetFilters,
    },
  };
}
