import React from "react";

interface QuizModalProps {
  correctCount: number;
  wrongCount: number;
  quizes: any[];
}

export default function QuizModal({
  correctCount,
  wrongCount,
  quizes,
}: QuizModalProps) {
  const score = (correctCount / (correctCount + wrongCount)) * 100;
  const total = correctCount + wrongCount;

  // Calculate stroke dash values for SVG circle chart
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const correctDash = (correctCount / total) * circumference;
  const wrongDash = (wrongCount / total) * circumference;

  return (
    <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-8 max-w-md w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Quiz Results</h2>
        <div className="text-5xl font-bold text-white">{score.toFixed(0)}%</div>
      </div>

      {/* Custom SVG pie chart */}
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="#2d2d3a"
              strokeWidth="30"
            />

            {/* Wrong answers */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="rgba(191, 147, 252, 0.8)"
              strokeWidth="30"
              strokeDasharray={`${wrongDash} ${circumference - wrongDash}`}
              strokeDashoffset="0"
            />

            {/* Correct answers */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="rgba(111, 190, 250, 0.8)"
              strokeWidth="30"
              strokeDasharray={`${correctDash} ${circumference - correctDash}`}
              strokeDashoffset={-wrongDash}
            />
          </svg>

          {/* Legend */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
              <span className="text-white/80">Correct</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-400 mr-1"></div>
              <span className="text-white/80">Wrong</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center text-white">
          Correct Answers
        </h3>

        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {quizes.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border-l-4 border-purple-500"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Q{index + 1}</span>
              </div>
              <p className="text-sm mt-1 text-white/70">{item.question}</p>
              <p className="mt-2 text-white font-medium">
                {item.correct_answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button className="px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all shadow-lg">
          Retry Quiz
        </button>
      </div>
    </div>
  );
}
