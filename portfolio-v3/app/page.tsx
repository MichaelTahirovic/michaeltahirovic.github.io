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
      top: window.innerHeight * 0.37,
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
  const [zoomScale, setZoomScale] = useState(1);
  const handleEscape = () => {
    console.log("Escaping matrix, zooming out.");
    setIsZoomedOut((prev) => !prev);
  };

  return (
    <>
      <CrtSvgFilter scale={isZoomedOut ? 60 : 20} />
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={1.5}
        wheel={{ disabled: true }}
        pinch={{ disabled: true }}
        panning={{ disabled: true }}
        doubleClick={{ disabled: true }}
        onTransform={(_ref, state) =>
          setZoomScale((prev) => (Math.abs(prev - state.scale) < 0.001 ? prev : state.scale))
        }
        >  
          {/* page container (must have for zoom to work) */}
          <div className="absolute flex flex-row justify-center w-[100vw] h-[100vh] bg-blue-800">
            <div>
              {/* Desk */}
              <div className="absolute bottom-0 w-full h-[40vh]">
                <img src="media/highResWood.png" className="w-full h-full"/>
              </div>
              <TransformComponent>
                <div className={`flex flex-col justify-center h-[100vh] w-[100vw] z-[100] ${isZoomedOut ? "bg-gray-500/0" :"bg-gray-700"}`}>
                  {/* Computer screen container */}
                  <div className={`relative transition-all ease-in-out duration-300 ${isZoomedOut ? "w-[90%] aspect-[4/3] z-2 left-[5%] top-[-10%]" : "w-[100vw] h-[100vh]"}`}>
                    <div
                      style={{ filter: "url(#crt-curve)" }}
                      className={`absolute overflow-hidden transition-all ease-in-out duration-300 ${isZoomedOut ? "h-[68%] w-[66.5%] top-[8%] left-[16%]" : "w-[99%] h-[99%] left-[0.5%] rounded-[2rem]"}`}
                    >
                      <OsScreen
                        onMatrixEscape={handleEscape}
                        zoomScale={zoomScale}
                        isZoomedOut={isZoomedOut}
                      />
                    </div>
                    <img
                      src="/media/crtMonitor.png"
                      className={`pointer-events-none select-none relative w-[100%] h-[100%] ${isZoomedOut ? "opacity-100" : "opacity-0"}`}
                    />
                  </div>
                </div>
              </TransformComponent>
            </div>
          </div>
      </TransformWrapper>
    </>
  );
}
