"use client";
import React, { useEffect, useRef, useState } from "react";
import { timelineData } from "./timelineData";
import { TimelineItem } from "./timeLineItem";

export const Timeline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current && progressLineRef.current) {
        const timelineElement = timelineRef.current;
        const progressLine = progressLineRef.current;

        const timelineHeight = timelineElement.scrollHeight;
        const scrolled = window.scrollY - timelineElement.offsetTop;

        // Calculate a progress percentage, stopping before the bottom
        let progress = (scrolled / timelineHeight) * 90; // Stop at 90%
        progress = Math.max(0, Math.min(progress, 100)); // Cap progress at 90%

        setScrollProgress(progress);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={timelineRef} className="timeline relative max-w-5xl mx-auto px-2">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-(--primary)/0 transform -translate-x-1/2">
        <span
          ref={progressLineRef}
          style={{ height: `${scrollProgress}%` }}
          className="block bg-(--primary) w-[1] bg-glow transition-all duration-500 ease-out"
        />
      </div>
      {timelineData.map((item, index) => (
        <TimelineItem
          key={index}
          title={item.title}
          description={item.description}
          image={item.image}
          isReversed={index % 2 !== 0}
        />
      ))}
    </div>
  );
};
