import React from "react";

interface Quiz {
  id: number;
  question: string;
  questionId: string;
  correct_answer: string;
  options: string[];
}

interface ScrollIndicatorProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  quizes: Quiz[];
}

export default function ScrollIndicator(props: ScrollIndicatorProps) {
  const { quizes, activeIndex, setActiveIndex } = props;
  return (
    <div className="quiz-scroll-counter flex flex-col gap-3 fixed top-100 left-1/2 z-1 md:top-1/2 md:right-10 md:left-auto -rotate-90 md:rotate-0 transform md:-translate-y-1/2 ">
      {quizes.map((_: any, index: number) => (
        <button
          key={index}
          className={`counter-steps w-[5px] h-[50px] cursor-pointer ${
            index === activeIndex ? "bg-(--primary)" : "bg-gray-300"
          }`}
          onClick={() => setActiveIndex(index)} //setActiveIndex(index)
        ></button>
      ))}
    </div>
  );
}
