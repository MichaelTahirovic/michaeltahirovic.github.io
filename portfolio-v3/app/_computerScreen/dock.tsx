"use client";

import { useControls } from "react-zoom-pan-pinch";
import { useState } from "react";

function HomeButton({ escapeMatrix }: { escapeMatrix?: () => void }) {
    const { zoomIn, zoomOut } = useControls();
    const [zoomedOut, setZoomedOut] = useState(false);

    return (
        <button
            onClick={async () => {
                if (zoomedOut) {
                    zoomIn(0.5, 500, "easeInCubic");
                    await new Promise((resolve) => setTimeout(resolve, 400));       
                    escapeMatrix?.();
                } else {
                    zoomIn(0.5);
                    await new Promise((resolve) => setTimeout(resolve, 300));    
                    escapeMatrix?.();   
                    zoomOut(1, 500, "easeInOutQuad",);
                }
                setZoomedOut((prev) => !prev);
            }}
            className="flex items-center self-center w-16 h-[10vh] mt-2 hover:cursor-pointer"
        >
            <img src="/media/Windows_logo.png"/>
        </button>
    );
}

export default function Dock({ onMatrixEscape }: { onMatrixEscape?: () => void }) {

    return (
        <div className="absolute flex flex-row justify-center bottom-0  z-10 w-full h-20 bg-blue-500/50">
            < HomeButton escapeMatrix={onMatrixEscape}/>
        </div>
    );
}