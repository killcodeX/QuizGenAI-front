import React from "react";
import { useRouter } from "next/navigation";
import { HasData, UserData } from "./schema";
import { BookOpen, Clock } from "lucide-react";

interface historyProps {
  hasData: boolean;
  userData: UserData | null;
}

export default function History(props: historyProps) {
  const { hasData, userData } = props;
  const router = useRouter();
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Clock size={64} className="text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Quiz History Yet</h3>
        <p className="text-gray-400 text-center max-w-md mb-6">
          Your quiz history will appear here after you complete your first quiz
        </p>
        <button
          className="bg-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          onClick={() => router.push("/quiz")}
        >
          Start a Quiz
        </button>
      </div>
    );
  }
  return (
    <>
      <h2 className="text-xl font-bold mb-6">Recent Quizzes</h2>
      {userData?.quizHistory && userData?.quizHistory.length > 0 ? (
        <div className="space-y-4">
          {userData?.quizHistory.map((item, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">
                  {item.quiz?.title || item.quiz?.topic?.name || "Quiz"}
                </h4>
                <p className="text-sm text-gray-400">
                  {new Date(item.completedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={
                    item.score >= 0.8
                      ? "text-green-400"
                      : item.score >= 0.5
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                >
                  {Math.round(item.score * 100)}%
                </span>
                <div
                  className="bg-gray-600 p-1.5 rounded-full cursor-pointer hover:bg-gray-500"
                  onClick={() => router.push(`/quiz/results/${item.id}`)}
                >
                  <BookOpen size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-6 text-center">
          <p>
            No quiz history found. Start taking quizzes to build your history!
          </p>
          <button
            className="bg-indigo-600 px-4 py-2 rounded-lg font-semibold mt-4 hover:bg-indigo-700 transition-colors"
            onClick={() => router.push("/quiz")}
          >
            Take a Quiz
          </button>
        </div>
      )}
    </>
  );
}
