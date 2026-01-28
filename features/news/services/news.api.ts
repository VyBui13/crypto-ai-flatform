import apiClient from "@/lib/api-client";
import { MOCK_NEWS } from "../mocks/news.mock";
import { GetNewsListRequestDto, GetNewsListResponseDto } from "./news.dto";
import { MarketSentiment, NewsArticle } from "../types/news.type";

export const getNews = async (
  params: GetNewsListRequestDto,
): Promise<GetNewsListResponseDto> => {
  const queryParams = new URLSearchParams();

  // Mapping params từ UI sang chuẩn của Backend
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.pageSize) queryParams.append("limit", params.pageSize.toString());

  // Nếu có search text
  if (params.filter?.search) {
    queryParams.append("q", params.filter.search); // Hoặc 'search' tùy backend
    // Nếu backend bắt buộc dùng endpoint /news/search riêng thì check logic ở đây
  }

  // Gọi endpoint /news
  const response = await apiClient.get(`/news?${queryParams.toString()}`);
  return response.data;
};

export const getNewsBySymbol = async (
  symbol: string,
  page: number = 1,
  limit: number = 10,
): Promise<GetNewsListResponseDto> => {
  const response = await apiClient.get(
    `/news/by-symbol/${symbol}?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getNewsDetail = async (id: string): Promise<NewsArticle> => {
  const response = await apiClient.get(`/news/${id}`);
  return response.data;
};

export const getMarketSentiment = async (): Promise<MarketSentiment> => {
  const response = await apiClient.get("/analysis/sentiment/market");
  return response.data;
};
