"use client";

import React, { useState } from "react";

export default function AppIcon({
  source,
  appName,
  onAction,
}: {
  source: string;
  appName: string;
  onAction?: (data?: string) => void;
}) {
  const handleClick = () => {
    //onAction?.("AppIcon clicked: " + appName);
  };
  const handleDoubleClick = () => {
    onAction?.("AppIcon double-clicked:" + appName);
    console.log("Double clicked", appName)
  };
  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className="flex flex-col w-22 h-fit m-3 pb-2 items-center hover:bg-blue-500/30 hover:cursor-pointer rounded-lg"
    >
      <img src={source} className="w-16 h-16 pointer-events-none select-none" />
      <h2 className="text-sm text-center text-black select-none">{appName}</h2>
    </button>
  );
}