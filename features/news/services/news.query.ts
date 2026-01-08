import { useInfiniteQuery } from "@tanstack/react-query";
import { GetNewsListRequestDto } from "./news.dto";
import { getNews } from "./news.api";
import { NEWS_KEYS } from "../constants/news.key";

export const useInfiniteNewsQuery = (params: GetNewsListRequestDto) => {
  return useInfiniteQuery({
    queryKey: [NEWS_KEYS.NEWS, NEWS_KEYS.INFINITE, params],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams: GetNewsListRequestDto = {
        page: pageParam as number,
        pageSize: 5,
        ...params,
      };
      return getNews(queryParams);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.items.length < 5) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 1, // 1 phút
  });
};
