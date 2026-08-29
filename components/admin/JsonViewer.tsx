"use client";

import React, { useState } from "react";

interface Props {
  data: any;
  title?: string;
}

export default function JsonViewer({ data, title = "Telemetry Data Logs" }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-1 ml-auto outline-none"
      >
        <span className="text-[10px]">▶</span> View JSON
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]">
          {/* Modal Overlay Background Click */}
          <div 
            className="absolute inset-0" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="relative bg-gray-900 text-gray-100 rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl border border-gray-800 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950 rounded-t-xl">
              <h3 className="font-bold text-sm text-gray-300 flex items-center gap-2">
                📊 {title}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-xs px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-6 overflow-auto text-xs font-mono text-left select-text leading-relaxed">
              <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
