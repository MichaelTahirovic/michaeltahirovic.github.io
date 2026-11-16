"use client";

import React from "react";

interface TabProps {
  tabName: string;
  title?: string;
  activeZ: Record<string, number>;
  openTabs: Record<string, boolean>;
  bringToFront: (id: string) => void;
  closeTab: (id: string, e?: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export default function Tab({
  tabName,
  title,
  activeZ,
  openTabs,
  bringToFront,
  closeTab,
  children,
}: TabProps) {
  return (
    <div
      style={{ zIndex: activeZ[tabName] ?? 2 }}
      onMouseDown={() => bringToFront(tabName)}
      className={`pointer-events-auto h-full flex-col bg-blue-500 shadow-2xl border border-zinc-200 overflow-hidden ${
        openTabs[tabName] ? "flex" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between bg-orange-200 border-b border-zinc-200 cursor-move">
        <button
          onClick={(e) => closeTab(tabName, e)}
          className="w-10 h-full bg-red-400 hover:bg-red-500 hover:cursor-pointer transition-colors"
        >X
        </button>
        <span className="text-sm font-medium text-zinc-600">{title}</span>
        <div className="w-10" />
      </div>
      <div className="flex-1 p-4 overflow-auto bg-orange-100 scrollbar-retro">
        {children}
      </div>
    </div>
  );
}
