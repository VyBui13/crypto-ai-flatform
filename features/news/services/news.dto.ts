import { BaseListRequest, PaginatedResponse } from "@/lib/global-type";
import { NewsArticle } from "../types/news.type";

export type NewsFilter = {
  search?: string;
};

export type NewsSortField = "publishedAt" | "sentimentScore";

export type GetNewsListResponseDto = PaginatedResponse<NewsArticle>;

export type GetNewsListRequestDto = BaseListRequest<NewsFilter, NewsSortField>;
