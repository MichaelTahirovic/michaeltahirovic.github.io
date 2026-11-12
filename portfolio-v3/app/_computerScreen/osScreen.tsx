"use client";

import { useState } from "react";
import Folder from "./folder";
import Dock from "./dock";
import AppIcon from "./components/appIcon";
import ReactGridLayout, { getCompactor, useContainerWidth } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// 1. Icon Grid Compactor: strict layout, no overlap, snaps back on collision
const iconCompactor = getCompactor(null, false, true);

// 2. Tab Grid Compactor: fluid, allows free overlap, tabs don't push each other
const tabCompactor = getCompactor(null, true, false);

export default function OsScreen({
  onEscape,
}: {
  onEscape?: () => void;
}) {
  const { width, containerRef, mounted } = useContainerWidth();

  // Desktop icon grid sizing (~100px cells)
  const ICON_CELL_WIDTH = 100;
  const iconCols = Math.max(1, Math.floor(width / ICON_CELL_WIDTH));

  // Fluid window/tab grid sizing (~20px small step for smooth, free placement)
  const FLUID_STEP = 20;
  const fluidCols = Math.max(1, Math.floor(width / FLUID_STEP));

  // Layer 1: App icon layout
  const appInitLayout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1, isResizable: false, isBounded: true },
    { i: "b", x: 0, y: 1, w: 1, h: 1, isResizable: false, isBounded: true },
    { i: "c", x: 0, y: 2, w: 1, h: 1, isResizable: false, isBounded: true },
  ];

  // Layer 2: Open tabs layout
  const tabsInitLayout = [
    { i: "tab-1", x: 2, y: 0, w: 22, h: 16, minW: 12, minH: 8, isBounded: true },
    { i: "tab-2", x: 3, y: 0, w: 22, h: 16, minW: 12, minH: 8, isBounded: true },
    { i: "tab-3", x: 4, y: 0, w: 22, h: 16, minW: 12, minH: 8, isBounded: true },
  ];

  // Track visibility of each tab window
  const [openTabs, setOpenTabs] = useState<Record<string, boolean>>({
    'tab-1': false,
    'tab-2': false,
    'tab-3': false,
  });

  // Track z-index so the most recently clicked/opened tab jumps to the front
  const [activeZ, setActiveZ] = useState<Record<string, number>>({
    'tab-1': 10,
    'tab-2': 11,
    'tab-3': 12,
  });
  const [topZ, setTopZ] = useState(13);

  const bringToFront = (id: string) => {
    setTopZ((prev) => {
      const next = prev + 1;
      setActiveZ((current) => ({ ...current, [id]: next }));
      return next;
    });
  };

  // Open the tab when the corresponding icon is clicked
  const openAppFromIcon = (tabId: string) => {
    setOpenTabs((prev) => ({ ...prev, [tabId]: true }));
    bringToFront(tabId);
  };

  // Close the tab window
  const closeTab = (tabId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOpenTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  return (
    <div className="relative flex flex-col flex-1 w-100% h-100% bg-green-100 overflow-hidden select-none">
      <div ref={containerRef} className="relative w-full h-full flex-1">
        {mounted && (
          <>
            {/* ================= LAYER 1: APP ICONS GRID ================= */}
            <div className="absolute inset-0 z-0">
              <ReactGridLayout
                layout={appInitLayout}
                width={width}
                compactor={iconCompactor}
                gridConfig={{ cols: iconCols, rowHeight: 100 }}
              >
                <div key="a">
                  <AppIcon
                    onAction={() => openAppFromIcon("tab-1")}
                    source="/media/folderIcon.png"
                    appName="Test App"
                  />
                </div>
                <div key="b">
                  <AppIcon
                    onAction={() => openAppFromIcon("tab-2")}
                    source="/media/folderIcon.png"
                    appName="Another App"
                  />
                </div>
                <div key="c">
                  <AppIcon
                    onAction={() => {openAppFromIcon("tab-3")}}
                    source="/media/folderIcon.png"
                    appName="Yet Another App"
                  />
                </div>
              </ReactGridLayout>
            </div>

            {/* ================= LAYER 2: OPEN TABS / WINDOWS GRID ================= */}
            {/* pointer-events-none lets clicks on empty space pass through to the icons below */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <ReactGridLayout
                layout={tabsInitLayout}
                width={width}
                compactor={tabCompactor}
                gridConfig={{ cols: fluidCols, rowHeight: FLUID_STEP }}
                onDragStart={(_layout, _oldItem, newItem) => {
                  if (newItem) bringToFront(newItem.i);
                }}
              >
                {/* Tab 1 */}
                  <div
                    key="tab-1"
                    style={{ zIndex: activeZ["tab-1"] ?? 10 }}
                    onMouseDown={() => bringToFront("tab-1")}
                    className={`pointer-events-auto flex-col bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden ${
                      openTabs['tab-1'] ? 'flex' : 'hidden'
                    }`}                  >
                    <div className="flex items-center justify-between px-3 py-2 bg-zinc-100 border-b border-zinc-200 cursor-move">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => closeTab("tab-1", e)}
                          className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
                          title="Close"
                        />
                        <span className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-xs font-medium text-zinc-600">Test App — Projects</span>
                      <div className="w-10" />
                    </div>
                    <div className="flex-1 p-4 overflow-auto bg-white">
                      <Folder />
                    </div>
                  </div>

                {/* Tab 2 */}
                  <div
                    key="tab-2"
                    style={{ zIndex: activeZ["tab-2"] ?? 10 }}
                    onMouseDown={() => bringToFront("tab-2")}
                  className={`pointer-events-auto flex-col bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden ${
                      openTabs['tab-2'] ? 'flex' : 'hidden'
                    }`}
                    >
                    <div className="flex items-center justify-between px-3 py-2 bg-zinc-100 border-b border-zinc-200 cursor-move">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => closeTab("tab-2", e)}
                          className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
                          title="Close"
                        />
                        <span className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-xs font-medium text-zinc-600">Another App — About Me</span>
                      <div className="w-10" />
                    </div>
                    <div className="flex-1 p-4 overflow-auto bg-zinc-50 flex items-center justify-center">
                      <img
                        src="/media/mike.jpeg"
                        alt="Mike"
                        className="max-h-full rounded-lg shadow-sm object-contain"
                      />
                    </div>
                  </div>

                {/* Tab 3 */}
                  <div
                    key="tab-3"
                    style={{ zIndex: activeZ["tab-3"] ?? 10 }}
                    onMouseDown={() => bringToFront("tab-3")}
                    className={`pointer-events-auto flex-col bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden ${
                      openTabs['tab-3'] ? 'flex' : 'hidden'
                    }`}
                  >
                    <div className="flex items-center justify-between px-3 py-2 bg-zinc-100 border-b border-zinc-200 cursor-move">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => closeTab("tab-3", e)}
                          className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
                          title="Close"
                        />
                        <span className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-xs font-medium text-zinc-600">Yet Another App</span>
                      <div className="w-10" />
                    </div>
                    <div className="flex-1 p-4 overflow-auto bg-white flex items-center justify-center text-zinc-400 text-sm">
                      Empty Window
                    </div>
                  </div>
              </ReactGridLayout>
            </div>
          </>
        )}
      </div>
      <Dock />
    </div>
  );
}
