"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickSeries,
  HistogramSeries,
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
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

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
        timeScale: {
          borderColor: "#2B2B43",
          timeVisible: true,
        },
        rightPriceScale: {
          borderColor: "#2B2B43",
        },
      });

      // --- 1. TẠO VOLUME SERIES TRƯỚC (Để khởi tạo trục 'volume') ---
      const volumeSeries = chart.addSeries(HistogramSeries, {
        color: "#26a69a",
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "volume", // Định nghĩa ID cho trục này
      });

      // --- 2. CẤU HÌNH TRỤC 'VOLUME' (Sau khi đã có series) ---
      chart.priceScale("volume").applyOptions({
        scaleMargins: {
          top: 0.8, // Volume bị đẩy xuống, chỉ chiếm 20% chiều cao dưới cùng
          bottom: 0,
        },
      });

      // --- 3. TẠO CANDLESTICK SERIES (Nằm lớp trên) ---
      const series = chart.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      chartRef.current = chart;
      seriesRef.current = series;
      volumeSeriesRef.current = volumeSeries;

      // --- 4. NẠP DỮ LIỆU BAN ĐẦU ---
      if (candles?.length) {
        series.setData(candles as any);

        const volumeData = candles.map((item: any) => ({
          time: item.time,
          value: item.volume || Math.random() * 100, // Fallback nếu thiếu volume
          color:
            item.close >= item.open
              ? "rgba(38, 166, 154, 0.3)" // Xanh mờ
              : "rgba(239, 83, 80, 0.3)", // Đỏ mờ
        }));
        volumeSeries.setData(volumeData as any);

        chart.timeScale().fitContent();
      }

      // --- 5. XỬ LÝ CLICK (TRENDLINE MOCK) ---
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

      // Init chart nếu chưa có
      if (width > 0 && !chart) {
        initChart(width, h);
      }

      // Resize chart nếu đã có
      if (chart && width > 0) {
        chart.applyOptions({ width, height: h });
      }

      // Cleanup nếu container bị ẩn
      if (width === 0 && chart) {
        chart.remove();
        chart = null;
        chartRef.current = null;
        seriesRef.current = null;
        volumeSeriesRef.current = null;
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      chart?.remove();
      chartRef.current = null;
      seriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, [candles]); // Re-init nếu data nến thay đổi hoàn toàn (ví dụ đổi symbol)

  // --- EFFECT: CẬP NHẬT DATA KHI API TRẢ VỀ ---
  useEffect(() => {
    if (seriesRef.current && volumeSeriesRef.current && candles?.length) {
      // Update Nến
      seriesRef.current.setData(candles as any);

      // Update Volume
      const volumeData = candles.map((item: any) => ({
        time: item.time,
        value: item.volume || Math.random() * 100,
        color:
          item.close >= item.open
            ? "rgba(38, 166, 154, 0.3)"
            : "rgba(239, 83, 80, 0.3)",
      }));
      volumeSeriesRef.current.setData(volumeData as any);

      chartRef.current?.timeScale().fitContent();
    }
  }, [candles]);

  // --- EFFECT: ĐỔI CON TRỎ THEO TOOL ---
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
      {/* Symbol Label */}
      <div className="absolute top-2 left-2 z-20 text-white font-bold bg-black/50 px-2 rounded pointer-events-none select-none">
        {symbol} - D1
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#131722] bg-opacity-80">
          <div className="text-white animate-pulse">Loading Chart Data...</div>
        </div>
      )}

      {/* Chart Container */}
      <div
        ref={chartContainerRef}
        className="w-full h-full flex-1 min-h-[400px]"
      />
    </div>
  );
};
