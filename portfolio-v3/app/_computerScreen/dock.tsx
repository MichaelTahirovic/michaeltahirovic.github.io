"use client";

import { useControls } from "react-zoom-pan-pinch";
import { useRef, useState } from "react";

function HomeButton({ escapeMatrix }: { escapeMatrix?: () => void }) {
    const { zoomOut, zoomIn, resetTransform } = useControls();
    const [zoomedOut, setZoomedOut] = useState(false);
    const isTransitioningRef = useRef(false);

    return (
        <button
            onClick={async () => {
                if (isTransitioningRef.current) return;
                isTransitioningRef.current = true;
                const nextZoomedOut = !zoomedOut;
                setZoomedOut(nextZoomedOut);

                if (nextZoomedOut) {
                    zoomIn(0.5, 500, "easeInCubic");
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    escapeMatrix?.();
                    zoomOut(1, 550, "easeInOutQuad");
                    await new Promise((resolve) => setTimeout(resolve, 550));
                } else {
                    escapeMatrix?.();
                    resetTransform(1200, "easeInOutQuad");
                    await new Promise((resolve) => setTimeout(resolve, 1200));
                }

                isTransitioningRef.current = false;
            }}
            className="flex items-center self-center w-16 h-16 rounded-sm bg-gray-400 hover:bg-gray-600 hover:cursor-pointer"
        >
            <img src="/media/mtosLogo.svg"/>
        </button>
    );
}

export default function Dock({ onMatrixEscape }: { onMatrixEscape?: () => void }) {

    return (
        <div className="absolute flex flex-row pl-4 pr-4 pt-2 pb-2 bottom-0  z-10 w-full h-20 bg-blue-400/80">
            <div className="">
                <HomeButton escapeMatrix={onMatrixEscape} />
            </div>
        </div>
    );
}