"use client";

import React from "react";

interface DataPoint {
  label: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  title?: string;
  color?: string;
}

export default function TrafficChart({ data, title = "Traffic Trend (Last 7 Days)", color = "#6366f1" }: Props) {
  // Render placeholder if no data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-64 flex items-center justify-center text-gray-400">
        No traffic data available.
      </div>
    );
  }

  // Dimensions
  const width = 600;
  const height = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Max value calculation for scaling
  const maxVal = Math.max(...data.map((d) => d.value), 5);
  const yTicks = 4;

  // Calculate coordinates
  const points = data.map((d, idx) => {
    const x = paddingLeft + (idx / (data.length - 1 || 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.value / maxVal) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  // Construct SVG Path Strings
  const linePath = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
    : "";

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 hover:shadow-md transition duration-200">
      <div className="flex justify-between items-center border-b pb-2">
        <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
          📈 {title}
        </h4>
        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
          Realtime
        </span>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px]">
          <defs>
            {/* Smooth area gradient */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {Array.from({ length: yTicks }).map((_, idx) => {
            const y = paddingTop + (idx / (yTicks - 1)) * chartHeight;
            const value = Math.round(maxVal - (idx / (yTicks - 1)) * maxVal);
            return (
              <g key={idx} className="opacity-40">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          {areaPath && (
            <path
              d={areaPath}
              fill="url(#areaGradient)"
              className="animate-in fade-in duration-500"
            />
          )}

          {/* Line Stroke */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Nodes & X Axis Labels */}
          {points.map((p, idx) => (
            <g key={idx} className="group">
              {/* Interaction Node dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#ffffff"
                stroke={color}
                strokeWidth="2.5"
                className="transition-all duration-150 cursor-pointer hover:r-6"
              />
              
              {/* Value Label above dot on hover */}
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                <rect
                  x={p.x - 20}
                  y={p.y - 25}
                  width="40"
                  height="18"
                  rx="4"
                  fill="#1e293b"
                  shadow-sm="true"
                />
                <text
                  x={p.x}
                  y={p.y - 13}
                  fill="#ffffff"
                  fontSize="8"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {p.value}
                </text>
              </g>

              {/* Bottom Date Label */}
              <text
                x={p.x}
                y={height - 8}
                fill="#64748b"
                fontSize="9"
                fontWeight="medium"
                textAnchor="middle"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
