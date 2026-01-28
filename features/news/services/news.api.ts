import apiClient from "@/lib/api-client";
import { MOCK_NEWS } from "../mocks/news.mock";
import { GetNewsListRequestDto, GetNewsListResponseDto } from "./news.dto";
import { MarketSentiment, NewsArticle } from "../types/news.type";

export const getNews = async (
  params: GetNewsListRequestDto,
): Promise<GetNewsListResponseDto> => {
  const { page = 1, pageSize = 10, filter } = params;

  // 1. Chuẩn bị Query Params chung
  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", pageSize.toString());

  // Lấy giá trị filter
  const symbol = filter?.category; // "BTC", "ETH"...
  const search = filter?.search;

  // 2. LOGIC CHỌN ENDPOINT
  let url = "/news";

  if (symbol && symbol !== "All" && symbol !== "all") {
    url = `/news/by-symbol/${symbol}`;
  }

  if (search) {
    queryParams.append("q", search);
  }

  // Gọi API
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
