"use client";

export default function AppIcon({ source, appName }: { source: string; appName: string }) {
    const handleClick = () => {
    console.log("Button clicked!");
    };
    return (
        <button onClick={handleClick} className="flex flex-col w-22 h-fit m-3 pb-2 items-center hover:bg-blue-500/30 hover:cursor-pointer rounded-lg">
            <img src={source} className="w-16 h-16"/>
            <h2 className="text-sm text-center text-black">{appName}</h2>
        </button>
    );
}