//# Stats/History Page (Protected)
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { BookOpen, Award, CheckCircle, XCircle, Clock } from "lucide-react";

const userData = {
  name: "Aaquib Ahmad",
  topics: 4,
  attempted: 100,
  correct: 70,
  wrong: 30,
  favorites: ["JavaScript", "Marvel"],
  topicData: [
    { name: "JavaScript", value: 25, color: "#8B5D33" },
    { name: "JavaScript II", value: 35, color: "#65C18C" },
    { name: "Marvel", value: 20, color: "#3DA5D9" },
    { name: "Games", value: 20, color: "#AAB464" },
  ],
  history: [
    { topic: "JavaScript", date: "Apr 1, 2025", score: "8/10" },
    { topic: "JavaScript II", date: "Mar 28, 2025", score: "9/10" },
    { topic: "Marvel", date: "Mar 25, 2025", score: "7/10" },
    { topic: "Games", date: "Mar 22, 2025", score: "6/10" },
  ],
};

export default function Stats() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();
  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-(--primary) p-3 rounded-full">
              <div className="text-2xl font-bold">AA</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-400">Quiz Master</p>
            </div>
          </div>
          <div
            className="bg-(--primary) px-6 py-2 rounded-lg font-semibold cursor-pointer transition-colors"
            onClick={() => router.push("/quiz")}
          >
            Start New Quiz
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Stats Summary */}
          <div className="bg-[#1E1F29] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
              Performance Summary
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
                <BookOpen className="text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Topics</p>
                  <p className="text-xl font-bold">{userData.topics}</p>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
                <Clock className="text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Attempted</p>
                  <p className="text-xl font-bold">{userData.attempted}</p>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Correct</p>
                  <p className="text-xl font-bold">{userData.correct}</p>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
                <XCircle className="text-red-400" />
                <div>
                  <p className="text-sm text-gray-400">Wrong</p>
                  <p className="text-xl font-bold">{userData.wrong}</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3">Topic Distribution</h3>
            <div className="w-full h-64 m-auto">
              <Doughnut
                data={{
                  labels: userData.topicData.map((item) => item.name),
                  datasets: [
                    {
                      data: userData.topicData.map((item) => item.value),
                      backgroundColor: userData.topicData.map(
                        (item) => item.color
                      ),
                      //[
                      //"rgba(111, 190, 250, 0.8)",
                      //"rgba(191, 147, 252, 0.8)",
                      // "rgba(159, 217, 255, 0.7)",
                      // "rgba(250, 177, 219, 0.7)",
                      // "rgba(100, 255, 218, 0.6)",
                      // "rgba(255, 130, 215, 0.6)",
                      // "rgba(255, 255, 255, 0.7)",
                      // "rgba(224, 231, 255, 0.7)",
                      // "rgba(116, 185, 255, 0.8)",
                      // "rgba(162, 155, 254, 0.8)",
                      //],
                      // borderColor: [
                      //   "rgba(111, 190, 250, 0.2)",
                      //   "rgba(191, 147, 252, 0.2)",
                      // ],
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

            <div className="grid grid-cols-2 gap-2 mt-2">
              {userData.topicData.map((topic, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: topic.color }}
                  ></div>
                  <span className="text-sm">{topic.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Tabs */}
          <div className="lg:col-span-2 bg-[#1E1F29] rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-700">
              <div
                className={`px-6 py-4 cursor-pointer ${
                  activeTab === "overview"
                    ? "border-b-2 border-indigo-500 font-semibold"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </div>
              <div
                className={`px-6 py-4 cursor-pointer ${
                  activeTab === "history"
                    ? "border-b-2 border-indigo-500 font-semibold"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("history")}
              >
                History
              </div>
              <div
                className={`px-6 py-4 cursor-pointer ${
                  activeTab === "favorites"
                    ? "border-b-2 border-indigo-500 font-semibold"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("favorites")}
              >
                Favorites
              </div>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Your Progress</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 rounded-lg p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Accuracy Rate</h3>
                        <span className="text-green-400 font-semibold">
                          {userData.correct}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${userData.correct}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Completion Rate</h3>
                        <span className="text-blue-400 font-semibold">40%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `40%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mt-8 mb-4">
                    Recommended Quizzes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">JavaScript III</h4>
                        <Award className="text-yellow-400" size={20} />
                      </div>
                      <p className="text-sm text-gray-300 mt-2">
                        Advanced concepts for experienced developers
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">
                          Marvel Cinematic Universe
                        </h4>
                        <Award className="text-yellow-400" size={20} />
                      </div>
                      <p className="text-sm text-gray-300 mt-2">
                        Test your knowledge of MCU films and characters
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Recent Quizzes</h2>
                  <div className="space-y-4">
                    {userData.history.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-semibold">{item.topic}</h4>
                          <p className="text-sm text-gray-400">{item.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={
                              item.score.startsWith("8") ||
                              item.score.startsWith("9")
                                ? "text-green-400"
                                : "text-yellow-400"
                            }
                          >
                            {item.score}
                          </span>
                          <div className="bg-gray-600 p-1.5 rounded-full cursor-pointer hover:bg-gray-500">
                            <BookOpen size={16} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "favorites" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    Your Favorite Topics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.favorites.map((topic, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 rounded-lg p-5 cursor-pointer hover:bg-gray-600 transition-colors"
                      >
                        <h3 className="font-semibold mb-2">{topic}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">
                            Practice again
                          </span>
                          <Award className="text-yellow-400" size={18} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateUniqueRGBAColors(count: number) {
  const colors = [];
  const generatedColors = new Set(); // To ensure uniqueness

  function generateRandomRGBA() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random() * (0.8 - 0.6) + 0.6; // Alpha between 0.6 and 0.8

    const rgba = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
    return rgba;
  }

  while (colors.length < count) {
    let newColor = generateRandomRGBA();
    if (!generatedColors.has(newColor)) {
      colors.push(newColor);
      generatedColors.add(newColor);
    }
  }

  return colors;
}
