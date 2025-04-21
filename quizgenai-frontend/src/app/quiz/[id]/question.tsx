import React from "react";

interface Quiz {
  id: number;
  question: string;
  questionId: string;
  correct_answer: string;
  options: string[];
}

interface questionProps {
  item: Quiz;
  index: number;
  activeIndex: number;
  selectedAnswers: {
    [key: string]: string;
  };
  handleAnswerSelect: (questionId: string, index: string) => void;
}

export default function Question({
  item,
  index,
  activeIndex,
  selectedAnswers,
  handleAnswerSelect,
}: questionProps) {
  return (
    <div
      className={`quiz-steps absolute top-0 left-0 w-full h-full flex justify-center items-center transition-opacity duration-500 ${
        index === activeIndex ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h3 className="text-xl font-bold mb-4">Question {index + 1}</h3>
        <p className="mb-6">{item.question}</p>
        <div className="space-y-3">
          {item.options.map((answer: string, optIndex: number) => {
            let selectedIndex: number = Number(
              selectedAnswers[item.questionId]
            );
            return (
              <div
                key={optIndex}
                className={`border-1 border-(--primary) rounded-(--borderRadius) p-2 cursor-pointer transition-all hover:bg-(--primary) ${
                  item.options[selectedIndex] === answer ? "bg-(--primary)" : ""
                }`}
                onClick={() =>
                  handleAnswerSelect(item.questionId, optIndex + "")
                }
              >
                {answer}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
