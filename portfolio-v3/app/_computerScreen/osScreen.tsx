"use client";

import { useState, useEffect } from "react";
import Tab from "./components/tab";
import Dock from "./dock";
import AppIcon from "./components/appIcon";
import ReactGridLayout, { getCompactor, useContainerWidth } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Carousel } from "@/app/_computerScreen/components/carousel-base";

// 1. Icon Grid Compactor: strict layout, no overlap, snaps back on collision
const iconCompactor = getCompactor(null, false, true);

// 2. Tab Grid Compactor: fluid, allows free overlap, tabs don't push each other
const tabCompactor = getCompactor(null, true, false);

export default function OsScreen({
  onMatrixEscape,
}: {
  onMatrixEscape?: () => void;
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

  // Limit height of container such that icons can't go behind dock
  const [ containerHeight, setContainerHeight ] = useState(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () =>
      setContainerHeight(el.clientHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);
  const iconMaxRows = containerHeight > 0 ? Math.max(1, Math.floor((containerHeight - 10) / 110)) : 6;


  // Layer 2: Open tabs layout
  const tabsInitLayout = [
    { i: "tab-1", x: 18, y: 2, w: 30, h: 16, minW: 12, minH: 8, isBounded: true },
    { i: "tab-2", x: 19, y: 3, w: 30, h: 16, minW: 12, minH: 8, isBounded: true },
    { i: "tab-3", x: 20, y: 4, w: 30, h: 16, minW: 12, minH: 8, isBounded: true },
  ];

  // Track visibility of each tab window
  const [openTabs, setOpenTabs] = useState<Record<string, boolean>>({
    'tab-1': false,
    'tab-2': false,
    'tab-3': false,
  });

  // Track z-index so the most recently clicked/opened tab jumps to the front
  const [activeZ, setActiveZ] = useState<Record<string, number>>({
    'tab-1': 2,
    'tab-2': 3,
    'tab-3': 4,
  });

  // Bring tab to front of all other tabs when clicked on
  const [topZ, setTopZ] = useState(5);
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
    <div className="relative flex flex-col flex-1 w-full h-full bg-green-100 overflow-hidden select-none">
      <div ref={containerRef} className="relative w-full mb-20 flex-1">
        {mounted && (
          <>
            {/* ================= LAYER 1: APP ICONS GRID ================= */}
            <div className="absolute inset-0 z-0">
              <ReactGridLayout
                layout={appInitLayout}
                width={width}
                compactor={iconCompactor}
                gridConfig={{ cols: iconCols, rowHeight: 100, maxRows: iconMaxRows }}
              >
                <div key="a">
                  <AppIcon
                    onAction={() => openAppFromIcon("tab-1")}
                    source="/media/folderIcon.png"
                    appName="About Me"
                  />
                </div>
                <div key="b">
                  <AppIcon
                    onAction={() => openAppFromIcon("tab-2")}
                    source="/media/folderIcon.png"
                    appName="Projects"
                  />
                </div>
                <div key="c">
                  <AppIcon
                    onAction={() => {openAppFromIcon("tab-3")}}
                    source="/media/folderIcon.png"
                    appName="Employment"
                  />
                </div> {/* "code=good" -Wyatt White */}
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
                  style={{ zIndex: activeZ["tab-1"] ?? 2 }}
                  onMouseDown={() => bringToFront("tab-1")}
                  className={openTabs["tab-1"] ? "pointer-events-auto" : "pointer-events-none"}
                >
                  <Tab
                    tabName="tab-1"
                    title="About Me"
                    activeZ={activeZ}
                    openTabs={openTabs}
                    bringToFront={bringToFront}
                    closeTab={closeTab}
                    >
                    <AboutMePage/>
                  </Tab>
                </div>

                {/* Tab 2 */}
                <div
                  key="tab-2"
                  style={{ zIndex: activeZ["tab-2"] ?? 2 }}
                  onMouseDown={() => bringToFront("tab-2")}
                  className={openTabs["tab-2"] ? "pointer-events-auto" : "pointer-events-none"}
                >
                  <Tab
                    tabName="tab-2"
                    title="Projects"
                    activeZ={activeZ}
                    openTabs={openTabs}
                    bringToFront={bringToFront}
                    closeTab={closeTab}
                    >
                      {/* Put folder content here */}
                      <ProjectsPage />
                    </Tab>
                </div>

                {/* Tab 3 */}
                  <div
                  key="tab-3"
                  style={{ zIndex: activeZ["tab-3"] ?? 2 }}
                  onMouseDown={() => bringToFront("tab-3")}
                  className={openTabs["tab-3"] ? "pointer-events-auto" : "pointer-events-none"}
                >
                  <Tab
                    tabName="tab-3"
                    title="Employment"
                    activeZ={activeZ}
                    openTabs={openTabs}
                    bringToFront={bringToFront}
                    closeTab={closeTab}
                    >
                      {/* Put folder content here */}
                    </Tab>
                </div>
              </ReactGridLayout>
            </div>
          </>
        )}
      </div>
      <Dock onMatrixEscape={onMatrixEscape} />
    </div>
  );
}

// ================== TAB CONTENTS =====================
// (Move to separate files later)

// About Me Page
function AboutMePage(){
  return (
    <div className="flex flex-row">
      <img
          src="/media/mike.jpeg"
          alt="Mike"
          className="max-h-full w-[50%] self-start rounded-lg shadow-sm object-contain"
        />
      <div className="flex flex-col p-4">
        <h1 className="text-3xl text-black font-bold ">Wait... it's HIM</h1>
        <h2 className="text-base text-black italic">That's right, it's Michael T.</h2>
        <p className="text-sm text-black">Yup, you heard it here first folks. This is the website
          of Michael Tahirovic. Sturdy Mike. Mikey T. The Man. You'll find
          a bunch of cool things here that he's done, and a bunch more
          that he's gonna do, plus the stuff that he does in the future but 
          when it's done it won't be the future and it will be on here instead.
          I hope you enjoy.
        </p>
      </div>
    </div>
  );
}

// About Me Page
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";

export const CarouselMd = () => {
    return (
        <Carousel.Root className="relative aspect-[1.6]">
            <Carousel.PrevTrigger className="absolute top-1/2 left-0 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center bg-gray-400 p-2 text-fg-secondary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <HiChevronDoubleLeft />
            </Carousel.PrevTrigger>
            <Carousel.NextTrigger className="absolute top-1/2 right-0 z-10 flex w-6 h-9 -translate-y-1/2 cursor-pointer items-center justify-center bg-gray-400 p-2 text-fg-secondary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <HiChevronDoubleRight />
            </Carousel.NextTrigger>
 
            <Carousel.Content className="gap-2">
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img alt="Image by Unsplash" src="https://www.untitledui.com/application/plants.webp" className="size-full object-cover" />
                </Carousel.Item>
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img
                        alt="Image by Unsplash"
                        src="https://images.unsplash.com/photo-1484506097116-1bcba4fa7568?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="size-full object-cover"
                    />
                </Carousel.Item>
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img
                        alt="Image by Unsplash"
                        src="https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="size-full object-cover"
                    />
                </Carousel.Item>
            </Carousel.Content>
        </Carousel.Root>
    );
};

function ProjectsPage(){
  return (
    <div className="flex flex-row">
      <div className="flex flex-col p-4">
        <h1 className="text-3xl text-black font-bold ">PROJECTS by mike</h1>
        <div className="max-w-150">
          <CarouselMd />
        </div>
      </div>
    </div>
  );
}