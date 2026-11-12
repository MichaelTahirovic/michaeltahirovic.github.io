"use client";

import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { useState } from "react";

function HomeButton() {
    const { zoomIn, zoomOut } = useControls();
    const [zoomedOut, setZoomedOut] = useState(true);

    return (
        <button onClick={() => {zoomedOut ? zoomOut() : zoomIn(); setZoomedOut(!zoomedOut);}} className="flex items-center justify-center w-16 h-16 hover:cursor-pointer">
            <img src="/media/Windows_logo.png" className="w-12 h-12 m-2"/>
        </button>
    );
}

export default function Dock() {

    return (
        <div className="absolute flex flex-row bottom-0 w-screen h-16 bg-blue-500/50 z-10">
            < HomeButton />
        </div>
    );
}