import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetNewsListRequestDto } from "./news.dto";
import { getNews, getNewsDetail } from "./news.api";
import { NEWS_KEYS } from "../constants/news.key";

export const useInfiniteNewsQuery = (params: GetNewsListRequestDto) => {
  return useInfiniteQuery({
    queryKey: [NEWS_KEYS.NEWS, NEWS_KEYS.INFINITE, params],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams: GetNewsListRequestDto = {
        pageSize: 10, // Default pageSize nếu params không có
        ...params, // Spread params từ UI (filter, search...)
        page: pageParam as number, // Ghi đè page bằng pageParam của React Query
      };
      return getNews(queryParams);
    },
    getNextPageParam: (lastPage) => {
      // FIX: Sử dụng field 'has_more' từ API response mới
      if (lastPage.has_more) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 1, // 1 phút
  });
};

export const useNewsDetail = (id: string) => {
  return useQuery({
    queryKey: [NEWS_KEYS.NEWS, NEWS_KEYS.DETAIL, id],
    queryFn: () => getNewsDetail(id),
    enabled: !!id, // Chỉ chạy khi có ID
    staleTime: 5 * 60 * 1000, // Cache 5 phút
  });
};
