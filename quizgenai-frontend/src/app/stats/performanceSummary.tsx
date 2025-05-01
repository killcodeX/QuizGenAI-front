import React from "react";
import { ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { BookOpen, CheckCircle, XCircle, Clock, Info } from "lucide-react";
import { UserData, Topic } from "./schema";

interface performanceSummaryProps {
  hasData: boolean;
  userData: UserData | null;
}

// Prepare topic distribution data for chart if it exists
const prepareChartData = (
  hasData: boolean,
  userData: UserData
): ChartData<"doughnut"> | null => {
  if (!hasData || !userData?.topicDistribution) return null;

  const colors = [
    "#8B5D33",
    "#65C18C",
    "#3DA5D9",
    "#AAB464",
    "#D96941",
    "#A287E0",
    "#D93654",
    "#5DC28A",
  ];

  return {
    labels: userData.topicDistribution.map((topic: Topic) => topic.name),
    datasets: [
      {
        data: userData.topicDistribution.map((topic: Topic) => topic.count),
        backgroundColor: userData.topicDistribution.map(
          (_: Topic, i: number) => colors[i % colors.length]
        ),
        borderWidth: 2,
      },
    ],
  };
};

export default function PerformanceSummary(props: performanceSummaryProps) {
  const { hasData, userData } = props;
  return (
    <div className="bg-[#1E1F29] rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
        Performance Summary
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
          <BookOpen className="text-indigo-400" />
          <div>
            <p className="text-sm text-gray-400">Topics</p>
            <p className="text-xl font-bold">
              {hasData ? userData?.topicDistribution?.length || 0 : 0}
            </p>
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
          <Clock className="text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Attempted</p>
            <p className="text-xl font-bold">
              {hasData ? userData?.performance?.completedQuizzes || 0 : 0}
            </p>
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
          <CheckCircle className="text-green-400" />
          <div>
            <p className="text-sm text-gray-400">Correct</p>
            <p className="text-xl font-bold">
              {hasData ? userData?.performance?.correctAnswers || 0 : 0}
            </p>
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
          <XCircle className="text-red-400" />
          <div>
            <p className="text-sm text-gray-400">Wrong</p>
            <p className="text-xl font-bold">
              {hasData ? userData?.performance?.wrongAnswers || 0 : 0}
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3">Topic Distribution</h3>
      {!hasData ? (
        <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-800 rounded-lg">
          <Info size={48} className="text-gray-500 mb-2" />
          <p className="text-gray-400 text-center px-6">
            Complete your first quiz to see your topic distribution
          </p>
        </div>
      ) : (
        <div className="w-full h-64 m-auto">
          {(() => {
            const chartData = prepareChartData(hasData, userData as UserData);
            return (
              chartData && (
                <Doughnut
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              )
            );
          })()}
        </div>
      )}

      {hasData && userData?.topicDistribution && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {userData.topicDistribution.map((topic, index) => {
            const colors = [
              "#8B5D33",
              "#65C18C",
              "#3DA5D9",
              "#AAB464",
              "#D96941",
              "#A287E0",
              "#D93654",
              "#5DC28A",
            ];
            return (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: colors[index % colors.length],
                  }}
                ></div>
                <span>{topic.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
