"use client";

import { useState, useEffect } from "react";
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
    console.log("Escape matrix received in page.tsx, unlocking scroll.");
    setIsLocked(false);
  };

  return (
    // page container
    <div className="absolute flex flex-col w-[200vw] h-[200vh] bg-pink-500">
      {/* Computer screen container */}
      <div className="flex self-center m-[50vh] z-2 w-screen h-screen">
        <OsScreen onEscape={handleEscape} />
      </div>
    </div>
  );
}
