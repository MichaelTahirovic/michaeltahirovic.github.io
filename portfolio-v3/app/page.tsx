"use client";

import { useState, useEffect, useRef, Component } from "react";
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
  const [crtScale, setCrtScale] = useState(20);
  const crtScaleRef = useRef(20);
  const didMountCrtRef = useRef(false);

  useEffect(() => {
    if (!didMountCrtRef.current) {
      didMountCrtRef.current = true;
      return;
    }

    const target = isZoomedOut ? 60 : 20;
    const start = crtScaleRef.current;
    const delay = isZoomedOut ? 0 : 400;
    const duration = 350;
    let rafId = 0;

    const timeoutId = window.setTimeout(() => {
      const startTime = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const next = start + (target - start) * eased;
        crtScaleRef.current = next;
        setCrtScale(next);
        if (t < 1) {
          rafId = window.requestAnimationFrame(step);
        }
      };
      rafId = window.requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [isZoomedOut]);

  const handleEscape = () => {
    console.log("Escaping matrix, zooming out.");
    setIsZoomedOut((prev) => !prev);
  };

  return (
    <>
      <CrtSvgFilter scale={crtScale} />
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
          <div className="absolute flex flex-row justify-center w-[100vw] h-[100vh] bg-green-500">
            <img src="media/blueWall.png" className="absolute z-0 w-full h-[60vh]"/>
            <div>
              {/* Desk */}
              <div className="absolute bottom-0 w-full h-[40vh]">
                <img src="media/highResWood.png" className="w-full h-full"/>
              </div>
              <TransformComponent>
                <div className={`flex flex-col items-center justify-center h-[100vh] w-[100vw] z-[100] transition-colors duration-300 ease-in-out ${isZoomedOut ? "delay-50 bg-gray-700/0" : "delay-600 bg-gray-700"}`}>
                  {/* Computer screen container */}
                  <div className={`relative transition-all duration-[350ms] ease-in-out ${isZoomedOut ? "delay-0 w-[min(110vw,140vh)] h-[min(87.5vw,110vh)] -translate-y-[8vh] z-2" : "delay-400 w-[100vw] h-[100vh] translate-y-0"}`}>
                    <div
                      style={{ filter: "url(#crt-curve)" }}
                      className={`absolute overflow-hidden transition-all duration-[350ms] ease-in-out ${isZoomedOut ? "delay-0 w-[67.5%] h-[68%] top-[8%] left-[15.5%] rounded-0" : "delay-400 w-[99%] h-[99%] top-[0.5%] left-[0.5%] rounded-[2rem]"}`}
                    >
                      <OsScreen
                        onMatrixEscape={handleEscape}
                        zoomScale={zoomScale}
                        isZoomedOut={isZoomedOut}
                      />
                    </div>
                    <img
                      src="/media/crtMonitor.png"
                      style={{
                        transitionProperty: "transform, opacity, scale, top",
                        transitionDuration: "300ms, 300ms, 350ms, 350ms",
                        transitionTimingFunction: "ease-in-out",
                        transitionDelay: isZoomedOut ? "0ms, 10ms, 0ms, 0ms" : "600ms, 800ms, 400ms, 400ms",
                      }}
                      className={`pointer-events-none select-none relative w-full h-full origin-[49%_42%] ${
                        isZoomedOut ? "scale-100 opacity-100 top-0" : "scale-[1.5] opacity-0 top-15"
                      }`}
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
