import React from "react";
import { useRouter } from "next/navigation";
import { HasData, UserData } from "./schema";
import { Award, ArrowRight } from "lucide-react";

interface overviewProps {
  hasData: boolean;
  userData: UserData | null;
}

// Calculate accuracy rate
const getAccuracyRate = (hasData: HasData, userData: UserData) => {
  if (!hasData || !userData?.performance) return 0;
  const correct = userData?.performance.correctAnswers || 0;
  const total = userData?.performance.totalQuestions || 0;
  return total > 0 ? Math.round((correct / total) * 100) : 0;
};

export default function Overview(props: overviewProps) {
  const { hasData, userData } = props;
  const router = useRouter();
  if (hasData) {
    return (
      <>
        <h2 className="text-xl font-bold mb-6">Welcome to QuizGenAI!</h2>

        <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-lg mb-2">Getting Started</h3>
          <p className="text-gray-200 mb-4">
            Your quiz journey begins here. Take your first quiz to start
            tracking your progress and unlocking personalized recommendations.
          </p>
          <div
            className="flex items-center gap-2 text-indigo-300 cursor-pointer hover:text-white transition-colors"
            onClick={() => router.push("/quiz")}
          >
            <span>Take your first quiz</span>
            <ArrowRight size={16} />
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6 mb-4">Popular Quiz Topics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => router.push("/quiz?topic=JavaScript")}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">JavaScript Fundamentals</h4>
              <Award className="text-yellow-400" size={20} />
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Master the basics of JavaScript programming
            </p>
          </div>
          <div
            className="bg-gradient-to-r from-blue-900 to-cyan-900 rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => router.push("/quiz?topic=Marvel")}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Marvel Universe</h4>
              <Award className="text-yellow-400" size={20} />
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Test your knowledge of Marvel films and characters
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <h2 className="text-xl font-bold mb-6">Your Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Accuracy Rate</h3>
            <span className="text-green-400 font-semibold">
              {getAccuracyRate(hasData, userData)}%
            </span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${getAccuracyRate(hasData, userData)}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-gray-700 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Completion Rate</h3>
            <span className="text-blue-400 font-semibold">
              {userData?.performance?.completionRate || 0}%
            </span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{
                width: `${userData?.performance?.completionRate || 0}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold mt-8 mb-4">Recommended Quizzes</h3>
      {userData?.recommendedQuizzes &&
      userData?.recommendedQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userData?.recommendedQuizzes.slice(0, 2).map((quiz, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${
                index % 2 === 0
                  ? "from-indigo-900 to-blue-900"
                  : "from-purple-900 to-pink-900"
              } rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity`}
              onClick={() => router.push(`/quiz/${quiz.id}`)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">
                  {quiz.title || quiz.topic.name}
                </h4>
                <Award className="text-yellow-400" size={20} />
              </div>
              <p className="text-sm text-gray-300 mt-2">
                {quiz.description ||
                  `Test your knowledge of ${quiz.topic.name}`}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-5 text-center">
          <p>
            No recommended quizzes yet. Try more topics to get personalized
            recommendations!
          </p>
        </div>
      )}
    </>
  );
}
