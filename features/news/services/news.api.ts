import apiClient from "@/lib/api-client";
import { MOCK_NEWS } from "../mocks/news.mock";
import { GetNewsListRequestDto, GetNewsListResponseDto } from "./news.dto";
import { MarketSentiment, NewsArticle } from "../types/news.type";

export const getNews = async (
  params: GetNewsListRequestDto,
): Promise<GetNewsListResponseDto> => {
  const { page = 1, pageSize = 10, filter } = params;

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", pageSize.toString());

  const symbol = filter?.category; // "BTC", "ETH"...
  const search = filter?.search;

  // luôn dùng 1 endpoint
  let url = "/news";

  // truyền symbol qua query
  if (symbol && symbol !== "All" && symbol !== "all") {
    queryParams.append("symbol", symbol);
  }

  if (search) {
    queryParams.append("q", search);
  }

  const response = await apiClient.get(`${url}?${queryParams.toString()}`);
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
