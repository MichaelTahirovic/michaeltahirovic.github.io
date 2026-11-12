"use client";

import { useState, useEffect, Component } from "react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import OsScreen from "./_computerScreen/osScreen";

// Set page to load with just os screen
function DefaultLoadPosition() {
  useEffect(() => {
    // Scroll to os center on mount
    window.scrollTo({
      left: window.innerWidth * 0.5,
      top: window.innerHeight * 0.5,
      behavior: "instant",
    });
  }, []);
}

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools z-3">
      <button type="button" onClick={() => zoomIn()}>
        (+)
      </button>
      <button type="button" onClick={() => zoomOut()}>
        (-)
      </button>
      <button type="button" onClick={() => resetTransform()}>
        (x)
      </button>
    </div>
  );
};

export default function Home() {
  DefaultLoadPosition();

  const [isLocked, setIsLocked] = useState(true);

  // Safely lock/unlock body scroll according to isLocked
  useEffect(() => {
    if (isLocked) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isLocked]);

  // Handler for escaping matrix
  const handleEscape = () => {
    console.log("Escape matrix received in page.tsx, zooming out.");
    setIsLocked(false);
  };


  return (
    <>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={1}
        centerOnInit={true}
        centerZoomedOut={true}
        wheel={{ disabled: true }}
        pinch={{ disabled: true }}
        panning={{ disabled: isLocked }}
        doubleClick={{ disabled: true }}
        >  
          {/* page container (must have for zoom to work) */}
          <div className="absolute flex flex-row w-[200vw] h-[200vh] bg-pink-500">
            <TransformComponent>
            <div className="relative 0 w-[50vw] h-[200vh] bg-blue-500/50 z-0" />
            <div className="flex flex-col h-[200vh] w-[100vw]">
              <div className="relative w-[100vw] h-[50vh] bg-green-500/50 z-0" />
              {/* Computer screen container */}
              <div className="flex self-center z-2 w-[100vw] h-[100vh]">
                <OsScreen />
              </div>
              <div className="relative bottom-0 w-[100vw] h-[50vh] bg-red-500/50 z-0" />
            </div>
            <div className="relative w-[50vw] h-[200vh] bg-yellow-500/50 z-0" />
            </TransformComponent>
          </div>
      </TransformWrapper>
    </>
  );
}
