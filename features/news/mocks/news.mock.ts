import { NewsArticle, SentimentType } from "../types/news.type";

export const MOCK_NEWS: NewsArticle[] = [
  // {
  //   id: "1",
  //   title: "SEC Officially Approves Bitcoin Spot ETF",
  //   summary:
  //     "The Securities and Exchange Commission has finally given the green light to multiple Bitcoin Spot ETFs, opening the floodgates for institutional investment.",
  //   source: "Bloomberg",
  //   url: "#",
  //   publishedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
  //   relatedCoins: ["BTC"],
  //   sentiment: SentimentType.Positive,
  //   sentimentScore: 0.95,
  //   aiReasoning:
  //     "Regulatory approval is a major catalyst for institutional adoption and liquidity inflow.",
  // },
  // {
  //   id: "2",
  //   title: "Ethereum Network Gas Fees Spike to 3-Month High",
  //   summary:
  //     "Increased activity on NFT marketplaces has driven Ethereum transaction costs up, causing frustration among retail users.",
  //   source: "CoinDesk",
  //   url: "#",
  //   publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  //   relatedCoins: ["ETH"],
  //   sentiment: SentimentType.Negative,
  //   sentimentScore: -0.4,
  //   aiReasoning:
  //     "High fees degrade user experience and may push users to Layer-2 solutions or competitors like Solana.",
  // },
  // {
  //   id: "3",
  //   title: "Solana Releases New Mobile Saga Update",
  //   summary:
  //     "Solana Mobile announces a significant software update for its Saga phone, integrating deeper DeFi features.",
  //   source: "Solana Blog",
  //   url: "#",
  //   publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  //   relatedCoins: ["SOL"],
  //   sentiment: SentimentType.Positive,
  //   sentimentScore: 0.6,
  //   aiReasoning:
  //     "Product ecosystem expansion is generally bullish for long-term utility.",
  // },
  // {
  //   id: "4",
  //   title: "Market Consolidates Ahead of Fed Meeting",
  //   summary:
  //     "Crypto and traditional markets show low volatility as traders await the Federal Reserve's interest rate decision.",
  //   source: "Reuters",
  //   url: "#",
  //   publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
  //   relatedCoins: ["BTC", "ETH", "SPX"],
  //   sentiment: SentimentType.Neutral,
  //   sentimentScore: 0.1,
  //   aiReasoning: "Uncertainty usually leads to sideways price action.",
  // },
  // {
  //   id: "5",
  //   title: "Major Exchange Hack: $50M Stolen",
  //   summary:
  //     "A prominent Asian exchange has halted withdrawals following a security breach involving hot wallets.",
  //   source: "The Block",
  //   url: "#",
  //   publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  //   relatedCoins: ["USDT", "BTC"],
  //   sentiment: SentimentType.Negative,
  //   sentimentScore: -0.85,
  //   aiReasoning:
  //     "Security breaches damage market confidence and often trigger panic selling.",
  // },
];
