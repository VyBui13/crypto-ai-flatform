"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickSeries,
  ISeriesApi,
} from "lightweight-charts";
import { useHistoricalData } from "../services/market.query";

interface TradingChartProps {
  symbol: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const { data: candles, isLoading } = useHistoricalData(symbol);

  useLayoutEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;

    let chart: IChartApi | null = null;

    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;

      if (width > 0 && !chart) {
        chart = createChart(container, {
          layout: {
            background: { type: ColorType.Solid, color: "#131722" },
            textColor: "#d1d4dc",
          },
          grid: {
            vertLines: { color: "#2B2B43" },
            horzLines: { color: "#2B2B43" },
          },
          width,
          height: 500,
        });

        const series = chart.addSeries(CandlestickSeries, {
          upColor: "#26a69a",
          downColor: "#ef5350",
          borderVisible: false,
          wickUpColor: "#26a69a",
          wickDownColor: "#ef5350",
        });

        chartRef.current = chart;
        seriesRef.current = series;
      }

      if (chart) {
        chart.applyOptions({ width });
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      chart?.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  // Update data when candles change
  useEffect(() => {
    if (seriesRef.current && candles?.length) {
      seriesRef.current.setData(candles as any);
      chartRef.current?.timeScale().fitContent();
    }
  }, [candles]);

  return (
    <div className="w-full h-full bg-[#131722] relative group">
      <div className="absolute top-2 left-2 z-20 text-white font-bold bg-black/50 px-2 rounded pointer-events-none">
        {symbol} - D1
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#131722] bg-opacity-80">
          <div className="text-white">Loading Chart Data...</div>
        </div>
      )}

      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};
