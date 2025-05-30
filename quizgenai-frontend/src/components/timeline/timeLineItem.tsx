import React, { useEffect, useRef, useState } from "react";

export const TimelineItem = ({
  title,
  description,
  image,
  isReversed,
}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`timeline-content flex gap-x-[20] md:gap-x-[120] items-center mb-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } ${isReversed ? "flex-row-reverse space-x-reverse" : ""}`}
    >
      <div
        className={`flex-1 shadow-lg p-2 md:p-6 ${
          isReversed ? "text-right" : "text-left"
        }`}
      >
        <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
        <p className="text-base md:text-lg text-(--secondary)">{description}</p>
      </div>
      <div className="flex-1 flex justify-center p-2">{image}</div>
    </div>
  );
};
