"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickSeries,
  ISeriesApi,
  MouseEventParams,
  CrosshairMode,
  SeriesMarker,
  Time,
} from "lightweight-charts";
import { useHistoricalData } from "../services/market.query";
import { useAppStore } from "@/stores/app.store";

interface TradingChartProps {
  symbol: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const { data: candles, isLoading } = useHistoricalData(symbol);
  const { activeTool } = useAppStore();

  useLayoutEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;
    let chart: IChartApi | null = null;

    const initChart = (width: number, height: number) => {
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
        height,
        crosshair: { mode: CrosshairMode.Normal },
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

      // Set data nếu đã có sẵn
      if (candles?.length) {
        series.setData(candles as any);
        chart.timeScale().fitContent();
      }

      // Handle click for markers
      chart.subscribeClick((param: MouseEventParams) => {
        if (!param.time || !series) return;

        const currentTool = useAppStore.getState().activeTool;

        if (currentTool === "trendline") {
          const internalSeries = series as any;
          const currentMarkers = internalSeries.markers?.() || [];

          const newMarker: SeriesMarker<Time> = {
            time: param.time as Time,
            position: "aboveBar",
            color: "#e91e63",
            shape: "arrowDown",
            text: "Sell",
            size: 2,
          };

          internalSeries.setMarkers([...currentMarkers, newMarker]);
        }
      });
    };

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const h = height || 500;

      // Nếu có size hợp lệ mà chưa có chart → init
      if (width > 0 && !chart) {
        initChart(width, h);
      }

      // Nếu đã có chart và size hợp lệ → resize
      if (chart && width > 0) {
        chart.applyOptions({ width, height: h });
      }

      // Nếu container về 0 → remove để chờ init lại
      if (width === 0 && chart) {
        chart.remove();
        chart = null;
        chartRef.current = null;
        seriesRef.current = null;
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      chart?.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [candles]);

  // Update data khi candles thay đổi
  useEffect(() => {
    if (seriesRef.current && candles?.length) {
      seriesRef.current.setData(candles as any);
      chartRef.current?.timeScale().fitContent();
    }
  }, [candles]);

  // Update crosshair theo tool
  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.applyOptions({
      crosshair: {
        mode:
          activeTool === "cursor" ? CrosshairMode.Magnet : CrosshairMode.Normal,
      },
    });
  }, [activeTool]);

  return (
    <div className="w-full h-full bg-[#131722] relative flex flex-col min-h-[400px]">
      <div className="absolute top-2 left-2 z-20 text-white font-bold bg-black/50 px-2 rounded pointer-events-none select-none">
        {symbol} - D1
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#131722] bg-opacity-80">
          <div className="text-white animate-pulse">Loading Chart Data...</div>
        </div>
      )}

      <div
        ref={chartContainerRef}
        className="w-full h-full flex-1 min-h-[400px]"
      />
    </div>
  );
};
