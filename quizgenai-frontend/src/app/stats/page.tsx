//# Stats/History Page (Handles Both Empty State and User Data)
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "chart.js/auto";
import Header from "./header";
import PerformanceSummary from "./performanceSummary";
import Overview from "./overview";
import History from "./history";
import Favorites from "./favorites";
import { UserData } from "./schema";
import Spinner from "@/components/spinner";

export default function Stats() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [history, setHistory] = useState([]);
  const [popularTopics, setPopularTopics] = useState([]);

  const fetchUserData = async () => {
    //${process.env.URL}
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/quizgenai/stats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.backendToken}`,
          },
          body: JSON.stringify({
            email: session?.user?.email,
          }),
        }
      );
      const data = await res.json();
      console.log("Stats data:", data);
      setUserData(data);
      setPopularTopics(data.popularTopics);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserHistory = async () => {
    //${process.env.URL}
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/quizgenai/history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.backendToken}`,
          },
          body: JSON.stringify({
            email: session?.user?.email,
          }),
        }
      );
      const data = await res.json();
      console.log("Stats history data:", data);
      setHistory(data.quizHistory);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call API only when session is available and authenticated
    if (
      status === "authenticated" &&
      session?.user?.backendToken &&
      session?.user?.email
    ) {
      fetchUserData();
      fetchUserHistory();
    }
  }, [status, session]);

  // Check if user has any stats data
  const hasData = Boolean(
    userData &&
      userData.performance &&
      userData.topicDistribution &&
      userData.topicDistribution.length > 0
  );

  if (status === "loading" || loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header
          name={session?.user?.name || "User"}
          hasData={hasData}
          userData={userData}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Stats Summary */}
          <PerformanceSummary hasData={hasData} userData={userData} />

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
                <Overview hasData={hasData} userData={userData} />
              )}

              {activeTab === "history" && (
                <History
                  hasData={hasData}
                  userData={userData}
                  history={history}
                />
              )}

              {activeTab === "favorites" && (
                <Favorites popularTopics={popularTopics} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
