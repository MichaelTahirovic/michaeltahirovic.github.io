"use client";

export default function Dock(
    { onAction }: {    
    onAction?: (data?: string) => void
    }) {
    
    function EscapeMatrix() {
        console.log("Escape Matrix");
        onAction?.("Escape Matrix");
    }

    return (
        <div className="absolute flex flex-row bottom-0 w-screen h-16 bg-blue-500/50 z-10">
            <button onClick={EscapeMatrix} className="flex items-center justify-center w-16 h-16 hover:cursor-pointer">
                <img src="/media/Windows_logo.png" className="w-12 h-12 m-2"/>
            </button>
        </div>
    );
}