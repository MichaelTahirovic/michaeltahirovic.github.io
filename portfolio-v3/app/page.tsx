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

// Generates a radial barrel-distortion displacement map for the SVG CRT filter
function CrtSvgFilter({ scale = 40 }: { scale?: number }) {
  const [mapUrl, setMapUrl] = useState<string>("");

  useEffect(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = ctx.createImageData(size, size);
    const data = img.data;

    for (let y = 0; y < size; y++) {
      const ny = (y / (size - 1)) * 2 - 1; // -1 to 1
      for (let x = 0; x < size; x++) {
        const nx = (x / (size - 1)) * 2 - 1; // -1 to 1
        const r2 = nx * nx + ny * ny;

        // Barrel curve: pull corners inward, bulge center outward
        const dx = (nx * r2) / 2;
        const dy = (ny * r2) / 2;

        const idx = (y * size + x) * 4;
        data[idx] = Math.round(128 + 127 * dx);     // R -> X displacement
        data[idx + 1] = Math.round(128 + 127 * dy); // G -> Y displacement
        data[idx + 2] = 128;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(img, 0, 0);
    setMapUrl(canvas.toDataURL("image/png"));
  }, []);

  if (!mapUrl) return null;

  return (
    <svg className="pointer-events-none fixed h-0 w-0 overflow-hidden" aria-hidden="true">
      <defs>
        <filter
          id="crt-curve"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={mapUrl}
            result="crtMap"
            preserveAspectRatio="none"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="crtMap"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

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
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const handleEscape = () => {
    console.log("Escaping matrix, zooming out.");
    setIsZoomedOut((prev) => !prev);
  };

  return (
    <>
      <CrtSvgFilter scale={isZoomedOut ? 150 : 40} />
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={1.5}
        wheel={{ disabled: true }}
        pinch={{ disabled: true }}
        panning={{ disabled: true }}
        doubleClick={{ disabled: true }}
        >  
          {/* page container (must have for zoom to work) */}
          <div className="absolute flex flex-row w-[200vw] h-[200vh] bg-pink-500">
            <div>
              <TransformComponent>
                <div className="relative flex flex-col justify-content w-[50vw] h-[175vh] bg-blue-500/50 z-0"/>
                <div className="flex flex-col justify-content h-[175vh] w-[100vw] bg-gray-500/50 z-0">
                  {/* Computer screen container */}
                  <img src="/media/crtMonitor.png" className={`absolute self-center mt-[18vh] transition-all ease-in-out duration-300 ${isZoomedOut ? "w-645 z-2" : "w-980 h-500 mt-[36vh]"} `}></img>
                  <div
                    style={{ filter: "url(#crt-curve)" }}
                    className={`flex self-center self-justify h-[100vh] overflow-hidden rounded-[2rem] transition-all ease-in-out duration-300 ${isZoomedOut ? "w-[68vw] mt-[30vh] mr-10" : "w-[100vw] mt-[50vh] z-1"}`}
                  >
                    <OsScreen onMatrixEscape={handleEscape}/>
                  </div>
                </div>
                <div className="relative w-[50vw] h-[175vh] bg-yellow-500/50 z-0" />
              </TransformComponent>
            </div>
          </div>
      </TransformWrapper>
    </>
  );
}
