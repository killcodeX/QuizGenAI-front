import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface QuizModalProps {
  showResults: boolean;
  setShowResults: (open: boolean) => void;
  setSelectedAnswers: ({}: any) => void;
  setActiveIndex: (val: number) => void;
  correctCount: number;
  wrongCount: number;
  quizes: any[];
  selectedAnswers: {
    [key: number]: string;
  };
}

export default function QuizModal({
  showResults,
  setShowResults,
  setSelectedAnswers,
  setActiveIndex,
  selectedAnswers,
  correctCount,
  wrongCount,
  quizes,
}: QuizModalProps) {
  const router = useRouter();
  const score = (correctCount / (correctCount + wrongCount)) * 100;
  const total = correctCount + wrongCount;

  // Calculate stroke dash values for SVG circle chart
  //   const radius = 70;
  //   const circumference = 2 * Math.PI * radius;
  //   const correctDash = (correctCount / total) * circumference;
  //   const wrongDash = (wrongCount / total) * circumference;

  return (
    <Dialog open={showResults} onOpenChange={setShowResults}>
      <DialogTrigger asChild>
        <button className="hidden"></button>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:w-[600px] sm:max-w-none md:w-[700px] lg:w-[800px] xl:w-[900px] p-6 text-center bg-gradient-to-br from-(--background)/40 to-(--background)/20 backdrop-blur-md border border-white/10 shadow-xl">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-xl md:text-2xl font-bold">
            Quiz Results
          </DialogTitle>
          <div className="text-2xl md:text-5xl font-bold text-white pr-4">
            {score.toFixed(0)}%
          </div>
        </DialogHeader>
        <div className="dialog-body flex flex-col gap-2 md:gap-10 w-full">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="flex justify-center items-center">
              <div className="w-32 h-32 md:w-64 md:h-64">
                <Doughnut
                  data={{
                    labels: ["Correct", "Wrong"],
                    datasets: [
                      {
                        data: [correctCount, wrongCount],
                        backgroundColor: [
                          "rgba(111, 190, 250, 0.8)",
                          "rgba(191, 147, 252, 0.8)",
                          // "rgba(159, 217, 255, 0.7)",
                          // "rgba(250, 177, 219, 0.7)",
                          // "rgba(100, 255, 218, 0.6)",
                          // "rgba(255, 130, 215, 0.6)",
                          // "rgba(255, 255, 255, 0.7)",
                          // "rgba(224, 231, 255, 0.7)",
                          // "rgba(116, 185, 255, 0.8)",
                          // "rgba(162, 155, 254, 0.8)",
                        ],
                        borderColor: [
                          "rgba(111, 190, 250, 0.2)",
                          "rgba(191, 147, 252, 0.2)",
                        ],
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false, // This removes the labels
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col w-full gap-2 text-sm">
              <div className="w-full bg-gray-800 rounded p-2">
                <div className="text-gray-400 text-xs">Total</div>
                <div className="text-white font-medium">{total} Questions</div>
              </div>
              <div className="flex flex-row gap-2 w-full">
                <div className="flex-1 bg-gray-800 rounded p-2">
                  <div className="text-gray-400 text-xs">Correct</div>
                  <div className="text-white font-medium">{correctCount}</div>
                </div>
                <div className="flex-1 bg-gray-800 rounded p-2">
                  <div className="text-gray-400 text-xs">Incorrect</div>
                  <div className="text-white font-medium">{wrongCount}</div>
                </div>
              </div>
              {/* <div className="bg-gray-800 rounded p-2">
                <div className="text-gray-400 text-xs">Time</div>
                <div className="text-white font-medium">1:45</div>
              </div> */}
            </div>
          </div>
          <div className="mb-3">
            <h2 className="text-lg font-bold text-white mb-2">
              Correct Answers
            </h2>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {quizes.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded p-3 border-l-4 border-(--primary) text-sm"
                  // className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border-l-4 border-(--primary)"
                >
                  <div className="flex justify-between mb-3 items-start">
                    <div className="flex flex-row gap-1">
                      <span className="text-gray-400 text-sm">
                        Q{index + 1}
                      </span>
                      <span className="text-left text-sm text-white/70">
                        {item.question}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded ${
                        selectedAnswers[index] === item.correct_answer
                          ? "bg-green-900 text-green-200"
                          : "bg-red-900 text-red-200"
                      }`}
                    >
                      {selectedAnswers[index] === item.correct_answer
                        ? "Correct"
                        : "Incorrect"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <div className="flex-1 bg-gray-900 p-2 rounded">
                      <div className="text-gray-400 mb-0.5">Your Answer</div>
                      <div className="text-white">
                        {item.options[selectedAnswers[index]]}
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-900 p-2 rounded">
                      <div className="text-gray-400 mb-0.5">Correct</div>
                      <div className="text-white">
                        {item.options[item.correct_answer]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={() => router.push("/quiz")}
            className="mt-4 border-1 border-(--primary) text-(--primary) px-4 py-2 rounded hover:bg-(--primary) hover:text-white cursor-pointer"
          >
            Go Home
          </button>
          <button
            onClick={() => {
              setSelectedAnswers({});
              setActiveIndex(0);
              setShowResults(false);
            }}
            className="mt-4 bg-(--primary) text-white px-4 py-2 rounded cursor-pointer"
          >
            Retry Quiz
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

{
  /* <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-8 max-w-md w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Quiz Results</h2>
        <div className="text-5xl font-bold text-white">{score.toFixed(0)}%</div>
      </div>

      
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="#2d2d3a"
              strokeWidth="30"
            />

            
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
    </div> */
}
